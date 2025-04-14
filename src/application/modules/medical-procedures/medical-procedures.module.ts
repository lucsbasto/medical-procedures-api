import { DeleteMedicalProcedureUseCase } from '@/domain/medical-procedure/usecases/delete-medical-procedure/delete-medical-procedure.use-case';
import { GetAllMedicalProceduresUseCase } from '@/domain/medical-procedure/usecases/get-all-medical-procedures/get-all-medical-procedures.use-case';
import { GetMedicalProcedureByIdUseCase } from '@/domain/medical-procedure/usecases/get-medical-procedure-by-id/get-medical-procedure-by-id.use-case';
import { RegisterMedicalProcedureUseCase } from '@/domain/medical-procedure/usecases/register-medical-procedure/register-medical-procedure.use-case';
import { UpdateMedicalProcedureUseCase } from '@/domain/medical-procedure/usecases/update-medical-procedure/update-medical-procedure.use-case';
import { MedicalProcedureEntity } from '@/infrastructure/database/typeorm/entities/medical-procedure.entity';
import { TypeOrmMedicalProcedureRepository } from '@/infrastructure/database/typeorm/repositories/medical-procedure.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalProceduresController } from './controllers/medical-procedures.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalProcedureEntity])],
  controllers: [MedicalProceduresController],
  providers: [
    RegisterMedicalProcedureUseCase,
    GetMedicalProcedureByIdUseCase,
    GetAllMedicalProceduresUseCase,
    UpdateMedicalProcedureUseCase,
    DeleteMedicalProcedureUseCase,
    {
      provide: 'MedicalProcedureRepository',
      useClass: TypeOrmMedicalProcedureRepository,
    },
  ],
})
export class MedicalProceduresModule {}
