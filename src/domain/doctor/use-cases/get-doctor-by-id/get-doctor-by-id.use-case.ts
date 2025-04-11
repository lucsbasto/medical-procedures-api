import { Injectable } from '@nestjs/common';
import { DoctorRepository } from '../../repositories/doctor.repository';

import { DoctorOutputDto } from '../dtos/doctor-output.dto';
import { GetDoctorByIdInputDto } from '../dtos/get-doctor-by-id-input.dto';
import { GetDoctorByIdUseCaseInterface } from './get-doctor-by-id.use-case.interface';

@Injectable()
export class GetDoctorByIdUseCase implements GetDoctorByIdUseCaseInterface {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async execute(input: GetDoctorByIdInputDto): Promise<DoctorOutputDto | null> {
    const { id } = input;

    if (!id || id.trim() === '') {
      throw new Error('Doctor ID cannot be empty.');
    }

    const doctor = await this.doctorRepository.findById(id);

    if (!doctor) {
      return null;
    }

    return {
      id: doctor.id,
      name: doctor.name,
      specialty: doctor.specialty,
      crm: doctor.crm,
      phone: doctor.phone,
      email: doctor.email,
    };
  }
}
