import { Patient } from '@/domain/patient/entities/patient.entity';
import { PatientRepository } from '@/domain/patient/repositories/patient.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientEntity } from '../entities/patient.entity';

@Injectable()
export class TypeOrmPatientRepository implements PatientRepository {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly ormRepository: Repository<PatientEntity>,
  ) {}

  async create(patient: Patient): Promise<Patient> {
    const patientEntity = this.ormRepository.create({
      id: patient.id,
      name: patient.name,
      contact: {
        phone: patient.phone,
        email: patient.email,
      },
    });
    const savedPatient = await this.ormRepository.save(patientEntity);
    return new Patient(savedPatient.id, savedPatient.name, savedPatient.contact.phone, savedPatient.contact.email);
  }

  async findById(id: string): Promise<Patient | null> {
    const patientEntity = await this.ormRepository.findOne({ where: { id } });
    if (!patientEntity) {
      return null;
    }
    return new Patient(patientEntity.id, patientEntity.name, patientEntity.contact.phone, patientEntity.contact.email);
  }

  async findAll(): Promise<Patient[]> {
    const patientsEntities = await this.ormRepository.find();
    return patientsEntities.map(
      (patientEntity) =>
        new Patient(patientEntity.id, patientEntity.name, patientEntity.contact.phone, patientEntity.contact.email),
    );
  }

  async update(patient: Patient): Promise<Patient | null> {
    await this.ormRepository.update(patient.id, {
      name: patient.name,
      contact: {
        phone: patient.phone,
        email: patient.email,
      },
    });
    return this.findById(patient.id);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findByName(name: string): Promise<Patient[]> {
    const patientsEntities = await this.ormRepository.find({ where: { name } });
    return patientsEntities.map(
      (patientEntity) =>
        new Patient(patientEntity.id, patientEntity.name, patientEntity.contact.phone, patientEntity.contact.email),
    );
  }
}
