import { Doctor } from '@/domain/doctor/entities/doctor.entity';
import { DoctorRepository } from '@/domain/doctor/repositories/doctor.repository';
import { MedicalProcedure } from '@/domain/medical-procedure/entities/medical-procedure.entity';
import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';
import { MedicalProcedureRepository } from '@/domain/medical-procedure/repositories/medical-procedure.repository';
import { GenerateDailyProcedureReportByDoctorInputDto } from '../../dtos/generate-daily-procedure-report-by-doctor-input.dto';
import { GenerateDailyProcedureReportByDoctorUseCase } from '../generate-daily-procedure-report-by-doctor.use-case';

const mockMedicalProcedureRepository: jest.Mocked<MedicalProcedureRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

const mockDoctorRepository: jest.Mocked<DoctorRepository> = {
  findById: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

describe('GenerateDailyProcedureReportByDoctorUseCase', () => {
  let generateDailyProcedureReportByDoctorUseCase: GenerateDailyProcedureReportByDoctorUseCase;

  beforeEach(() => {
    generateDailyProcedureReportByDoctorUseCase = new GenerateDailyProcedureReportByDoctorUseCase(
      mockMedicalProcedureRepository,
      mockDoctorRepository,
    );
    jest.clearAllMocks();
  });

  const date_11_04 = new Date('2025-04-11T12:00:00-03:00');

  const procedure1 = new MedicalProcedure(
    '1',
    'doctor-1',
    'patient-1',
    'Consulta',
    date_11_04,
    100,
    PaymentStatus.PAID,
  );
  const procedure2 = new MedicalProcedure(
    '2',
    'doctor-2',
    'patient-2',
    'Exame',
    date_11_04,
    200,
    PaymentStatus.PENDING,
  );
  const procedure3 = new MedicalProcedure('3', 'doctor-1', 'patient-3', 'Retorno', date_11_04, 50, PaymentStatus.PAID);

  const doctor1 = new Doctor('doctor-1', 'Dr. João', 'SP-123451', 'Cardiologia');
  const doctor2 = new Doctor('doctor-2', 'Dra. Maria', 'TO-678910', 'Dermatologia');

  it('should generate a daily report with procedures grouped by doctor', async () => {
    const input: GenerateDailyProcedureReportByDoctorInputDto = { date: date_11_04 };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure1, procedure2, procedure3]);
    mockDoctorRepository.findById.mockImplementation((id) => {
      if (id === 'doctor-1') return Promise.resolve(doctor1);
      if (id === 'doctor-2') return Promise.resolve(doctor2);
      return Promise.resolve(null);
    });

    const result = await generateDailyProcedureReportByDoctorUseCase.execute(input);

    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledWith({
      procedureDate: {
        gte: new Date('2025-04-11T00:00:00.000-03:00'),
        lte: new Date('2025-04-11T23:59:59.999-03:00'),
      },
    });
    expect(mockDoctorRepository.findById).toHaveBeenCalledTimes(2);
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      {
        doctorId: 'doctor-1',
        doctorName: 'Dr. João',
        procedures: [
          {
            id: '1',
            doctorId: 'doctor-1',
            patientId: 'patient-1',
            procedureDate: procedure1.procedureDate,
            procedureValue: 100,
            paymentStatus: PaymentStatus.PAID,
            procedureName: 'Consulta',
          },
          {
            id: '3',
            doctorId: 'doctor-1',
            patientId: 'patient-3',
            procedureDate: procedure3.procedureDate,
            procedureValue: 50,
            paymentStatus: PaymentStatus.PAID,
            procedureName: 'Retorno',
          },
        ],
        totalProcedures: 2,
        totalValue: 150,
      },
      {
        doctorId: 'doctor-2',
        doctorName: 'Dra. Maria',
        procedures: [
          {
            id: '2',
            doctorId: 'doctor-2',
            patientId: 'patient-2',
            procedureDate: procedure2.procedureDate,
            procedureValue: 200,
            paymentStatus: PaymentStatus.PENDING,
            procedureName: 'Exame',
          },
        ],
        totalProcedures: 1,
        totalValue: 200,
      },
    ]);
  });
});
