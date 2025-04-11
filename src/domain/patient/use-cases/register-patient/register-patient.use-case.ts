import { Injectable } from '@nestjs/common';
import { Patient } from '../../entities/patient.entity';
import { PatientRepository } from '../../repositories/patient.repository';
import { GetPatientByIdOutputDto } from '../dtos/get-patient-by-id-output.dto';
import { RegisterPatientInputDto } from '../dtos/register-patient-input.dto';
import { RegisterPatientUseCaseInterface } from './register-patient.use-case.interface';

@Injectable()
export class RegisterPatientUseCase implements RegisterPatientUseCaseInterface {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(input: RegisterPatientInputDto): Promise<GetPatientByIdOutputDto> {
    const { name, phone, email } = input;

    if (!name || name.trim() === '') {
      throw new Error('Patient name cannot be empty.');
    }

    if (!phone || phone.trim() === '') {
      throw new Error('Patient phone number is required.');
    }

    const patient = new Patient('', name, phone, email);

    const createdPatient = await this.patientRepository.create(patient);

    return {
      id: createdPatient.id,
      name: createdPatient.name,
      phone: createdPatient.phone,
      email: createdPatient.email,
    };
  }
}
