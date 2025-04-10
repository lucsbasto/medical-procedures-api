import { Specialty } from '../specialty.value-object';

describe('Specialty', () => {
  it('should create a valid Specialty', () => {
    const specialtyValue = 'Cardiology';
    const specialty = Specialty.create(specialtyValue);
    expect(specialty.value).toBe(specialtyValue.trim().toUpperCase());
  });

  it('should create a valid Specialty and trim leading/trailing spaces', () => {
    const specialtyValue = '  Dermatology  ';
    const specialty = Specialty.create(specialtyValue);
    expect(specialty.value).toBe(specialtyValue.trim().toUpperCase());
  });

  it('should throw an error if the provided value is empty', () => {
    expect(() => Specialty.create('')).toThrow('Specialty cannot be empty.');
  });

  it('should throw an error if the provided value contains only spaces', () => {
    expect(() => Specialty.create('   ')).toThrow('Specialty cannot be empty.');
  });

  it('should be equal to another Specialty with the same value', () => {
    const specialty1 = Specialty.create('Neurology');
    const specialty2 = Specialty.create('Neurology');
    expect(specialty1.equals(specialty2)).toBe(true);
  });

  it('should not be equal to another Specialty with a different value', () => {
    const specialty1 = Specialty.create('Pediatrics');
    const specialty2 = Specialty.create('Ophthalmology');
    expect(specialty1.equals(specialty2)).toBe(false);
  });

  it('should handle correctly casing correctly for equality (case-sensitive)', () => {
    const specialty1 = Specialty.create('Internal Medicine');
    const specialty2 = Specialty.create('internal medicine');
    expect(specialty1.equals(specialty2)).toBe(true);
  });
});