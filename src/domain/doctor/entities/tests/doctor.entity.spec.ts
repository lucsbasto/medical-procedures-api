// src/domain/doctor/entities/doctor.entity.spec.ts

import { Doctor } from "../doctor.entity";



describe('Doctor', () => {
  it('should create a valid Doctor instance', () => {
    const id = 'doctor-123';
    const name = 'Dr. John Doe';
    const crmValue = 'sp123456';
    const specialtyValue = 'Cardiology';

    const doctor = new Doctor(id, name, crmValue, specialtyValue);

    expect(doctor).toBeInstanceOf(Doctor);
    expect(doctor.id).toBe(id);
    expect(doctor.name).toBe(name);
    expect(doctor.crm).toBe(crmValue.toUpperCase());
    expect(doctor.specialty).toBe(specialtyValue.trim().toUpperCase());
  });
  
  it('should create a Doctor with correctly created CRM and Specialty Value Objects', () => {
    const id = 'doctor-456';
    const name = 'Dr. Jane Smith';
    const crmValue = 'rj987654';
    const specialtyValue = 'Dermatology';

    const doctor = new Doctor(id, name, crmValue, specialtyValue);

    expect(doctor.crm).toBe(crmValue.toUpperCase());
    expect(doctor.specialty).toBe(specialtyValue.toUpperCase());
  });

  
  it('should correctly retrieve Doctor properties', () => {
    const id = 'doctor-789';
    const name = 'Dr. Robert Jones';
    const crmValue = 'MG112233';
    const specialtyValue = 'Neurology';

    const doctor = new Doctor(id, name, crmValue, specialtyValue);

    expect(doctor.id).toBe('doctor-789');
    expect(doctor.name).toBe('Dr. Robert Jones');
    expect(doctor.crm).toBe('MG112233'.toUpperCase());
    expect(doctor.specialty).toBe('Neurology'.trim().toUpperCase());
  });
});