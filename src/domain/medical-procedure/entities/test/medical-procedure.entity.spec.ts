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
    const procedureName = 'Consulta de Rotina';

    const medicalProcedure = new MedicalProcedure(
      id,
      doctorId,
      patientId,
      procedureName,
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

  it('should throw an error for invalid payment status', () => {
    expect(() => {
      new MedicalProcedure(
        'procedure-456',
        'doctor-def',
        'patient-uvw',
        'Exame Laboratorial',
        new Date(),
        75.5,
        'invalid-status' as PaymentStatus,
      );
    }).toThrow('Invalid payment status: invalid-status. Allowed statuses are: PAID, PENDING, GLOSSED');
  });

  it('should correctly retrieve MedicalProcedure properties', () => {
    const id = 'procedure-789';
    const doctorId = 'doctor-ghi';
    const patientId = 'patient-rst';
    const procedureDate = new Date('2025-04-15');
    const procedureValue = 200.75;
    const paymentStatus = PaymentStatus.PENDING;
    const procedureName = 'Consulta de Rotina';

    const medicalProcedure = new MedicalProcedure(
      id,
      doctorId,
      patientId,
      procedureName,
      procedureDate,
      procedureValue,
      paymentStatus,
    );

    expect(medicalProcedure.id).toBe('procedure-789');
    expect(medicalProcedure.doctorId).toBe('doctor-ghi');
    expect(medicalProcedure.patientId).toBe('patient-rst');
    expect(medicalProcedure.procedureDate).toEqual(new Date('2025-04-15'));
    expect(medicalProcedure.procedureValue).toBe(200.75);
    expect(medicalProcedure.paymentStatus).toBe(PaymentStatus.PENDING);
  });

  it('should throw an error if procedureName is empty', () => {
    expect(() => {
      new MedicalProcedure('procedure-789', 'doctor-ghi', 'patient-rst', '', new Date(), 200.75, PaymentStatus.PENDING);
    }).toThrow('Procedure name cannot be empty.');

    expect(() => {
      new MedicalProcedure('procedure-abc', 'doctor-jkl', 'patient-mno', '', new Date(), 50.0, PaymentStatus.PAID);
    }).toThrow('Procedure name cannot be empty.');

    expect(() => {
      new MedicalProcedure('procedure-def', 'doctor-pqr', 'patient-stu', '', new Date(), 120.0, PaymentStatus.GLOSSED);
    }).toThrow('Procedure name cannot be empty.');
  });

  it('should correctly retrieve MedicalProcedure properties including procedureName', () => {
    const id = 'procedure-789';
    const doctorId = 'doctor-ghi';
    const patientId = 'patient-rst';
    const procedureDate = new Date('2025-04-15');
    const procedureValue = 200.75;
    const paymentStatus = PaymentStatus.PENDING;
    const procedureName = 'Fisioterapia';

    const medicalProcedure = new MedicalProcedure(
      id,
      doctorId,
      patientId,
      procedureName,
      procedureDate,
      procedureValue,
      paymentStatus,
    );

    expect(medicalProcedure.id).toBe('procedure-789');
    expect(medicalProcedure.doctorId).toBe('doctor-ghi');
    expect(medicalProcedure.patientId).toBe('patient-rst');
    expect(medicalProcedure.procedureDate).toEqual(new Date('2025-04-15'));
    expect(medicalProcedure.procedureValue).toBe(200.75);
    expect(medicalProcedure.paymentStatus).toBe(PaymentStatus.PENDING);
    expect(medicalProcedure.procedureName).toBe('Fisioterapia');
  });
});
