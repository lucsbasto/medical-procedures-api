import { PaymentStatus } from '../enums/payment-status.enum';

export class MedicalProcedure {
  private _id: string;
  private _doctorId: string;
  private _patientId: string;
  private _procedureDate: Date;
  private _procedureValue: number;
  private _paymentStatus: PaymentStatus;

  constructor(
    id: string,
    doctorId: string,
    patientId: string,
    procedureDate: Date,
    procedureValue: number,
    paymentStatus: PaymentStatus,
  ) {
    this._id = id;
    this._doctorId = doctorId;
    this._patientId = patientId;
    this._procedureDate = procedureDate;
    this._procedureValue = procedureValue;
    this._paymentStatus = paymentStatus;
    this.validatePaymentStatus();
  }

  get id(): string {
    return this._id;
  }

  get doctorId(): string {
    return this._doctorId;
  }

  get patientId(): string {
    return this._patientId;
  }

  get procedureDate(): Date {
    return this._procedureDate;
  }

  get procedureValue(): number {
    return this._procedureValue;
  }

  get paymentStatus(): PaymentStatus {
    return this._paymentStatus;
  }

  private validatePaymentStatus(): void {
    const allowedStatuses = Object.values(PaymentStatus);
    if (!allowedStatuses.includes(this._paymentStatus)) {
      throw new Error(
        `Invalid payment status: ${this._paymentStatus}. Allowed statuses are: ${allowedStatuses.join(', ')}`,
      );
    }
  }
}
