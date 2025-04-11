import { MedicalProcedureOutputDto } from './medical-procedure-output.dto';

interface DoctorDailyProcedures {
  doctorId: string;
  doctorName?: string;
  procedures: MedicalProcedureOutputDto[];
  totalProcedures: number;
  totalValue: number;
}

export type GenerateDailyProcedureReportByDoctorOutputDto = DoctorDailyProcedures[];
