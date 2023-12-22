import { NestMinioService } from 'nestjs-minio';
import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as ExcelJS from 'exceljs';
import { Stream } from 'stream';

@Processor('file-processing-queue')
export class FileConsumer {
  constructor(
    private readonly minioService: NestMinioService,
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
  ) {}

  @Process('processFile')
  async processFileMessage(job: Job<{ fileName: string }>): Promise<void> {
    const filename = job.data?.fileName;

    const fileBuffer = await this.minioService.getMinio().getObject('file-processing', filename);

    await this.parseFile(fileBuffer);
  }

  async parseFile(minioStream: Stream): Promise<void> {
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.read(minioStream);
  
      const worksheet = workbook.worksheets[0];
  
      const ROW_NUMBER_TO_SKIP = 1; // не обрабатываем заголовок
  
      worksheet.eachRow(async (row, rowNumber) => {
        if (rowNumber === ROW_NUMBER_TO_SKIP) {
          return;
        }
        const [, price, productName, quantity, purchaseDate] = row.values as Array<string>;

        console.log('Запись продукта в БД', price, productName, quantity, purchaseDate)

        const product = new ProductEntity();
        product.price = Number(price);
        product.name = productName;
        product.quantity = Number(quantity);
        product.purchaseDate = new Date(purchaseDate);
  
        await this.productRepository.save(product);
      });
    } catch(e) {
      console.log('e', e)
    }
  }
}