import { Injectable } from '@nestjs/common';
import { PatientRepository } from '../../repositories/patient.repository';
import { GetAllPatientsInputDto } from './dtos/get-all-patients-input.dto';
import { GetAllPatientsOutputDto } from './dtos/get-all-patients-output.dto';
import { GetAllPatientsUseCaseInterface } from './get-all-patients.use-case.interface';

@Injectable()
export class GetAllPatientsUseCase implements GetAllPatientsUseCaseInterface {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(filters?: GetAllPatientsInputDto): Promise<GetAllPatientsOutputDto[]> {
    const allPatients = await this.patientRepository.findAll(filters);

    return allPatients.map((patient) => ({
      id: patient.id,
      name: patient.name,
      phone: patient.phone,
      email: patient.email,
    }));
  }
}
