import { Injectable } from '@nestjs/common';
import { PatientRepository } from '../../repositories/patient.repository';
import { DeletePatientInputDto } from '../dtos/delete-patient-input.dto';
import { DeletePatientUseCaseInterface } from './delete-patient.use-case.interface';

@Injectable()
export class DeletePatientUseCase implements DeletePatientUseCaseInterface {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(input: DeletePatientInputDto): Promise<void> {
    const { id } = input;

    if (!id || id.trim() === '') {
      throw new Error('Patient ID cannot be empty for deletion.');
    }

    const existingPatient = await this.patientRepository.findById(id);

    if (existingPatient) {
      await this.patientRepository.delete(id);
    }
  }
}
