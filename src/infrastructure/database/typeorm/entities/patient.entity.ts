import { Column, Entity } from 'typeorm';
import { ContactEntity } from './contact.entity';
import { DefaultEntity } from './default.entity';

@Entity('patients')
export class PatientEntity extends DefaultEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column(() => ContactEntity)
  contact: ContactEntity;
}
