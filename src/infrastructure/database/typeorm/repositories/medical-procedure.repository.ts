import { Doctor } from '@/domain/doctor/entities/doctor.entity';
import { MedicalProcedure } from '@/domain/medical-procedure/entities/medical-procedure.entity';
import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';
import { MedicalProcedureRepository } from '@/domain/medical-procedure/repositories/medical-procedure.repository';
import { GenerateFinancialReportByDoctorInputDto } from '@/domain/medical-procedure/usecases/dtos/generate-financial-report-by-doctor-input.dto';
import { DoctorFinancialReportGrouped } from '@/domain/medical-procedure/usecases/interfaces/doctor-financial-report-grouped';
import { buildReportFilters } from '@/domain/medical-procedure/utils/build-financial-report-filters';
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

  async findAll(input?: any): Promise<MedicalProcedure[]> {
    const filters = buildReportFilters(input);

    const medicalProcedureEntities = await this.ormRepository.find({ where: filters, relations: ['doctor'] });
    const response = medicalProcedureEntities.map((entity) => {
      const doctor = new Doctor(
        entity.doctor.id,
        entity.doctor.name,
        entity.doctor.crm,
        entity.doctor.specialty,
        entity.doctor.contact.phone,
        entity.doctor.contact.email,
      );
      return new MedicalProcedure(
        entity.id,
        entity.doctorId,
        entity.patientId,
        entity.procedureName,
        entity.procedureDate,
        entity.procedureValue,
        entity.paymentStatus,
        entity.denialReason,
        doctor,
      );
    });
    return response;
  }

  async findGroupedByDoctor(filters: GenerateFinancialReportByDoctorInputDto): Promise<DoctorFinancialReportGrouped[]> {
    const qb = this.ormRepository.createQueryBuilder('procedure').leftJoin('procedure.doctor', 'doctor');

    if (filters.startDate && filters.endDate) {
      qb.andWhere('procedure.procedureDate BETWEEN :start AND :end', {
        start: filters.startDate,
        end: filters.endDate,
      });
    }

    if (filters.doctorId) {
      qb.andWhere('doctor.id = :doctorId', { doctorId: filters.doctorId });
    }

    return await qb
      .select('doctor.id', 'doctorId')
      .addSelect('doctor.name', 'doctorName')
      .addSelect('SUM(CASE WHEN procedure.paymentStatus = :paid THEN procedure.procedureValue ELSE 0 END)', 'totalPaid')
      .addSelect(
        'SUM(CASE WHEN procedure.paymentStatus = :pending THEN procedure.procedureValue ELSE 0 END)',
        'totalPending',
      )
      .addSelect(
        'SUM(CASE WHEN procedure.paymentStatus = :denied THEN procedure.procedureValue ELSE 0 END)',
        'totalDenied',
      )
      .setParameters({
        paid: PaymentStatus.PAID,
        pending: PaymentStatus.PENDING,
        denied: PaymentStatus.DENIED,
      })
      .groupBy('doctor.id')
      .getRawMany();
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
