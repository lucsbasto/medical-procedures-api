import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DoctorsModule } from './application/modules/doctors/doctors.module';
import { MedicalProceduresModule } from './application/modules/medical-procedures/medical-procedures.module';
import { PatientsModule } from './application/modules/patient/patient.module';
import { LoggerModule } from './common/logger/logger.module';
import { DataSourcePostgresModule } from './infrastructure/database/typeorm/config/data-source-postgres.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule,
    DataSourcePostgresModule,
    DoctorsModule,
    PatientsModule,
    MedicalProceduresModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
