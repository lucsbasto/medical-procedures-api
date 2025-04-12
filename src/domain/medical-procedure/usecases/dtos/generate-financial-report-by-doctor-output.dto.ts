export interface DoctorFinancialData {
  doctorId: string;
  doctorName?: string;
  totalPaid: number;
  totalPending: number;
  totalDenied: number;
}

export type GenerateFinancialReportByDoctorOutputDto = DoctorFinancialData[];
