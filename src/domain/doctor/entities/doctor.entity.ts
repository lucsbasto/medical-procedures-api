import { Contact } from '@/domain/patient/value-objects/contact.value-objects';
import { CRM } from '../value-objects/crm.value-object';
import { Specialty } from '../value-objects/specialty.value-object';

export class Doctor {
  private _id: string;
  private _name: string;
  private _crm: CRM;
  private _specialty: Specialty;
  private _contact: Contact;

  constructor(id: string, name: string, crmValue: string, specialtyValue: string, phone?: string, email?: string) {
    this._id = id;
    this._name = name;
    this._crm = CRM.create(crmValue);
    this._specialty = Specialty.create(specialtyValue);
    this._contact = Contact.create(phone, email);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get crm(): string {
    return this._crm.value;
  }

  get specialty(): string {
    return this._specialty.value;
  }

  get phone(): string {
    return this._contact?.phone;
  }

  get email(): string | undefined {
    return this._contact?.email;
  }
}
