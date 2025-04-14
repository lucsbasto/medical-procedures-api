import { LoggerService } from '@/common/logger/logger.service';
import { DeleteMedicalProcedureUseCase } from '@/domain/medical-procedure/usecases/delete-medical-procedure/delete-medical-procedure.use-case';
import { GenerateDeniedReportByPeriodUseCase } from '@/domain/medical-procedure/usecases/generate-denied-report-by-period/generate-denied-report-by-period.use-case';
import { GenerateFinancialReportByDoctorUseCase } from '@/domain/medical-procedure/usecases/generate-financial-report-by-doctor/generate-financial-report-by-doctor.use-case';
import { GetAllMedicalProceduresUseCase } from '@/domain/medical-procedure/usecases/get-all-medical-procedures/get-all-medical-procedures.use-case';
import { GetMedicalProcedureByIdUseCase } from '@/domain/medical-procedure/usecases/get-medical-procedure-by-id/get-medical-procedure-by-id.use-case';
import { RegisterMedicalProcedureUseCase } from '@/domain/medical-procedure/usecases/register-medical-procedure/register-medical-procedure.use-case';
import { UpdateMedicalProcedureUseCase } from '@/domain/medical-procedure/usecases/update-medical-procedure/update-medical-procedure.use-case';
import { MedicalProcedureEntity } from '@/infrastructure/database/typeorm/entities/medical-procedure.entity';
import { TypeOrmMedicalProcedureRepository } from '@/infrastructure/database/typeorm/repositories/medical-procedure.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeniedReportController } from './controllers/denied-report.controller';
import { FinancialReportController } from './controllers/financial-report.controller';
import { MedicalProceduresController } from './controllers/medical-procedures.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalProcedureEntity])],
  controllers: [MedicalProceduresController, FinancialReportController, DeniedReportController],
  providers: [
    {
      provide: 'ILoggerService',
      useClass: LoggerService,
    },
    {
      provide: 'GenerateDeniedReportByPeriodUseCaseInterface',
      useClass: GenerateDeniedReportByPeriodUseCase,
    },
    {
      provide: 'RegisterMedicalProcedureUseCaseInterface',
      useClass: RegisterMedicalProcedureUseCase,
    },
    {
      provide: 'GenerateFinancialReportByDoctorUseCaseInterface',
      useClass: GenerateFinancialReportByDoctorUseCase,
    },
    {
      provide: 'GetMedicalProcedureByIdUseCaseInterface',
      useClass: GetMedicalProcedureByIdUseCase,
    },
    {
      provide: 'GetAllMedicalProceduresUseCaseInterface',
      useClass: GetAllMedicalProceduresUseCase,
    },
    {
      provide: 'UpdateMedicalProcedureUseCaseInterface',
      useClass: UpdateMedicalProcedureUseCase,
    },
    {
      provide: 'DeleteMedicalProcedureUseCaseInterface',
      useClass: DeleteMedicalProcedureUseCase,
    },
    {
      provide: 'GenerateFinancialReportByDoctorUseCaseInterface',
      useClass: GenerateFinancialReportByDoctorUseCase,
    },
    {
      provide: 'MedicalProcedureRepository',
      useClass: TypeOrmMedicalProcedureRepository,
    },
  ],
})
export class MedicalProceduresModule {}
