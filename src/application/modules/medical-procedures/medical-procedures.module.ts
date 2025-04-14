import { DeleteMedicalProcedureUseCase } from '@/domain/medical-procedure/usecases/delete-medical-procedure/delete-medical-procedure.use-case';
import { GenerateDeniedReportByPeriodUseCase } from '@/domain/medical-procedure/usecases/generate-denied-report-by-period/generate-denied-report-by-period.use-case';
import { GenerateFinancialReportByDoctorUseCase } from '@/domain/medical-procedure/usecases/generate-financial-report-by-doctor/generate-financial-report-by-doctor.use-case';
import { GetAllMedicalProceduresUseCase } from '@/domain/medical-procedure/usecases/get-all-medical-procedures/get-all-medical-procedures.use-case';
import { GetMedicalProcedureByIdUseCase } from '@/domain/medical-procedure/usecases/get-medical-procedure-by-id/get-medical-procedure-by-id.use-case';
import { RegisterMedicalProcedureUseCase } from '@/domain/medical-procedure/usecases/register-medical-procedure/register-medical-procedure.use-case';
import { UpdateMedicalProcedureUseCase } from '@/domain/medical-procedure/usecases/update-medical-procedure/update-medical-procedure.use-case';
import { DoctorEntity } from '@/infrastructure/database/typeorm/entities/doctor.entity';
import { MedicalProcedureEntity } from '@/infrastructure/database/typeorm/entities/medical-procedure.entity';
import { TypeOrmDoctorRepository } from '@/infrastructure/database/typeorm/repositories/doctor.repository';
import { TypeOrmMedicalProcedureRepository } from '@/infrastructure/database/typeorm/repositories/medical-procedure.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeniedReportController } from './controllers/denied-report.controller';
import { FinancialReportController } from './controllers/financial-report.controller';
import { MedicalProceduresController } from './controllers/medical-procedures.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalProcedureEntity, DoctorEntity])],
  controllers: [MedicalProceduresController, FinancialReportController, DeniedReportController],
  providers: [
    RegisterMedicalProcedureUseCase,
    GetMedicalProcedureByIdUseCase,
    GetAllMedicalProceduresUseCase,
    UpdateMedicalProcedureUseCase,
    DeleteMedicalProcedureUseCase,
    GenerateFinancialReportByDoctorUseCase,
    GenerateDeniedReportByPeriodUseCase,
    {
      provide: 'MedicalProcedureRepository',
      useClass: TypeOrmMedicalProcedureRepository,
    },
    {
      provide: 'DoctorRepository',
      useClass: TypeOrmDoctorRepository,
    },
  ],
})
export class MedicalProceduresModule {}
