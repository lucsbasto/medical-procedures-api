export interface DeniedProcedure {
  id: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  procedureName: string;
  procedureDate: Date;
  procedureValue: number;
  denialReason: string | null;
}

export type GenerateDeniedReportByPeriodOutputDto = DeniedProcedure[];
