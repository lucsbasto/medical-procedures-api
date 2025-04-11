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
});
