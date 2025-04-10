import { CRM } from "../crm.value-object";


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
    expect(() => CRM.create('123456')).toThrow('Formato de CRM inválido. Deve seguir o padrão: XXNNNNN... (ex: SP123456).');
  });

  it('should throw an error if CRM format is invalid (state too short)', () => {
    expect(() => CRM.create('S123456')).toThrow('Formato de CRM inválido. Deve seguir o padrão: XXNNNNN... (ex: SP123456).');
  });
});