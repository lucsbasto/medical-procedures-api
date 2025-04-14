import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DoctorEntity } from './doctor.entity';
import { PatientEntity } from './patient.entity';

@Entity('medical_procedures')
export class MedicalProcedureEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'doctor_id' })
  doctorId: string;

  @ManyToOne(
    () => DoctorEntity,
    (doctor) => doctor.medicalProcedures,
  )
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;

  @Column({ type: 'uuid', name: 'patient_id' })
  patientId: string;

  @ManyToOne(
    () => PatientEntity,
    (patient) => patient.medicalProcedures,
  )
  @JoinColumn({ name: 'patient_id' })
  patient: PatientEntity;

  @Column({ type: 'varchar', length: 255, name: 'procedure_name' })
  procedureName: string;

  @Column({ type: 'timestamp', name: 'procedure_date' })
  procedureDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'procedure_value' })
  procedureValue: number;

  @Column({ type: 'enum', enum: PaymentStatus, name: 'payment_status' })
  paymentStatus: PaymentStatus;

  @Column({ type: 'varchar', length: 255, name: 'denial_reason', nullable: true })
  denialReason: string | null;
}
