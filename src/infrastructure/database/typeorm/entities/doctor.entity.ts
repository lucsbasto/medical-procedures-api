import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity('doctors')
export class DoctorEntity extends DefaultEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  crm: string;

  @Column({ type: 'varchar', length: 100 })
  specialty: string;
}
