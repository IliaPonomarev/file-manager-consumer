import * as dotenv from 'dotenv';

dotenv.config();

export const appConf = {
  port: process.env.PORT || 3080,
  postgresDb: process.env.POSTGRES_DB,
  postgresUser: process.env.POSTGRES_USER,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresHost: process.env.POSTGRES_HOST,
  postgresPort: Number(process.env.POSTGRES_PORT),
  minioEndPoint: process.env.MINIO_ENDPOINT,
  minioPort: Number(process.env.MINIO_PORT),
  minioAccessKey: process.env.MINIO_ACCESS_KEY,
  minioSecretKey: process.env.MINIO_SECRET_KEY,
  redisHost:  process.env.REDIS_HOST,
  redisPort: Number(process.env.REDIS_PORT),
  bullQueue: process.env.BULL_QUEUE
};