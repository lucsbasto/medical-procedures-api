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
});
