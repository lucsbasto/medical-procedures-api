import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourcePostgres: DataSourceOptions = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: false,
  entities: ['dist/src/infrastructure/database/entities/*{.ts,.js}'],
  migrations: ['dist/src/infrastructure/database/migrations/*{.ts,.js}'],
  seeds: ['dist/src/infrastructure/database/seeds/*{.ts,.js}'],
  synchronize: true,
} as DataSourceOptions;

console.log(dataSourcePostgres);
export const dataSourceMigrations = new DataSource({ ...dataSourcePostgres });
