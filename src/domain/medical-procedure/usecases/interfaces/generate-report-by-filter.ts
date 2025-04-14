import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';

export interface FinancialReportFilters {
  procedureDate?: {
    gte: Date;
    lte: Date;
  };
  paymentStatus?: PaymentStatus;
  doctorId?: string;
}
