import { Contact } from '../contact.value-objects';

describe('Contact', () => {
  it('should create a valid Contact with phone only', () => {
    const phone = '1234567890';
    const contact = Contact.create(phone);
    expect(contact.phone).toBe(phone);
    expect(contact.email).toBeUndefined();
  });
});
