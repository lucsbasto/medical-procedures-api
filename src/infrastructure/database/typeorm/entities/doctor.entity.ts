import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { ContactEntity } from './contact.entity';
import { DefaultEntity } from './default.entity';
import { MedicalProcedureEntity } from './medical-procedure.entity';
import { PatientEntity } from './patient.entity';

@Entity('doctors')
export class DoctorEntity extends DefaultEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  crm: string;

  @Column({ type: 'varchar', length: 100 })
  specialty: string;

  @Column(() => ContactEntity)
  contact?: ContactEntity;

  @OneToMany(
    () => MedicalProcedureEntity,
    (medicalProcedure) => medicalProcedure.doctor,
  )
  medicalProcedures: MedicalProcedureEntity[];

  @ManyToMany(
    () => PatientEntity,
    (patient) => patient.doctors,
  )
  @JoinTable({
    name: 'doctors_patients',
    joinColumn: { name: 'doctor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'patient_id', referencedColumnName: 'id' },
  })
  patients: PatientEntity[];
}
