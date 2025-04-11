import { Injectable } from '@nestjs/common';
import { PatientRepository } from '../../repositories/patient.repository';
import { GetPatientByIdInputDto } from './dtos/get-patient-by-id-input.dto';
import { GetPatientByIdOutputDto } from './dtos/get-patient-by-id-output.dto';
import { GetPatientByIdUseCaseInterface } from './get-patient-by-id.use-case.interface';

@Injectable()
export class GetPatientByIdUseCase implements GetPatientByIdUseCaseInterface {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(input: GetPatientByIdInputDto): Promise<GetPatientByIdOutputDto | null> {
    const { id } = input;

    if (!id || id.trim() === '') {
      throw new Error('Patient ID cannot be empty.');
    }

    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      return null;
    }

    return {
      id: patient.id,
      name: patient.name,
      phone: patient.phone,
      email: patient.email,
    };
  }
}
