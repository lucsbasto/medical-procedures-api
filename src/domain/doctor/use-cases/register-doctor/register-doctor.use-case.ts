import { Inject, Injectable } from '@nestjs/common';
import { Doctor } from '../../entities/doctor.entity';
import { DoctorRepository } from '../../repositories/doctor.repository';
import { DoctorOutputDto } from '../dtos/doctor-output.dto';
import { RegisterDoctorInputDto } from '../dtos/register-doctor-input.dto';
import { RegisterDoctorUseCaseInterface } from './register-doctor.use-case.interface';

@Injectable()
export class RegisterDoctorUseCase implements RegisterDoctorUseCaseInterface {
  constructor(
    @Inject('DoctorRepository')
    private readonly doctorRepository: DoctorRepository,
  ) {}

  async execute(input: RegisterDoctorInputDto): Promise<DoctorOutputDto> {
    const { name, specialty, crm, phone, email } = input;

    if (!name || name.trim() === '') {
      throw new Error('Doctor name cannot be empty.');
    }
    if (!specialty || specialty.trim() === '') {
      throw new Error('Doctor speciality cannot be empty.');
    }
    if (!crm || crm.trim() === '') {
      throw new Error('Doctor CRM cannot be empty.');
    }

    const doctor = new Doctor('', name, crm, specialty, phone, email);
    const createdDoctor = await this.doctorRepository.create(doctor);

    return {
      id: createdDoctor.id,
      name: createdDoctor.name,
      specialty: createdDoctor.specialty,
      crm: createdDoctor.crm,
      phone: createdDoctor.phone,
      email: createdDoctor.email,
    };
  }
}
