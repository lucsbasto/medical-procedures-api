import { Injectable } from '@nestjs/common';
import { DoctorRepository } from '../../repositories/doctor.repository';

import { DoctorOutputDto } from '../dtos/doctor-output.dto';
import { GetAllDoctorsInputDto } from '../dtos/get-all-doctors-input.dto';
import { GetAllDoctorsUseCaseInterface } from './get-all-doctors.use-case.interface';

@Injectable()
export class GetAllDoctorsUseCase implements GetAllDoctorsUseCaseInterface {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async execute(filters?: GetAllDoctorsInputDto): Promise<DoctorOutputDto[]> {
    const doctors = await this.doctorRepository.findAll(filters);
    return doctors.map((doctor) => ({
      id: doctor.id,
      name: doctor.name,
      specialty: doctor.specialty,
      crm: doctor.crm,
      phone: doctor.phone,
      email: doctor.email,
    }));
  }
}
