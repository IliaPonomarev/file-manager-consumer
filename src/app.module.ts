import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { NestMinioModule } from 'nestjs-minio';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileConsumerModule } from './modules/file-consumer/file-consumer.module';
import { appConf } from 'src/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: appConf.redisHost,
          port: appConf.redisPort,
        },
      }),
    }),
    NestMinioModule.register({
      endPoint: appConf.minioEndPoint,
      port: appConf.minioPort,
      useSSL: false,
      accessKey: appConf.minioAccessKey,
      secretKey: appConf.minioSecretKey,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: appConf.postgresHost,
      port: appConf.postgresPort,
      username: appConf.postgresUser,
      password: appConf.postgresPassword,
      database: appConf.postgresDb,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    FileConsumerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
