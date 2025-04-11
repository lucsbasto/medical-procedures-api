import { CRM } from '../value-objects/crm.value-object';
import { Specialty } from '../value-objects/specialty.value-object';

export class Doctor {
  private _id: string;
  private _name: string;
  private _crm: CRM;
  private _specialty: Specialty;

  constructor(id: string, name: string, crmValue: string, specialtyValue: string) {
    this._id = id;
    this._name = name;
    this._crm = CRM.create(crmValue);
    this._specialty = Specialty.create(specialtyValue);
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
}
