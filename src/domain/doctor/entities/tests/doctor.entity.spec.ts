import { Doctor } from '../doctor.entity';

describe('Doctor', () => {
  it('should create a valid Doctor instance', () => {
    const id = 'doctor-123';
    const name = 'Dr. John Doe';
    const crmValue = 'sp123456';
    const specialtyValue = 'Cardiology';
    const phone = '1199999999';
    const email = 'john.doe@example.com';

    const doctor = new Doctor(id, name, crmValue, specialtyValue, phone, email);

    expect(doctor).toBeInstanceOf(Doctor);
    expect(doctor.id).toBe(id);
    expect(doctor.name).toBe(name);
    expect(doctor.crm).toBe(crmValue.toUpperCase());
    expect(doctor.specialty).toBe(specialtyValue.trim().toUpperCase());
    expect(doctor.phone).toBe(phone);
    expect(doctor.email).toBe(email);
  });

  it('should create a Doctor with correctly created CRM and Specialty Value Objects', () => {
    const id = 'doctor-456';
    const name = 'Dr. Jane Smith';
    const crmValue = 'rj987654';
    const specialtyValue = 'Dermatology';
    const phone = '2188888888';
    const email = 'jane.smith@example.com';

    const doctor = new Doctor(id, name, crmValue, specialtyValue, phone, email);

    expect(doctor.crm).toBe(crmValue.toUpperCase());
    expect(doctor.specialty).toBe(specialtyValue.toUpperCase());
    expect(doctor.phone).toBe(phone);
    expect(doctor.email).toBe(email);
  });

  it('should correctly retrieve Doctor properties', () => {
    const id = 'doctor-789';
    const name = 'Dr. Robert Jones';
    const crmValue = 'MG112233';
    const specialtyValue = 'Neurology';
    const phone = '3177777777';
    const email = 'robert.jones@example.com';

    const doctor = new Doctor(id, name, crmValue, specialtyValue, phone, email);

    expect(doctor.id).toBe('doctor-789');
    expect(doctor.name).toBe('Dr. Robert Jones');
    expect(doctor.crm).toBe('MG112233'.toUpperCase());
    expect(doctor.specialty).toBe('Neurology'.trim().toUpperCase());
    expect(doctor.phone).toBe('3177777777');
    expect(doctor.email).toBe('robert.jones@example.com');
  });

  it('should create a Doctor instance with optional phone and email', () => {
    const id = 'doctor-abc';
    const name = 'Dr. Alice Brown';
    const crmValue = 'es654321';
    const specialtyValue = 'Pediatrics';

    const doctor = new Doctor(id, name, crmValue, specialtyValue);

    expect(doctor).toBeInstanceOf(Doctor);
    expect(doctor.id).toBe(id);
    expect(doctor.name).toBe(name);
    expect(doctor.crm).toBe(crmValue.toUpperCase());
    expect(doctor.specialty).toBe(specialtyValue.trim().toUpperCase());
    expect(doctor.phone).toBeUndefined();
    expect(doctor.email).toBeUndefined();
  });
});
