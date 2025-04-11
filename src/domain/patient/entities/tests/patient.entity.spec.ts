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

  it('should create a Patient with a correctly created Contact Value Object', () => {
    const id = 'patient-789';
    const name = 'Charlie Brown';
    const phone = '1112223333';
    const email = 'charlie@test.net';

    const patient = new Patient(id, name, phone, email);

    expect(patient.phone).toBe(phone.trim());
    expect(patient.email).toBe(email ? email.trim() : undefined);
  });

  it('should correctly retrieve Patient properties', () => {
    const id = 'patient-abc';
    const name = 'Diana Lee';
    const phone = '5554443333';
    const email = 'diana.l@work.org';

    const patient = new Patient(id, name, phone, email);

    expect(patient.id).toBe('patient-abc');
    expect(patient.name).toBe('Diana Lee');
    expect(patient.phone).toBe('5554443333');
    expect(patient.email).toBe('diana.l@work.org');
  });

  it('should handle undefined email correctly', () => {
    const id = 'patient-def';
    const name = 'Eve Williams';
    const phone = '9998887777';

    const patient = new Patient(id, name, phone);

    expect(patient.email).toBeUndefined();
  });
});
