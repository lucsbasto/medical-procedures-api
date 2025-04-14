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
  const date_10_04 = new Date('2025-04-10T12:00:00-03:00');

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
  const procedure4 = new MedicalProcedure('4', 'doctor-1', 'patient-4', 'Curativo', date_10_04, 30, PaymentStatus.PAID);

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
            denialReason: null,
          },
          {
            id: '3',
            doctorId: 'doctor-1',
            patientId: 'patient-3',
            procedureDate: procedure3.procedureDate,
            procedureValue: 50,
            paymentStatus: PaymentStatus.PAID,
            procedureName: 'Retorno',
            denialReason: null,
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
            denialReason: null,
          },
        ],
        totalProcedures: 1,
        totalValue: 200,
      },
    ]);
  });

  it('should return an empty array if there are no procedures for the given date', async () => {
    const input: GenerateDailyProcedureReportByDoctorInputDto = { date: date_11_04 };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([]);

    const result = await generateDailyProcedureReportByDoctorUseCase.execute(input);

    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
    expect(mockDoctorRepository.findById).not.toHaveBeenCalled();
  });

  it('should handle doctors not found in the DoctorRepository', async () => {
    const input: GenerateDailyProcedureReportByDoctorInputDto = { date: date_11_04 };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure1]);
    mockDoctorRepository.findById.mockResolvedValue(null);

    const result = await generateDailyProcedureReportByDoctorUseCase.execute(input);

    expect(result).toHaveLength(1);
    expect(result).toEqual([
      {
        doctorId: 'doctor-1',
        doctorName: 'Unknown Doctor',
        procedures: [
          {
            id: '1',
            doctorId: 'doctor-1',
            patientId: 'patient-1',
            procedureDate: procedure1.procedureDate,
            procedureValue: 100,
            paymentStatus: PaymentStatus.PAID,
            procedureName: 'Consulta',
            denialReason: null,
          },
        ],
        totalProcedures: 1,
        totalValue: 100,
      },
    ]);
  });

  it('should throw an error if the date is not provided', async () => {
    const input: GenerateDailyProcedureReportByDoctorInputDto = { date: undefined as any };

    await expect(generateDailyProcedureReportByDoctorUseCase.execute(input)).rejects.toThrow(
      'Date must be provided for the daily report.',
    );
    expect(mockMedicalProcedureRepository.findAll).not.toHaveBeenCalled();
    expect(mockDoctorRepository.findById).not.toHaveBeenCalled();
  });

  it('should only include procedures from the specified date', async () => {
    const input: GenerateDailyProcedureReportByDoctorInputDto = { date: date_10_04 };

    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure4]);
    mockDoctorRepository.findById.mockResolvedValue(doctor1);

    const result = await generateDailyProcedureReportByDoctorUseCase.execute(input);

    expect(result).toHaveLength(1);
    expect(result).toEqual([
      {
        doctorId: 'doctor-1',
        doctorName: 'Dr. João',
        procedures: [
          {
            id: '4',
            doctorId: 'doctor-1',
            patientId: 'patient-4',
            procedureDate: procedure4.procedureDate,
            procedureValue: 30,
            paymentStatus: PaymentStatus.PAID,
            procedureName: 'Curativo',
            denialReason: null,
          },
        ],
        totalProcedures: 1,
        totalValue: 30,
      },
    ]);
  });
});
