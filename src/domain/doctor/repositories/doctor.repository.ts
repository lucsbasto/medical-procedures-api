import { Doctor } from '../entities/doctor.entity';

export interface DoctorRepository {
  create(doctor: Doctor): Promise<Doctor>;
  findById(id: string): Promise<Doctor | null>;
  findByName(name: string): Promise<Doctor[]>;
  findByCRM(crm: string): Promise<Doctor | null>;
  findAll(): Promise<Doctor[]>;
  update(doctor: Doctor): Promise<void>;
  delete(id: string): Promise<void>;
}
