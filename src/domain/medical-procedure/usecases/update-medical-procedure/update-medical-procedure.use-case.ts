import { Injectable } from '@nestjs/common';
import { MedicalProcedure } from '../../entities/medical-procedure.entity';
import { MedicalProcedureRepository } from '../../repositories/medical-procedure.repository';

import { MedicalProcedureOutputDto } from '../dtos/medical-procedure-output.dto';
import { UpdateMedicalProcedureInputDto } from '../dtos/update-medical-procedure-input.dto';
import { UpdateMedicalProcedureUseCaseInterface } from './update-medical-procedure.use-case.interface';

@Injectable()
export class UpdateMedicalProcedureUseCase implements UpdateMedicalProcedureUseCaseInterface {
  constructor(private readonly medicalProcedureRepository: MedicalProcedureRepository) {}

  async execute(input: UpdateMedicalProcedureInputDto): Promise<MedicalProcedureOutputDto | null> {
    const { id, doctorId, patientId, procedureDate, procedureValue, paymentStatus } = input;

    if (!id || id.trim() === '') {
      throw new Error('Medical procedure ID cannot be empty for update.');
    }

    const existingProcedure = await this.medicalProcedureRepository.findById(id);

    if (!existingProcedure) {
      return null;
    }

    const updatedProcedureData = {
      id: existingProcedure.id,
      doctorId: doctorId !== undefined ? doctorId : existingProcedure.doctorId,
      patientId: patientId !== undefined ? patientId : existingProcedure.patientId,
      procedureDate: procedureDate !== undefined ? procedureDate : existingProcedure.procedureDate,
      procedureValue: procedureValue !== undefined ? procedureValue : existingProcedure.procedureValue,
      paymentStatus: paymentStatus !== undefined ? paymentStatus : existingProcedure.paymentStatus,
    };

    const updatedProcedure = new MedicalProcedure(
      updatedProcedureData.id,
      updatedProcedureData.doctorId,
      updatedProcedureData.patientId,
      updatedProcedureData.procedureDate,
      updatedProcedureData.procedureValue,
      updatedProcedureData.paymentStatus,
    );

    await this.medicalProcedureRepository.update(updatedProcedure);

    const retrievedUpdatedProcedure = await this.medicalProcedureRepository.findById(id);

    if (!retrievedUpdatedProcedure) {
      // This should ideally not happen if the update was successful
      return null;
    }

    return {
      id: retrievedUpdatedProcedure.id,
      doctorId: retrievedUpdatedProcedure.doctorId,
      patientId: retrievedUpdatedProcedure.patientId,
      procedureDate: retrievedUpdatedProcedure.procedureDate,
      procedureValue: retrievedUpdatedProcedure.procedureValue,
      paymentStatus: retrievedUpdatedProcedure.paymentStatus,
    };
  }
}
