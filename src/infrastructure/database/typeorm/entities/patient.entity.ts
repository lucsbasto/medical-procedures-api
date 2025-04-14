import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { ContactEntity } from './contact.entity';
import { DefaultEntity } from './default.entity';
import { DoctorEntity } from './doctor.entity';
import { MedicalProcedureEntity } from './medical-procedure.entity';

@Entity('patients')
export class PatientEntity extends DefaultEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column(() => ContactEntity)
  contact: ContactEntity;

  @OneToMany(
    () => MedicalProcedureEntity,
    (medicalProcedure) => medicalProcedure.patient,
  )
  medicalProcedures: MedicalProcedureEntity[];

  @ManyToMany(
    () => DoctorEntity,
    (doctor) => doctor.patients,
  )
  doctors: DoctorEntity[];
}
