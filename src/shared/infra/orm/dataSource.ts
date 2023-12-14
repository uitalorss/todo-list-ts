import 'dotenv/config';
import { DataSource } from 'typeorm';

const port = process.env.DB_PORT as unknown as number | undefined;

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['./src/modules/**/infra/orm/entities/*.ts'],
  migrations: ['./src/shared/infra/orm/migrations/*.ts'],
});
