import { MedicalProcedure } from '@/domain/medical-procedure/entities/medical-procedure.entity';
import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';
import { MedicalProcedureRepository } from '@/domain/medical-procedure/repositories/medical-procedure.repository';
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
    new Date('2025-04-11T10:00:00-03:00'),
    100,
    PaymentStatus.PAID,
  );
  const procedure2 = new MedicalProcedure(
    '2',
    'doctor-2',
    'patient-2',
    new Date('2025-04-11T11:00:00-03:00'),
    200,
    PaymentStatus.PENDING,
  );
  const procedure3 = new MedicalProcedure(
    '3',
    'doctor-1',
    'patient-3',
    new Date('2025-04-10T15:00:00-03:00'),
    150,
    PaymentStatus.GLOSSED,
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
        procedureDate: procedure1.procedureDate,
        procedureValue: 100,
        paymentStatus: PaymentStatus.PAID,
      },
      {
        id: '2',
        doctorId: 'doctor-2',
        patientId: 'patient-2',
        procedureDate: procedure2.procedureDate,
        procedureValue: 200,
        paymentStatus: PaymentStatus.PENDING,
      },
      {
        id: '3',
        doctorId: 'doctor-1',
        patientId: 'patient-3',
        procedureDate: procedure3.procedureDate,
        procedureValue: 150,
        paymentStatus: PaymentStatus.GLOSSED,
      },
    ]);
  });
});
