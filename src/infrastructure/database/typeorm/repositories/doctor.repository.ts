import { Doctor } from '@/domain/doctor/entities/doctor.entity';
import { DoctorRepository } from '@/domain/doctor/repositories/doctor.repository';
import { ILoggerService } from '@/domain/interfaces/common/logger';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorEntity } from '../entities/doctor.entity';

@Injectable()
export class TypeOrmDoctorRepository implements DoctorRepository {
  constructor(
    @Inject('ILoggerService')
    private readonly loggerService: ILoggerService,
    @InjectRepository(DoctorEntity)
    private readonly repository: Repository<DoctorEntity>,
  ) {
    this.loggerService.setContext(TypeOrmDoctorRepository.name);
  }

  async findByName(name: string): Promise<Doctor[]> {
    this.loggerService.info(`findByName - ${name}`);
    const doctors = await this.repository.find({ where: { name } });
    if (!doctors.length) {
      return null;
    }
    return doctors.map((doctor) => new Doctor(doctor.id, doctor.name, doctor.crm, doctor.specialty));
  }

  async findByCRM(crm: string): Promise<Doctor | null> {
    this.loggerService.info(`findByCRM - ${crm}`);
    const doctorOrm = await this.repository.findOne({ where: { crm } });
    if (!doctorOrm) {
      return null;
    }
    return new Doctor(doctorOrm.id, doctorOrm.name, doctorOrm.crm, doctorOrm.specialty);
  }

  async create(doctor: Doctor): Promise<Doctor> {
    this.loggerService.info(`create - ${JSON.stringify(doctor)}`);
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
    this.loggerService.info(`findById - ${id}`);
    const doctorOrm = await this.repository.findOne({ where: { id } });
    if (!doctorOrm) {
      return null;
    }
    return new Doctor(doctorOrm.id, doctorOrm.name, doctorOrm.crm, doctorOrm.specialty);
  }

  async findAll(): Promise<Doctor[]> {
    this.loggerService.info('findAll');
    const doctorsOrm = await this.repository.find();
    return doctorsOrm.map(
      (doctorOrm) =>
        new Doctor(
          doctorOrm.id,
          doctorOrm.name,
          doctorOrm.crm,
          doctorOrm.specialty,
          doctorOrm.contact?.phone,
          doctorOrm.contact?.email,
        ),
    );
  }

  async update(doctor: Doctor): Promise<Doctor | null> {
    this.loggerService.info(`update - ${JSON.stringify(doctor)}`);
    await this.repository.update(doctor.id, doctor);
    return this.findById(doctor.id);
  }

  async delete(id: string): Promise<void> {
    this.loggerService.info(`delete - ${id}`);
    await this.repository.delete(id);
  }
}
