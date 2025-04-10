import { Specialty } from '../specialty.value-object';

describe('Specialty', () => {
  it('should create a valid Specialty', () => {
    const specialtyValue = 'Cardiology';
    const specialty = Specialty.create(specialtyValue);
    expect(specialty.value).toBe('Cardiology');
  });
});