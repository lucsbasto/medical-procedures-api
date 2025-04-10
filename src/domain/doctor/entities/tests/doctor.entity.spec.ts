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
});