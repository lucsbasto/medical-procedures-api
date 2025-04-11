import { Injectable } from '@nestjs/common';
import { MedicalProcedureRepository } from '../../repositories/medical-procedure.repository';
import { GetMedicalProcedureByIdInputDto } from '../dtos/get-medical-procedure-by-id-input.dto';
import { MedicalProcedureOutputDto } from '../dtos/medical-procedure-output.dto';
import { GetMedicalProcedureByIdUseCaseInterface } from './get-medical-procedure-by-id.use-case.interface';

@Injectable()
export class GetMedicalProcedureByIdUseCase implements GetMedicalProcedureByIdUseCaseInterface {
  constructor(private readonly medicalProcedureRepository: MedicalProcedureRepository) {}

  async execute(input: GetMedicalProcedureByIdInputDto): Promise<MedicalProcedureOutputDto | null> {
    const { id } = input;

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
      procedureDate: medicalProcedure.procedureDate,
      procedureValue: medicalProcedure.procedureValue,
      paymentStatus: medicalProcedure.paymentStatus,
    };
  }
}
