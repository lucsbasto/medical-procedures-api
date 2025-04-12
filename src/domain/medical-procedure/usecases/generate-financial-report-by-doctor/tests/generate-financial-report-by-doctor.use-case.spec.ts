import { Doctor } from '@/domain/doctor/entities/doctor.entity';
import { DoctorRepository } from '@/domain/doctor/repositories/doctor.repository';
import { MedicalProcedure } from '@/domain/medical-procedure/entities/medical-procedure.entity';
import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';
import { MedicalProcedureRepository } from '@/domain/medical-procedure/repositories/medical-procedure.repository';
import { GenerateFinancialReportByDoctorInputDto } from '../../dtos/generate-financial-report-by-doctor-input.dto';
import { GenerateFinancialReportByDoctorUseCase } from '../generate-financial-report-by-doctor.use-case';

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

describe('GenerateFinancialReportByDoctorUseCase', () => {
  let generateFinancialReportByDoctorUseCase: GenerateFinancialReportByDoctorUseCase;
  const startDate = new Date('2025-04-01T00:00:00-03:00');
  const endDate = new Date('2025-04-30T23:59:59-03:00');
  const midDate = new Date('2025-04-15T12:00:00-03:00');

  const procedure1 = new MedicalProcedure(
    '1',
    'doctor-1',
    'patient-1',
    'Consulta de Rotina',
    midDate,
    100,
    PaymentStatus.PAID,
    null,
  );
  const procedure2 = new MedicalProcedure(
    '2',
    'doctor-1',
    'patient-2',
    'Consulta de Rotina',
    midDate,
    50,
    PaymentStatus.PENDING,
    null,
  );
  const procedure3 = new MedicalProcedure(
    '3',
    'doctor-2',
    'patient-3',
    'Consulta de Rotina',
    midDate,
    75,
    PaymentStatus.PAID,
    null,
  );
  const procedure4 = new MedicalProcedure(
    '4',
    'doctor-1',
    'patient-4',
    'Consulta de Rotina',
    new Date('2025-05-01'),
    200,
    PaymentStatus.DENIED,
    'Motivo',
  );
  const procedure5 = new MedicalProcedure(
    '5',
    'doctor-2',
    'patient-5',
    'Consulta de Rotina',
    new Date('2025-03-31'),
    30,
    PaymentStatus.PENDING,
    null,
  );
  const procedure6 = new MedicalProcedure(
    '6',
    'doctor-1',
    'patient-6',
    'Consulta de Rotina',
    midDate,
    120,
    PaymentStatus.DENIED,
    'Outro motivo',
  );
  const procedure7 = new MedicalProcedure('7', 'doctor-3', 'patient-7', 'G', midDate, 90, PaymentStatus.PAID, null);

  const doctor1 = new Doctor('doctor-1', 'Dr. João', 'TO-123456', 'Cardiologista');
  const doctor2 = new Doctor('doctor-2', 'Dra. Maria', 'SP-123456', 'Dermatologista');
  const doctor3 = new Doctor('doctor-3', 'Dr. Pedro', 'MG-123456', 'Neurologista');

  beforeEach(() => {
    generateFinancialReportByDoctorUseCase = new GenerateFinancialReportByDoctorUseCase(
      mockMedicalProcedureRepository,
      mockDoctorRepository,
    );
    jest.clearAllMocks();
  });

  it('should generate a financial report for all doctors within the specified period', async () => {
    const input: GenerateFinancialReportByDoctorInputDto = { startDate, endDate };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([
      procedure1,
      procedure2,
      procedure3,
      procedure4,
      procedure5,
      procedure6,
      procedure7,
    ]);
    mockDoctorRepository.findById.mockImplementation((id) => {
      if (id === 'doctor-1') return Promise.resolve(doctor1);
      if (id === 'doctor-2') return Promise.resolve(doctor2);
      if (id === 'doctor-3') return Promise.resolve(doctor3);
      return Promise.resolve(null);
    });

    const result = await generateFinancialReportByDoctorUseCase.execute(input);

    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledWith({
      procedureDate: { gte: startDate, lte: endDate },
    });
    expect(result).toHaveLength(3);
    expect(result).toEqual([
      { doctorId: 'doctor-1', doctorName: 'Dr. João', totalDenied: 320, totalPaid: 100, totalPending: 50 },
      { doctorId: 'doctor-2', doctorName: 'Dra. Maria', totalDenied: 0, totalPaid: 75, totalPending: 30 },
      { doctorId: 'doctor-3', doctorName: 'Dr. Pedro', totalDenied: 0, totalPaid: 90, totalPending: 0 },
    ]);
  });

  it('should generate a financial report for a specific doctor within the period', async () => {
    const input: GenerateFinancialReportByDoctorInputDto = { startDate, endDate, doctorId: 'doctor-1' };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure1, procedure2, procedure6]);
    mockDoctorRepository.findById.mockResolvedValue(doctor1);

    const result = await generateFinancialReportByDoctorUseCase.execute(input);

    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledWith({
      procedureDate: { gte: startDate, lte: endDate },
      doctorId: 'doctor-1',
    });
    expect(result).toHaveLength(1);
    expect(result).toEqual([
      {
        doctorId: 'doctor-1',
        doctorName: 'Dr. João',
        totalPaid: 100,
        totalPending: 50,
        totalDenied: 120,
      },
    ]);
  });

  it('should return an empty array if no procedures are found within the period', async () => {
    const input: GenerateFinancialReportByDoctorInputDto = { startDate, endDate };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([]);

    const result = await generateFinancialReportByDoctorUseCase.execute(input);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should handle doctors not found in the DoctorRepository', async () => {
    const input: GenerateFinancialReportByDoctorInputDto = { startDate, endDate };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure1]);
    mockDoctorRepository.findById.mockResolvedValue(null);

    const result = await generateFinancialReportByDoctorUseCase.execute(input);

    expect(result).toHaveLength(1);
    expect(result).toEqual([
      {
        doctorId: 'doctor-1',
        totalPaid: 100,
        totalPending: 0,
        totalDenied: 0,
      },
    ]);
  });

  it('should throw an error if startDate is not provided', async () => {
    const input: GenerateFinancialReportByDoctorInputDto = { startDate: undefined as any, endDate };

    await expect(generateFinancialReportByDoctorUseCase.execute(input)).rejects.toThrow(
      'Start date and end date must be provided for the financial report.',
    );
    expect(mockMedicalProcedureRepository.findAll).not.toHaveBeenCalled();
    expect(mockDoctorRepository.findById).not.toHaveBeenCalled();
  });

  it('should throw an error if endDate is not provided', async () => {
    const input: GenerateFinancialReportByDoctorInputDto = { startDate, endDate: undefined as any };

    await expect(generateFinancialReportByDoctorUseCase.execute(input)).rejects.toThrow(
      'Start date and end date must be provided for the financial report.',
    );
    expect(mockMedicalProcedureRepository.findAll).not.toHaveBeenCalled();
    expect(mockDoctorRepository.findById).not.toHaveBeenCalled();
  });
});
