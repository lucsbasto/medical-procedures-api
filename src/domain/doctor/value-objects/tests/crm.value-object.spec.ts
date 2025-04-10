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
});