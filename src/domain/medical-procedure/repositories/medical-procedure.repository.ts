import { MedicalProcedure } from '../entities/medical-procedure.entity';
import { DoctorFinancialReportGrouped } from '../usecases/interfaces/doctor-financial-report-grouped';

export interface MedicalProcedureRepository {
  create(medicalProcedure: MedicalProcedure): Promise<MedicalProcedure>;
  findById(id: string): Promise<MedicalProcedure | null>;
  findAll(filters?: { [key: string]: any }): Promise<MedicalProcedure[]>;
  findGroupedByDoctor(filters?: { [key: string]: any }): Promise<DoctorFinancialReportGrouped[]>;
  update(medicalProcedure: MedicalProcedure): Promise<void>;
  delete(id: string): Promise<void>;
}
