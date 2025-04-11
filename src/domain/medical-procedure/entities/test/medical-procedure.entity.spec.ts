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
    const denialReason = null;

    const medicalProcedure = new MedicalProcedure(
      id,
      doctorId,
      patientId,
      procedureName,
      procedureDate,
      procedureValue,
      paymentStatus,
      denialReason,
    );

    expect(medicalProcedure).toBeInstanceOf(MedicalProcedure);
    expect(medicalProcedure.id).toBe(id);
    expect(medicalProcedure.doctorId).toBe(doctorId);
    expect(medicalProcedure.patientId).toBe(patientId);
    expect(medicalProcedure.procedureDate).toBe(procedureDate);
    expect(medicalProcedure.procedureValue).toBe(procedureValue);
    expect(medicalProcedure.paymentStatus).toBe(paymentStatus);
    expect(medicalProcedure.denialReason).toBe(denialReason);
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
    }).toThrow('Invalid payment status: invalid-status. Allowed statuses are: PAID, PENDING, DENIED');
  });

  it('should correctly retrieve MedicalProcedure properties', () => {
    const id = 'procedure-789';
    const doctorId = 'doctor-ghi';
    const patientId = 'patient-rst';
    const procedureDate = new Date('2025-04-15');
    const procedureValue = 200.75;
    const paymentStatus = PaymentStatus.PENDING;
    const procedureName = 'Consulta de Rotina';
    const denialReason = 'Nenhuma pendência';

    const medicalProcedure = new MedicalProcedure(
      id,
      doctorId,
      patientId,
      procedureName,
      procedureDate,
      procedureValue,
      paymentStatus,
      denialReason,
    );

    expect(medicalProcedure.id).toBe('procedure-789');
    expect(medicalProcedure.doctorId).toBe('doctor-ghi');
    expect(medicalProcedure.patientId).toBe('patient-rst');
    expect(medicalProcedure.procedureDate).toEqual(new Date('2025-04-15'));
    expect(medicalProcedure.procedureValue).toBe(200.75);
    expect(medicalProcedure.paymentStatus).toBe(PaymentStatus.PENDING);
    expect(medicalProcedure.denialReason).toBe('Nenhuma pendência');
  });

  it('should throw an error if procedureName is empty', () => {
    expect(() => {
      new MedicalProcedure('procedure-789', 'doctor-ghi', 'patient-rst', '', new Date(), 200.75, PaymentStatus.PENDING);
    }).toThrow('Procedure name cannot be empty.');

    expect(() => {
      new MedicalProcedure('procedure-abc', 'doctor-jkl', 'patient-mno', '', new Date(), 50.0, PaymentStatus.PAID);
    }).toThrow('Procedure name cannot be empty.');

    expect(() => {
      new MedicalProcedure('procedure-def', 'doctor-pqr', 'patient-stu', '', new Date(), 120.0, PaymentStatus.DENIED);
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
    const denialReason = null;

    const medicalProcedure = new MedicalProcedure(
      id,
      doctorId,
      patientId,
      procedureName,
      procedureDate,
      procedureValue,
      paymentStatus,
      denialReason,
    );

    expect(medicalProcedure.id).toBe('procedure-789');
    expect(medicalProcedure.doctorId).toBe('doctor-ghi');
    expect(medicalProcedure.patientId).toBe('patient-rst');
    expect(medicalProcedure.procedureDate).toEqual(new Date('2025-04-15'));
    expect(medicalProcedure.procedureValue).toBe(200.75);
    expect(medicalProcedure.paymentStatus).toBe(PaymentStatus.PENDING);
    expect(medicalProcedure.procedureName).toBe('Fisioterapia');
    expect(medicalProcedure.denialReason).toBe(denialReason);
  });

  it('should throw an error if denialReason is not provided when paymentStatus is DENIED', () => {
    expect(() => {
      new MedicalProcedure(
        'procedure-abc',
        'doctor-123',
        'patient-456',
        'Consulta',
        new Date(),
        100,
        PaymentStatus.DENIED,
        null,
      );
    }).toThrow('Denial reason must be provided when payment status is DENIED.');

    expect(() => {
      new MedicalProcedure(
        'procedure-def',
        'doctor-789',
        'patient-012',
        'Exame',
        new Date(),
        50,
        PaymentStatus.DENIED,
        '',
      );
    }).toThrow('Denial reason must be provided when payment status is DENIED.');

    expect(() => {
      new MedicalProcedure(
        'procedure-ghi',
        'doctor-345',
        'patient-678',
        'Retorno',
        new Date(),
        25,
        PaymentStatus.DENIED,
        '   ',
      );
    }).toThrow('Denial reason must be provided when payment status is DENIED.');
  });

  it('should NOT throw an error if denialReason is not provided when paymentStatus is NOT DENIED', () => {
    expect(() => {
      new MedicalProcedure(
        'procedure-jkl',
        'doctor-901',
        'patient-234',
        'Curativo',
        new Date(),
        10,
        PaymentStatus.PAID,
        null,
      );
    }).not.toThrow();

    expect(() => {
      new MedicalProcedure(
        'procedure-mno',
        'doctor-567',
        'patient-890',
        'Inalação',
        new Date(),
        15,
        PaymentStatus.PENDING,
        '',
      );
    }).not.toThrow();
  });

  it('should correctly set and retrieve the denialReason', () => {
    const id = 'procedure-pqr';
    const doctorId = 'doctor-112';
    const patientId = 'patient-334';
    const procedureDate = new Date('2025-04-16');
    const procedureValue = 75.0;
    const paymentStatus = PaymentStatus.DENIED;
    const procedureName = 'Radiografia';
    const denialReason = 'Código de procedimento inválido.';

    const medicalProcedure = new MedicalProcedure(
      id,
      doctorId,
      patientId,
      procedureName,
      procedureDate,
      procedureValue,
      paymentStatus,
      denialReason,
    );

    expect(medicalProcedure.paymentStatus).toBe(PaymentStatus.DENIED);
    expect(medicalProcedure.denialReason).toBe('Código de procedimento inválido.');
  });
});
