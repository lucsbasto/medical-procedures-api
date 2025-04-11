import { Contact } from '../contact.value-objects';

describe('Contact', () => {
  it('should create a valid Contact with phone only', () => {
    const phone = '1234567890';
    const contact = Contact.create(phone);
    expect(contact.phone).toBe(phone);
    expect(contact.email).toBeUndefined();
  });

  it('should create a valid Contact with phone and email', () => {
    const phone = '0987654321';
    const email = 'test@example.com';
    const contact = Contact.create(phone, email);
    expect(contact.phone).toBe(phone);
    expect(contact.email).toBe(email);
  });

  it('should trim whitespace from phone and email', () => {
    const phoneWithSpaces = '  1112223333  ';
    const emailWithSpaces = '  test@example.com  ';
    const contact = Contact.create(phoneWithSpaces, emailWithSpaces);
    expect(contact.phone).toBe('1112223333');
    expect(contact.email).toBe('test@example.com');
  });

  it('should throw an error if phone is empty', () => {
    expect(() => Contact.create('')).toThrow('Patient contact phone cannot be empty.');
    expect(() => Contact.create('   ')).toThrow('Patient contact phone cannot be empty.');
  });

  it('should throw an error if email format is invalid', () => {
    const phone = '5556667777';
    expect(() => Contact.create(phone, 'invalid-email')).toThrow('Invalid email format.');
    expect(() => Contact.create(phone, 'test@example')).toThrow('Invalid email format.');
    expect(() => Contact.create(phone, '@example.com')).toThrow('Invalid email format.');
  });

  it('should be equal to another Contact with the same phone and email', () => {
    const contact1 = Contact.create('12345', 'test@test.com');
    const contact2 = Contact.create('12345', 'test@test.com');
    expect(contact1.equals(contact2)).toBe(true);
  });

  it('should be equal to another Contact with the same phone and undefined email', () => {
    const contact1 = Contact.create('54321', undefined);
    const contact2 = Contact.create('54321', undefined);
    expect(contact1.equals(contact2)).toBe(true);
  });

  it('should not be equal to another Contact with a different phone', () => {
    const contact1 = Contact.create('111', 'a@a.com');
    const contact2 = Contact.create('222', 'a@a.com');
    expect(contact1.equals(contact2)).toBe(false);
  });

  it('should not be equal to another Contact with a different email', () => {
    const contact1 = Contact.create('333', 'b@b.com');
    const contact2 = Contact.create('333', 'c@c.com');
    expect(contact1.equals(contact2)).toBe(false);
  });

  it('should not be equal to another Contact with one having email and the other not', () => {
    const contact1 = Contact.create('444', 'd@d.com');
    const contact2 = Contact.create('444', undefined);
    expect(contact1.equals(contact2)).toBe(false);
  });
});
