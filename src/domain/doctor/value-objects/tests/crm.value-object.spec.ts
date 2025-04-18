import { CRM } from '../crm.value-object';

describe('CRM', () => {
  it('should create a valid CRM', () => {
    const crmValue = 'SP123456';
    const crm = CRM.create(crmValue);
    expect(crm.value).toBe(crmValue);
  });

  it('should create a valid CRM with lowercase state and trim spaces', () => {
    const crmValue = '  sp 987654 ';
    const crm = CRM.create(crmValue);
    expect(crm.value).toBe('SP987654');
  });

  it('should throw an error if CRM is empty', () => {
    expect(() => CRM.create('')).toThrow('CRM não pode ser vazio.');
    expect(() => CRM.create('   ')).toThrow('CRM não pode ser vazio.');
  });

  it('should throw an error if CRM format is invalid (no state)', () => {
    expect(() => CRM.create('123456')).toThrow(
      'Formato de CRM inválido. Deve seguir o padrão: XXNNNNN... (ex: SP123456).',
    );
  });

  it('should throw an error if CRM format is invalid (state too short)', () => {
    expect(() => CRM.create('S123456')).toThrow(
      'Formato de CRM inválido. Deve seguir o padrão: XXNNNNN... (ex: SP123456).',
    );
  });

  it('should throw an error if CRM format is invalid (no numbers)', () => {
    expect(() => CRM.create('SP')).toThrow('Formato de CRM inválido. Deve seguir o padrão: XXNNNNN... (ex: SP123456).');
  });

  it('should throw an error if CRM format is invalid (numbers are not numbers)', () => {
    expect(() => CRM.create('SPABC')).toThrow(
      'Formato de CRM inválido. Deve seguir o padrão: XXNNNNN... (ex: SP123456).',
    );
  });

  it('should be equal to another CRM with the same value', () => {
    const crm1 = CRM.create('RJ001122');
    const crm2 = CRM.create('rj001122');
    expect(crm1.equals(crm2)).toBe(true);
  });

  it('should not be equal to another CRM with a different value', () => {
    const crm1 = CRM.create('MG334455');
    const crm2 = CRM.create('RS667788');
    expect(crm1.equals(crm2)).toBe(false);
  });
});
