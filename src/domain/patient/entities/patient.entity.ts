import { Contact } from '../value-objects/contact.value-objects';

export class Patient {
  private _id: string;
  private _name: string;
  private _contact: Contact;

  constructor(id: string, name: string, phone: string, email?: string) {
    this._id = id;
    this._name = name;
    this._contact = Contact.create(phone, email);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get phone(): string {
    return this._contact.phone;
  }

  get email(): string | undefined {
    return this._contact.email;
  }
}
