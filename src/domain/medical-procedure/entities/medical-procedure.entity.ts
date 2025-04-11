import { PaymentStatus } from '../enums/payment-status.enum';

export class MedicalProcedure {
  private _id: string;
  private _doctorId: string;
  private _patientId: string;
  private _procedureDate: Date;
  private _procedureValue: number;
  private _paymentStatus: PaymentStatus;
  private _procedureName: string;
  private _denialReason: string | null;

  constructor(
    id: string,
    doctorId: string,
    patientId: string,
    procedureName: string,
    procedureDate: Date,
    procedureValue: number,
    paymentStatus: PaymentStatus,
    denialReason: string | null = null,
  ) {
    this._id = id;
    this._doctorId = doctorId;
    this._patientId = patientId;
    this._procedureDate = procedureDate;
    this._procedureValue = procedureValue;
    this._paymentStatus = paymentStatus;
    this._procedureName = procedureName;
    this._denialReason = denialReason;
    this.validatePaymentStatus();
    this.validateProcedureName();
    this.validateProcedureValue();
    this.validateDenialReason(); // Adicionando a nova validação
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

  get procedureName(): string {
    return this._procedureName;
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

  get denialReason(): string | null {
    return this._denialReason;
  }

  private validatePaymentStatus(): void {
    const allowedStatuses = Object.values(PaymentStatus);
    if (!allowedStatuses.includes(this._paymentStatus)) {
      throw new Error(
        `Invalid payment status: ${this._paymentStatus}. Allowed statuses are: ${allowedStatuses.join(', ')}`,
      );
    }
  }

  private validateProcedureName(): void {
    if (!this._procedureName || this._procedureName.trim() === '') {
      throw new Error('Procedure name cannot be empty.');
    }
  }

  private validateProcedureValue(): void {
    if (this._procedureValue === undefined || this._procedureValue === null || this._procedureValue < 0) {
      throw new Error('Procedure value must be a non-negative number.');
    }
  }

  private validateDenialReason(): void {
    if (this._paymentStatus === PaymentStatus.DENIED && (!this._denialReason || this._denialReason.trim() === '')) {
      throw new Error('Denial reason must be provided when payment status is DENIED.');
    }
  }
}
