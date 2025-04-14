import { Inject, Injectable } from '@nestjs/common';
import { MedicalProcedureRepository } from '../../repositories/medical-procedure.repository';
import { MedicalProcedureOutputDto } from '../dtos/medical-procedure-output.dto';
import { GetMedicalProcedureByIdUseCaseInterface } from './get-medical-procedure-by-id.use-case.interface';

@Injectable()
export class GetMedicalProcedureByIdUseCase implements GetMedicalProcedureByIdUseCaseInterface {
  constructor(
    @Inject('MedicalProcedureRepository')
    private readonly medicalProcedureRepository: MedicalProcedureRepository,
  ) {}

  async execute(id: string): Promise<MedicalProcedureOutputDto | null> {
    if (!id || id.trim() === '') {
      throw new Error('Medical procedure ID cannot be empty.');
    }

    const medicalProcedure = await this.medicalProcedureRepository.findById(id);

    if (!medicalProcedure) {
      return null;
    }

    return {
      id: medicalProcedure.id,
      doctorId: medicalProcedure.doctorId,
      patientId: medicalProcedure.patientId,
      procedureName: medicalProcedure.procedureName,
      procedureDate: medicalProcedure.procedureDate,
      procedureValue: medicalProcedure.procedureValue,
      paymentStatus: medicalProcedure.paymentStatus,
      denialReason: medicalProcedure.denialReason,
    };
  }
}
