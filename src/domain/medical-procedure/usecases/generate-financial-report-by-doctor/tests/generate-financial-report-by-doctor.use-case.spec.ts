import { Doctor } from '@/domain/doctor/entities/doctor.entity';
import { DoctorRepository } from '@/domain/doctor/repositories/doctor.repository';
import { MedicalProcedure } from '@/domain/medical-procedure/entities/medical-procedure.entity';
import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';
import { MedicalProcedureRepository } from '@/domain/medical-procedure/repositories/medical-procedure.repository';
import { GenerateFinancialReportByDoctorInputDto } from '../../dtos/generate-financial-report-by-doctor-input.dto';
import { DoctorFinancialReportGrouped } from '../../interfaces/doctor-financial-report-grouped';
import { GenerateFinancialReportByDoctorUseCase } from '../generate-financial-report-by-doctor.use-case';

const mockMedicalProcedureRepository: jest.Mocked<MedicalProcedureRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findGroupedByDoctor: jest.fn(),
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

  const doctor1 = new Doctor('doctor-1', 'Dr. João', 'TO-123456', 'Cardiologista');
  const findGroupedByDoctorResponse: DoctorFinancialReportGrouped[] = [
    {
      doctorId: 'doctor-1',
      doctorName: 'Dr. João',
      totalPaid: 100.0,
      totalPending: 50.0,
      totalDenied: 120.0,
    },
  ];
  const procedure1 = new MedicalProcedure(
    '1',
    'doctor-1',
    'patient-1',
    'Consulta de Rotina',
    midDate,
    100,
    PaymentStatus.PAID,
    null,
    doctor1,
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
    doctor1,
  );

  beforeEach(() => {
    generateFinancialReportByDoctorUseCase = new GenerateFinancialReportByDoctorUseCase(mockMedicalProcedureRepository);
    jest.clearAllMocks();
  });

  it('should generate a financial report for all doctors within the specified period', async () => {
    const input: GenerateFinancialReportByDoctorInputDto = { startDate, endDate };
    mockMedicalProcedureRepository.findGroupedByDoctor.mockResolvedValue(findGroupedByDoctorResponse);

    const result = await generateFinancialReportByDoctorUseCase.execute(input);

    expect(mockMedicalProcedureRepository.findGroupedByDoctor).toHaveBeenCalledWith({
      startDate,
      endDate,
    });
    expect(result).toHaveLength(1);
    expect(result).toEqual([
      {
        doctorId: 'doctor-1',
        doctorName: 'Dr. João',
        totalDenied: 120,
        totalPaid: 100,
        totalPending: 50,
      },
    ]);
  });

  it('should generate a financial report for a specific doctor within the period', async () => {
    const input: GenerateFinancialReportByDoctorInputDto = { startDate, endDate, doctorId: 'doctor-1' };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure1, procedure2]);

    const result = await generateFinancialReportByDoctorUseCase.execute(input);

    expect(mockMedicalProcedureRepository.findGroupedByDoctor).toHaveBeenCalledWith({
      startDate,
      endDate,
      doctorId: 'doctor-1',
    });
    expect(result).toHaveLength(1);
    expect(result).toEqual([
      {
        doctorId: 'doctor-1',
        doctorName: 'Dr. João',
        totalDenied: 120,
        totalPaid: 100,
        totalPending: 50,
      },
    ]);
  });

  it('should return an empty array if no procedures are found within the period', async () => {
    const input: GenerateFinancialReportByDoctorInputDto = { startDate, endDate };
    mockMedicalProcedureRepository.findGroupedByDoctor.mockResolvedValue([]);

    const result = await generateFinancialReportByDoctorUseCase.execute(input);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
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

  it('should throw an error if startDate is after endDate', async () => {
    const input: GenerateFinancialReportByDoctorInputDto = { startDate: endDate, endDate: startDate };

    await expect(generateFinancialReportByDoctorUseCase.execute(input)).rejects.toThrow(
      'Start date cannot be after the end date.',
    );
    expect(mockMedicalProcedureRepository.findAll).not.toHaveBeenCalled();
    expect(mockDoctorRepository.findById).not.toHaveBeenCalled();
  });
});
