import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { FileConsumer } from './file.consumer';
import { BullModule } from '@nestjs/bull';
import { appConf } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    BullModule.registerQueue({
      name: appConf.bullQueue,
    }),
  ],
  providers: [FileConsumer],
})
export class FileConsumerModule {}