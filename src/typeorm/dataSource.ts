import "dotenv/config";
import { DataSource } from "typeorm";

let port = process.env.DB_PASS || undefined;

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PASS),
  username: process.env.DB_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["./src/typeorm/migrations/*.ts"],
});
