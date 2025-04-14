import { Doctor } from '../entities/doctor.entity';

export interface DoctorRepository {
  create(doctor: Doctor): Promise<Doctor>;
  findById(id: string): Promise<Doctor | null>;
  findByName(name: string): Promise<Doctor[]>;
  findByCRM(crm: string): Promise<Doctor | null>;
  findAll(filters?: { [key: string]: any }): Promise<Doctor[]>;
  update(doctor: Doctor): Promise<Doctor | null>;
  delete(id: string): Promise<void>;
}
