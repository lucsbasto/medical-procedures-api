import { Injectable } from '@nestjs/common';
import { Patient } from '../../entities/patient.entity';
import { PatientRepository } from '../../repositories/patient.repository';
import { GetPatientByIdOutputDto } from '../get-patient-by-id/dtos/get-patient-by-id-output.dto';
import { UpdatePatientInputDto } from './dtos/update-patient-input.dto';
import { UpdatePatientUseCaseInterface } from './update-patient.use-case.interface';

@Injectable()
export class UpdatePatientUseCase implements UpdatePatientUseCaseInterface {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(input: UpdatePatientInputDto): Promise<GetPatientByIdOutputDto | null> {
    const { id, name, phone, email } = input;

    if (!id || id.trim() === '') {
      throw new Error('Patient ID cannot be empty for update.');
    }

    const existingPatient = await this.patientRepository.findById(id);

    if (!existingPatient) {
      return null;
    }

    const updatedPatientData = {
      id: existingPatient.id,
      name: name !== undefined ? name : existingPatient.name,
      phone: phone !== undefined ? phone : existingPatient.phone,
      email: email !== undefined ? email : existingPatient.email,
    };

    const updatedPatient = new Patient(
      updatedPatientData.id,
      updatedPatientData.name,
      updatedPatientData.phone,
      updatedPatientData.email,
    );

    await this.patientRepository.update(updatedPatient);

    const retrievedUpdatedPatient = await this.patientRepository.findById(id);

    if (!retrievedUpdatedPatient) {
      return null;
    }

    return {
      id: retrievedUpdatedPatient.id,
      name: retrievedUpdatedPatient.name,
      phone: retrievedUpdatedPatient.phone,
      email: retrievedUpdatedPatient.email,
    };
  }
}
