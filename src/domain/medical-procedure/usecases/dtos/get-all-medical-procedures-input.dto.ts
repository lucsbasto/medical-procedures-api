export interface GetAllMedicalProceduresInputDto {
  id?: string;
  doctorId?: string;
  patientId?: string;
  procedureDate?: Date | { gt?: Date; lt?: Date; gte?: Date; lte?: Date };
  procedureValue?: number | { gt?: number; lt?: number; gte?: number; lte?: number };
  paymentStatus?: string;
  [key: string]: any;
}
