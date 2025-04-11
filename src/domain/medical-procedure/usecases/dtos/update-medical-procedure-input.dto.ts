import { PaymentStatus } from '../../enums/payment-status.enum';

export interface UpdateMedicalProcedureInputDto {
  id: string;
  doctorId?: string;
  patientId?: string;
  procedureName?: string;
  procedureDate?: Date;
  procedureValue?: number;
  paymentStatus?: PaymentStatus;
}
