import { Injectable } from '@nestjs/common';
import { Patient } from '../../entities/patient.entity';
import { PatientRepository } from '../../repositories/patient.repository';
import { RegisterPatientInputDto } from './dtos/register-patient-input.dto';
import { RegisterPatientOutputDto } from './dtos/register-patient-output.dto';
import { RegisterPatientUseCaseInterface } from './register-patient.use-case.interface';

@Injectable()
export class RegisterPatientUseCase implements RegisterPatientUseCaseInterface {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(input: RegisterPatientInputDto): Promise<RegisterPatientOutputDto> {
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
