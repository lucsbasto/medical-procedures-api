import { MedicalProcedure } from '@/domain/medical-procedure/entities/medical-procedure.entity';
import { MedicalProcedureRepository } from '@/domain/medical-procedure/repositories/medical-procedure.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalProcedureEntity } from '../entities/medical-procedure.entity';

@Injectable()
export class TypeOrmMedicalProcedureRepository implements MedicalProcedureRepository {
  constructor(
    @InjectRepository(MedicalProcedureEntity)
    private readonly ormRepository: Repository<MedicalProcedureEntity>,
  ) {}

  async create(medicalProcedure: MedicalProcedure): Promise<MedicalProcedure> {
    const medicalProcedureEntity = this.ormRepository.create({
      id: medicalProcedure.id,
      doctorId: medicalProcedure.doctorId,
      patientId: medicalProcedure.patientId,
      procedureName: medicalProcedure.procedureName,
      procedureDate: medicalProcedure.procedureDate,
      procedureValue: medicalProcedure.procedureValue,
      paymentStatus: medicalProcedure.paymentStatus,
      denialReason: medicalProcedure.denialReason,
    });
    const savedMedicalProcedure = await this.ormRepository.save(medicalProcedureEntity);
    return new MedicalProcedure(
      savedMedicalProcedure.id,
      savedMedicalProcedure.doctorId,
      savedMedicalProcedure.patientId,
      savedMedicalProcedure.procedureName,
      savedMedicalProcedure.procedureDate,
      savedMedicalProcedure.procedureValue,
      savedMedicalProcedure.paymentStatus,
      savedMedicalProcedure.denialReason,
    );
  }

  async findById(id: string): Promise<MedicalProcedure | null> {
    const medicalProcedureEntity = await this.ormRepository.findOne({ where: { id } });
    if (!medicalProcedureEntity) {
      return null;
    }
    return new MedicalProcedure(
      medicalProcedureEntity.id,
      medicalProcedureEntity.doctorId,
      medicalProcedureEntity.patientId,
      medicalProcedureEntity.procedureName,
      medicalProcedureEntity.procedureDate,
      medicalProcedureEntity.procedureValue,
      medicalProcedureEntity.paymentStatus,
      medicalProcedureEntity.denialReason,
    );
  }

  async findAll(filters?: { [key: string]: any }): Promise<MedicalProcedure[]> {
    const medicalProcedureEntities = await this.ormRepository.find({ where: filters });
    return medicalProcedureEntities.map(
      (entity) =>
        new MedicalProcedure(
          entity.id,
          entity.doctorId,
          entity.patientId,
          entity.procedureName,
          entity.procedureDate,
          entity.procedureValue,
          entity.paymentStatus,
          entity.denialReason,
        ),
    );
  }

  async update(medicalProcedure: MedicalProcedure): Promise<void> {
    await this.ormRepository.update(medicalProcedure.id, {
      doctorId: medicalProcedure.doctorId,
      patientId: medicalProcedure.patientId,
      procedureName: medicalProcedure.procedureName,
      procedureDate: medicalProcedure.procedureDate,
      procedureValue: medicalProcedure.procedureValue,
      paymentStatus: medicalProcedure.paymentStatus,
      denialReason: medicalProcedure.denialReason,
    });
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
