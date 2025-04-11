// src/domain/medical-procedure/entities/medical-procedure.entity.spec.ts

import { PaymentStatus } from '../../enums/payment-status.enum';
import { MedicalProcedure } from '../medical-procedure.entity';

describe('MedicalProcedure', () => {
  it('should create a valid MedicalProcedure instance', () => {
    const id = 'procedure-123';
    const doctorId = 'doctor-abc';
    const patientId = 'patient-xyz';
    const procedureDate = new Date();
    const procedureValue = 150.0;
    const paymentStatus = PaymentStatus.PAID;

    const medicalProcedure = new MedicalProcedure(
      id,
      doctorId,
      patientId,
      procedureDate,
      procedureValue,
      paymentStatus,
    );

    expect(medicalProcedure).toBeInstanceOf(MedicalProcedure);
    expect(medicalProcedure.id).toBe(id);
    expect(medicalProcedure.doctorId).toBe(doctorId);
    expect(medicalProcedure.patientId).toBe(patientId);
    expect(medicalProcedure.procedureDate).toBe(procedureDate);
    expect(medicalProcedure.procedureValue).toBe(procedureValue);
    expect(medicalProcedure.paymentStatus).toBe(paymentStatus);
  });
});
