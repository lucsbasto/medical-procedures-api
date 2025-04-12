import { Doctor } from '@/domain/doctor/entities/doctor.entity';
import { DoctorRepository } from '@/domain/doctor/repositories/doctor.repository';
import { MedicalProcedure } from '@/domain/medical-procedure/entities/medical-procedure.entity';
import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';
import { MedicalProcedureRepository } from '@/domain/medical-procedure/repositories/medical-procedure.repository';
import { GenerateGlossesReportByPeriodInputDto } from '../../dtos/generate-glosses-report-by-period-input.dto';
import { GenerateGlossesReportByPeriodUseCase } from '../generate-glosses-report-by-period.use-case';

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

describe('GenerateGlossesReportByPeriodUseCase', () => {
  let generateGlossesReportByPeriodUseCase: GenerateGlossesReportByPeriodUseCase;
  const startDate = new Date('2025-04-01T00:00:00-03:00');
  const endDate = new Date('2025-04-30T23:59:59-03:00');
  const midDate = new Date('2025-04-15T12:00:00-03:00');

  const procedure1 = new MedicalProcedure(
    '1',
    'doctor-1',
    'patient-1',
    'Consulta',
    midDate,
    100,
    PaymentStatus.DENIED,
    'Falta de autorização',
  );
  const procedure2 = new MedicalProcedure(
    '2',
    'doctor-2',
    'patient-2',
    'Exame',
    midDate,
    200,
    PaymentStatus.DENIED,
    'Código incorreto',
  );
  const procedure3 = new MedicalProcedure(
    '3',
    'doctor-1',
    'patient-3',
    'Retorno',
    endDate,
    50,
    PaymentStatus.DENIED,
    'Fora do período',
  );

  const doctor1 = new Doctor('doctor-1', 'Dr. João', 'TO-123456', 'Cardiologista');
  const doctor2 = new Doctor('doctor-2', 'Dra. Maria', 'SP-123456', 'Dermatologista');
  const doctor3 = new Doctor('doctor-3', 'Dr. Pedro', 'MG-123456', 'Pediatra');

  beforeEach(() => {
    generateGlossesReportByPeriodUseCase = new GenerateGlossesReportByPeriodUseCase(
      mockMedicalProcedureRepository,
      mockDoctorRepository,
    );
    mockDoctorRepository.findById.mockImplementation((id) => {
      if (id === 'doctor-1') return Promise.resolve(doctor1);
      if (id === 'doctor-2') return Promise.resolve(doctor2);
      if (id === 'doctor-3') return Promise.resolve(doctor3);
      return Promise.resolve(null);
    });
    jest.clearAllMocks();
  });

  it('should generate a report of glossed procedures within the specified period', async () => {
    const input: GenerateGlossesReportByPeriodInputDto = { startDate, endDate };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure1, procedure2]);

    const result = await generateGlossesReportByPeriodUseCase.execute(input);

    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledWith({
      procedureDate: { gte: startDate, lte: endDate },
      paymentStatus: PaymentStatus.DENIED,
    });
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      {
        id: '1',
        doctorId: 'doctor-1',
        doctorName: 'Dr. João',
        patientId: 'patient-1',
        procedureName: 'Consulta',
        procedureDate: midDate,
        procedureValue: 100,
        denialReason: 'Falta de autorização',
      },
      {
        id: '2',
        doctorId: 'doctor-2',
        doctorName: 'Dra. Maria',
        patientId: 'patient-2',
        procedureName: 'Exame',
        procedureDate: midDate,
        procedureValue: 200,
        denialReason: 'Código incorreto',
      },
    ]);
  });

  it('should return an empty array if no procedures are glossed within the period', async () => {
    const input: GenerateGlossesReportByPeriodInputDto = { startDate, endDate };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([]);

    const result = await generateGlossesReportByPeriodUseCase.execute(input);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should only include procedures within the specified date range', async () => {
    const input: GenerateGlossesReportByPeriodInputDto = { startDate, endDate };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure1, procedure2, procedure3]);

    const expectedProcedure1 = {
      id: '1',
      doctorId: 'doctor-1',
      doctorName: 'Dr. João',
      patientId: 'patient-1',
      procedureName: 'Consulta',
      procedureDate: midDate,
      procedureValue: 100,
      denialReason: 'Falta de autorização',
    };

    const expectedProcedure2 = {
      id: '2',
      doctorId: 'doctor-2',
      doctorName: 'Dra. Maria',
      patientId: 'patient-2',
      procedureName: 'Exame',
      procedureDate: midDate,
      procedureValue: 200,
      denialReason: 'Código incorreto',
    };

    const expectedProcedure3 = {
      id: '3',
      doctorId: 'doctor-1',
      doctorName: 'Dr. João',
      patientId: 'patient-3',
      procedureName: 'Retorno',
      procedureDate: endDate,
      procedureValue: 50,
      denialReason: 'Fora do período',
    };
    const result = await generateGlossesReportByPeriodUseCase.execute(input);

    expect(result).toHaveLength(3);
    expect(result).toEqual([expectedProcedure1, expectedProcedure2, expectedProcedure3]);
  });

  it('should handle doctors not found in the DoctorRepository', async () => {
    const input: GenerateGlossesReportByPeriodInputDto = { startDate, endDate };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure1]);

    const result = await generateGlossesReportByPeriodUseCase.execute(input);

    expect(result).toHaveLength(1);

    expect(result).toEqual([
      {
        denialReason: 'Falta de autorização',
        doctorId: 'doctor-1',
        doctorName: 'Dr. João',
        id: '1',
        patientId: 'patient-1',
        procedureDate: new Date('2025-04-15T15:00:00.000Z'),
        procedureName: 'Consulta',
        procedureValue: 100,
      },
    ]);
  });

  it('should throw an error if startDate is not provided', async () => {
    const input: GenerateGlossesReportByPeriodInputDto = { startDate: undefined as any, endDate };

    await expect(generateGlossesReportByPeriodUseCase.execute(input)).rejects.toThrow(
      'Start date and end date must be provided for the glosses report.',
    );
    expect(mockMedicalProcedureRepository.findAll).not.toHaveBeenCalled();
    expect(mockDoctorRepository.findById).not.toHaveBeenCalled();
  });

  it('should throw an error if endDate is not provided', async () => {
    const input: GenerateGlossesReportByPeriodInputDto = { startDate, endDate: undefined as any };

    await expect(generateGlossesReportByPeriodUseCase.execute(input)).rejects.toThrow(
      'Start date and end date must be provided for the glosses report.',
    );
    expect(mockMedicalProcedureRepository.findAll).not.toHaveBeenCalled();
    expect(mockDoctorRepository.findById).not.toHaveBeenCalled();
  });

  it('should throw an error if startDate is after endDate', async () => {
    const input: GenerateGlossesReportByPeriodInputDto = { startDate: endDate, endDate: startDate };

    await expect(generateGlossesReportByPeriodUseCase.execute(input)).rejects.toThrow(
      'Start date cannot be after the end date.',
    );
    expect(mockMedicalProcedureRepository.findAll).not.toHaveBeenCalled();
    expect(mockDoctorRepository.findById).not.toHaveBeenCalled();
  });

  it('should include glossed procedures from multiple doctors within the period with details', async () => {
    const input: GenerateGlossesReportByPeriodInputDto = { startDate, endDate };
    const procedure5_in_period = new MedicalProcedure(
      '5',
      'doctor-3',
      'patient-5',
      'Consulta',
      new Date('2025-04-20T10:00:00-03:00'),
      120,
      PaymentStatus.DENIED,
      'Erro de digitação',
    );
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure1, procedure2, procedure5_in_period]);

    const result = await generateGlossesReportByPeriodUseCase.execute(input);

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      {
        denialReason: 'Falta de autorização',
        doctorId: 'doctor-1',
        doctorName: 'Dr. João',
        id: '1',
        patientId: 'patient-1',
        procedureDate: new Date('2025-04-15T15:00:00.000Z'),
        procedureName: 'Consulta',
        procedureValue: 100,
      },
      {
        denialReason: 'Código incorreto',
        doctorId: 'doctor-2',
        doctorName: 'Dra. Maria',
        id: '2',
        patientId: 'patient-2',
        procedureDate: new Date('2025-04-15T15:00:00.000Z'),
        procedureName: 'Exame',
        procedureValue: 200,
      },
      {
        denialReason: 'Erro de digitação',
        doctorId: 'doctor-3',
        doctorName: 'Dr. Pedro',
        id: '5',
        patientId: 'patient-5',
        procedureDate: new Date('2025-04-20T13:00:00.000Z'),
        procedureName: 'Consulta',
        procedureValue: 120,
      },
    ]);
  });
});
