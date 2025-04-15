import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DoctorEntity } from '../entities/doctor.entity';
import { MedicalProcedureEntity } from '../entities/medical-procedure.entity';
import { PatientEntity } from '../entities/patient.entity';
import { UserEntity } from '../entities/user.entity';

dotenv.config();

export const dataSourcePostgres: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: false,
  entities: [DoctorEntity, PatientEntity, MedicalProcedureEntity, UserEntity],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
};
const dataSourceMigrations = new DataSource(dataSourcePostgres);

export default dataSourceMigrations;
