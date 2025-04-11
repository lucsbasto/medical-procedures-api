import { Patient } from '../patient.entity';

describe('Patient', () => {
  it('should create a valid Patient instance with phone only', () => {
    const id = 'patient-123';
    const name = 'Alice Smith';
    const phone = '1234567890';

    const patient = new Patient(id, name, phone);

    expect(patient).toBeInstanceOf(Patient);
    expect(patient.id).toBe(id);
    expect(patient.name).toBe(name);
    expect(patient.phone).toBe(phone);
    expect(patient.email).toBeUndefined();
  });

  it('should create a valid Patient instance with phone and email', () => {
    const id = 'patient-456';
    const name = 'Bob Johnson';
    const phone = '0987654321';
    const email = 'bob.j@example.com';

    const patient = new Patient(id, name, phone, email);

    expect(patient).toBeInstanceOf(Patient);
    expect(patient.id).toBe(id);
    expect(patient.name).toBe(name);
    expect(patient.phone).toBe(phone);
    expect(patient.email).toBe(email);
  });
});
