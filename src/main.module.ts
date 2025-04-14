import { Module } from '@nestjs/common';
import { DoctorsModule } from './application/modules/doctors/doctors.module';
import { PatientsModule } from './application/modules/patient/patient.module';
import { LoggerModule } from './common/logger/logger.module';
import { DataSourcePostgresModule } from './infrastructure/database/typeorm/config/data-source-postgres.module';

@Module({
  imports: [DataSourcePostgresModule, LoggerModule, DoctorsModule, PatientsModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
