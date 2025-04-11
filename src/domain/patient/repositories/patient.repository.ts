import { Patient } from '../entities/patient.entity';

export interface PatientRepository {
  create(patient: Patient): Promise<void>;
  findById(id: string): Promise<Patient | null>;
  findByName(name: string): Promise<Patient[]>;
  findAll(): Promise<Patient[]>;
  update(doctor: Patient): Promise<void>;
  delete(id: string): Promise<void>;
}
