import { GetAllDoctorsUseCase } from '@/domain/doctor/use-cases/get-all-doctors/get-all-doctors.use-case';
import { GetDoctorByIdUseCase } from '@/domain/doctor/use-cases/get-doctor-by-id/get-doctor-by-id.use-case';
import { RegisterDoctorUseCase } from '@/domain/doctor/use-cases/register-doctor/register-doctor.use-case';
import { DoctorEntity } from '@/infrastructure/database/typeorm/entities/doctor.entity';
import { TypeOrmDoctorRepository } from '@/infrastructure/database/typeorm/repositories/doctor.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsController } from './controllers/doctors.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  controllers: [DoctorsController],
  providers: [
    RegisterDoctorUseCase,
    GetAllDoctorsUseCase,
    GetDoctorByIdUseCase,
    {
      provide: 'DoctorRepository',
      useClass: TypeOrmDoctorRepository,
    },
  ],
})
export class DoctorsModule {}
