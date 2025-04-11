import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';

export interface MedicalProcedureOutputDto {
  id: string;
  doctorId: string;
  patientId: string;
  procedureName: string;
  procedureDate: Date;
  procedureValue: number;
  paymentStatus: PaymentStatus;
}
