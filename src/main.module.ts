import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './application/modules/auth/auth.module';
import { DoctorsModule } from './application/modules/doctors/doctors.module';
import { MedicalProceduresModule } from './application/modules/medical-procedures/medical-procedures.module';
import { PatientsModule } from './application/modules/patient/patient.module';
import { UsersModule } from './application/modules/user/user.module';
import { LoggerModule } from './common/logger/logger.module';
import { DataSourcePostgresModule } from './infrastructure/database/typeorm/config/data-source-postgres.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule,
    DataSourcePostgresModule,
    AuthModule,
    DoctorsModule,
    PatientsModule,
    MedicalProceduresModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
