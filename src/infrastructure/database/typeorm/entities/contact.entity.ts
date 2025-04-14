import { Column } from 'typeorm';

export class ContactEntity {
  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email?: string;
}
