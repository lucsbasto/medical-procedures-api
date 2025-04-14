import { LoggerService } from '@/common/logger/logger.service';
import { GetAllPatientsUseCase } from '@/domain/patient/use-cases/get-all-patients/get-all-patients.use-case';
import { GetPatientByIdUseCase } from '@/domain/patient/use-cases/get-patient-by-id/get-patient-by-id.use-case';
import { RegisterPatientUseCase } from '@/domain/patient/use-cases/register-patient/register-patient.use-case';
import { UpdatePatientUseCase } from '@/domain/patient/use-cases/update-patient/update-patient.use-case';
import { PatientEntity } from '@/infrastructure/database/typeorm/entities/patient.entity';
import { TypeOrmPatientRepository } from '@/infrastructure/database/typeorm/repositories/patient.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsController } from './controllers/patient.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity])],
  controllers: [PatientsController],
  providers: [
    {
      provide: 'ILoggerService',
      useClass: LoggerService,
    },
    {
      provide: 'RegisterPatientUseCaseInterface',
      useClass: RegisterPatientUseCase,
    },
    {
      provide: 'GetAllPatientsUseCaseInterface',
      useClass: GetAllPatientsUseCase,
    },
    {
      provide: 'GetPatientByIdUseCaseInterface',
      useClass: GetPatientByIdUseCase,
    },
    {
      provide: 'UpdatePatientUseCaseInterface',
      useClass: UpdatePatientUseCase,
    },
    {
      provide: 'PatientRepository',
      useClass: TypeOrmPatientRepository,
    },
  ],
})
export class PatientsModule {}
