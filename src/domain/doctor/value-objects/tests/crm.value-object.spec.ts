import { CRM } from "../crm.value-object";


describe('CRM', () => {
  it('should create a valid CRM', () => {
    const crmValue = 'SP123456';
    const crm = CRM.create(crmValue);
    expect(crm.value).toBe(crmValue);
  });
});