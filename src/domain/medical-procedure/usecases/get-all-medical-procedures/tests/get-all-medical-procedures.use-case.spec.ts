import { MedicalProcedure } from '@/domain/medical-procedure/entities/medical-procedure.entity';
import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';
import { MedicalProcedureRepository } from '@/domain/medical-procedure/repositories/medical-procedure.repository';
import { GetAllMedicalProceduresInputDto } from '../../dtos/get-all-medical-procedures-input.dto';
import { GetAllMedicalProceduresUseCase } from '../get-all-medical-procedures.use-case';

const mockMedicalProcedureRepository: jest.Mocked<MedicalProcedureRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

describe('GetAllMedicalProceduresUseCase', () => {
  let getAllMedicalProceduresUseCase: GetAllMedicalProceduresUseCase;

  beforeEach(() => {
    getAllMedicalProceduresUseCase = new GetAllMedicalProceduresUseCase(mockMedicalProcedureRepository);
    jest.clearAllMocks();
  });

  const procedure1 = new MedicalProcedure(
    '1',
    'doctor-1',
    'patient-1',
    'procedure-name-1',
    new Date('2025-04-11T10:00:00-03:00'),
    100,
    PaymentStatus.PAID,
  );
  const procedure2 = new MedicalProcedure(
    '2',
    'doctor-2',
    'patient-2',
    'procedure-name-2',
    new Date('2025-04-11T11:00:00-03:00'),
    200,
    PaymentStatus.PENDING,
  );
  const procedure3 = new MedicalProcedure(
    '3',
    'doctor-1',
    'patient-3',
    'procedure-name-3',
    new Date('2025-04-10T15:00:00-03:00'),
    150,
    PaymentStatus.DENIED,
    'denial-reason-3',
  );

  it('should return an array of all medical procedures when no filters are provided', async () => {
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure1, procedure2, procedure3]);

    const result = await getAllMedicalProceduresUseCase.execute();

    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledWith(undefined);
    expect(result).toHaveLength(3);
    expect(result).toEqual([
      {
        id: '1',
        doctorId: 'doctor-1',
        patientId: 'patient-1',
        procedureName: 'procedure-name-1',
        procedureDate: procedure1.procedureDate,
        procedureValue: 100,
        paymentStatus: PaymentStatus.PAID,
        denialReason: null,
      },
      {
        id: '2',
        doctorId: 'doctor-2',
        patientId: 'patient-2',
        procedureName: 'procedure-name-2',
        procedureDate: procedure2.procedureDate,
        procedureValue: 200,
        paymentStatus: PaymentStatus.PENDING,
        denialReason: null,
      },
      {
        id: '3',
        doctorId: 'doctor-1',
        patientId: 'patient-3',
        procedureName: 'procedure-name-3',
        procedureDate: procedure3.procedureDate,
        procedureValue: 150,
        paymentStatus: PaymentStatus.DENIED,
        denialReason: 'denial-reason-3',
      },
    ]);
  });

  it('should return an empty array if there are no medical procedures', async () => {
    mockMedicalProcedureRepository.findAll.mockResolvedValue([]);

    const result = await getAllMedicalProceduresUseCase.execute();

    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledWith(undefined);
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should filter medical procedures by doctorId', async () => {
    const filters: GetAllMedicalProceduresInputDto = { doctorId: 'doctor-1' };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure1, procedure3]);

    const result = await getAllMedicalProceduresUseCase.execute(filters);

    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      {
        id: '1',
        doctorId: 'doctor-1',
        patientId: 'patient-1',
        procedureName: 'procedure-name-1',
        procedureDate: procedure1.procedureDate,
        procedureValue: 100,
        paymentStatus: PaymentStatus.PAID,
        denialReason: null,
      },
      {
        id: '3',
        doctorId: 'doctor-1',
        patientId: 'patient-3',
        procedureName: 'procedure-name-3',
        procedureDate: procedure3.procedureDate,
        procedureValue: 150,
        paymentStatus: PaymentStatus.DENIED,
        denialReason: 'denial-reason-3',
      },
    ]);
  });

  it('should filter medical procedures by paymentStatus', async () => {
    const filters: GetAllMedicalProceduresInputDto = { paymentStatus: PaymentStatus.PENDING };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure2]);

    const result = await getAllMedicalProceduresUseCase.execute(filters);

    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(1);
    expect(result).toEqual([
      {
        id: '2',
        doctorId: 'doctor-2',
        patientId: 'patient-2',
        procedureName: 'procedure-name-2',
        procedureDate: procedure2.procedureDate,
        procedureValue: 200,
        paymentStatus: PaymentStatus.PENDING,
        denialReason: null,
      },
    ]);
  });

  it('should filter medical procedures by procedureDate greater than', async () => {
    const filterDate = new Date('2025-04-11T10:30:00-03:00');
    const filters: GetAllMedicalProceduresInputDto = { procedureDate: { gt: filterDate } };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure2]);

    const result = await getAllMedicalProceduresUseCase.execute(filters);

    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(1);
    expect(result).toEqual([
      {
        id: '2',
        doctorId: 'doctor-2',
        patientId: 'patient-2',
        procedureName: 'procedure-name-2',
        procedureDate: procedure2.procedureDate,
        procedureValue: 200,
        paymentStatus: PaymentStatus.PENDING,
        denialReason: null,
      },
    ]);
  });

  it('should handle multiple filters', async () => {
    const filters: GetAllMedicalProceduresInputDto = { doctorId: 'doctor-1', paymentStatus: PaymentStatus.PAID };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure1]);

    const result = await getAllMedicalProceduresUseCase.execute(filters);

    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(1);
    expect(result).toEqual([
      {
        id: '1',
        doctorId: 'doctor-1',
        patientId: 'patient-1',
        procedureName: 'procedure-name-1',
        procedureDate: procedure1.procedureDate,
        procedureValue: 100,
        paymentStatus: PaymentStatus.PAID,
        denialReason: null,
      },
    ]);
  });

  it('should return an empty array if no medical procedures match the filters', async () => {
    const filters: GetAllMedicalProceduresInputDto = { doctorId: 'non-existent' };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([]);

    const result = await getAllMedicalProceduresUseCase.execute(filters);

    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should filter medical procedures by procedureValue less than or equal to', async () => {
    const filterValue = 150;
    const filters: GetAllMedicalProceduresInputDto = { procedureValue: { lte: filterValue } };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure1, procedure3]);

    const result = await getAllMedicalProceduresUseCase.execute(filters);

    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      {
        id: '1',
        doctorId: 'doctor-1',
        patientId: 'patient-1',
        procedureName: 'procedure-name-1',
        procedureDate: procedure1.procedureDate,
        procedureValue: 100,
        paymentStatus: PaymentStatus.PAID,
        denialReason: null,
      },
      {
        id: '3',
        doctorId: 'doctor-1',
        patientId: 'patient-3',
        procedureName: 'procedure-name-3',
        procedureDate: procedure3.procedureDate,
        procedureValue: 150,
        paymentStatus: PaymentStatus.DENIED,
        denialReason: 'denial-reason-3',
      },
    ]);
  });

  it('should filter medical procedures by procedureValue greater than', async () => {
    const filterValue = 120;
    const filters: GetAllMedicalProceduresInputDto = { procedureValue: { gt: filterValue } };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure2, procedure3]);

    const result = await getAllMedicalProceduresUseCase.execute(filters);

    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      {
        id: '2',
        doctorId: 'doctor-2',
        patientId: 'patient-2',
        procedureName: 'procedure-name-2',
        procedureDate: procedure2.procedureDate,
        procedureValue: 200,
        paymentStatus: PaymentStatus.PENDING,
        denialReason: null,
      },
      {
        id: '3',
        doctorId: 'doctor-1',
        patientId: 'patient-3',
        procedureName: 'procedure-name-3',
        procedureDate: procedure3.procedureDate,
        procedureValue: 150,
        paymentStatus: PaymentStatus.DENIED,
        denialReason: 'denial-reason-3',
      },
    ]);
  });

  it('should filter medical procedures by procedureValue equal to', async () => {
    const filterValue = 200;
    const filters: GetAllMedicalProceduresInputDto = { procedureValue: filterValue };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure2]);

    const result = await getAllMedicalProceduresUseCase.execute(filters);

    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(1);
    expect(result).toEqual([
      {
        id: '2',
        doctorId: 'doctor-2',
        patientId: 'patient-2',
        procedureName: 'procedure-name-2',
        procedureDate: procedure2.procedureDate,
        procedureValue: 200,
        paymentStatus: PaymentStatus.PENDING,
        denialReason: null,
      },
    ]);
  });

  it('should filter with combined value and other criteria', async () => {
    const filters: GetAllMedicalProceduresInputDto = { doctorId: 'doctor-1', procedureValue: { gt: 100 } };
    mockMedicalProcedureRepository.findAll.mockResolvedValue([procedure3]);

    const result = await getAllMedicalProceduresUseCase.execute(filters);

    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findAll).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(1);
    expect(result).toEqual([
      {
        id: '3',
        doctorId: 'doctor-1',
        patientId: 'patient-3',
        procedureName: 'procedure-name-3',
        procedureDate: procedure3.procedureDate,
        procedureValue: 150,
        paymentStatus: PaymentStatus.DENIED,
        denialReason: 'denial-reason-3',
      },
    ]);
  });
});
