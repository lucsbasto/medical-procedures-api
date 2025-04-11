import { Patient } from '../entities/patient.entity';

export interface PatientRepository {
  create(patient: Patient): Promise<Patient>;
  findById(id: string): Promise<Patient | null>;
  findAll(filters?: { [key: string]: any }): Promise<Patient[]>;
  update(doctor: Patient): Promise<void>;
  delete(id: string): Promise<void>;
}
