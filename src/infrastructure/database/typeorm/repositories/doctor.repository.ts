import { Doctor } from '@/domain/doctor/entities/doctor.entity';
import { DoctorRepository } from '@/domain/doctor/repositories/doctor.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorEntity } from '../entities/doctor.entity';

@Injectable()
export class TypeOrmDoctorRepository implements DoctorRepository {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly repository: Repository<DoctorEntity>,
  ) {}
  async findByName(name: string): Promise<Doctor[]> {
    const doctors = await this.repository.find({ where: { name } });
    if (!doctors.length) {
      return null;
    }
    return doctors.map((doctor) => new Doctor(doctor.id, doctor.name, doctor.crm, doctor.specialty));
  }
  async findByCRM(crm: string): Promise<Doctor | null> {
    const doctorOrm = await this.repository.findOne({ where: { crm } });
    if (!doctorOrm) {
      return null;
    }
    return new Doctor(doctorOrm.id, doctorOrm.name, doctorOrm.crm, doctorOrm.specialty);
  }

  async create(doctor: Doctor): Promise<Doctor> {
    const doctorOrm = this.repository.create({
      id: doctor.id,
      name: doctor.name,
      crm: doctor.crm,
      specialty: doctor.specialty,
      contact: {
        phone: doctor.phone,
        email: doctor.email,
      },
    });
    const savedDoctor = await this.repository.save(doctorOrm);
    return new Doctor(savedDoctor.id, savedDoctor.name, savedDoctor.crm, savedDoctor.specialty);
  }

  async findById(id: string): Promise<Doctor | null> {
    const doctorOrm = await this.repository.findOne({ where: { id } });
    if (!doctorOrm) {
      return null;
    }
    return new Doctor(doctorOrm.id, doctorOrm.name, doctorOrm.crm, doctorOrm.specialty);
  }

  async findAll(): Promise<Doctor[]> {
    const doctorsOrm = await this.repository.find();
    return doctorsOrm.map((doctorOrm) => new Doctor(doctorOrm.id, doctorOrm.name, doctorOrm.crm, doctorOrm.specialty));
  }

  async update(doctor: Doctor): Promise<Doctor | null> {
    await this.repository.update(doctor.id, doctor);
    return this.findById(doctor.id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
