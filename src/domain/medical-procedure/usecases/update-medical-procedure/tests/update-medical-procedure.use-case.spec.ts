import { MedicalProcedure } from '@/domain/medical-procedure/entities/medical-procedure.entity';
import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';
import { MedicalProcedureRepository } from '@/domain/medical-procedure/repositories/medical-procedure.repository';
import { UpdateMedicalProcedureInputDto } from '../../dtos/update-medical-procedure-input.dto';
import { UpdateMedicalProcedureUseCase } from '../update-medical-procedure.use-case';

const mockMedicalProcedureRepository: jest.Mocked<MedicalProcedureRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

describe('UpdateMedicalProcedureUseCase', () => {
  let updateMedicalProcedureUseCase: UpdateMedicalProcedureUseCase;

  beforeEach(() => {
    updateMedicalProcedureUseCase = new UpdateMedicalProcedureUseCase(mockMedicalProcedureRepository);
    jest.clearAllMocks();
  });

  const existingProcedure = new MedicalProcedure(
    'procedure-123',
    'doctor-abc',
    'patient-xyz',
    new Date('2025-04-11T10:00:00-03:00'),
    150.0,
    PaymentStatus.PENDING,
  );

  it('should successfully update a medical procedure and return the updated data', async () => {
    const input: UpdateMedicalProcedureInputDto = {
      id: 'procedure-123',
      procedureValue: 200.0,
      paymentStatus: PaymentStatus.PAID,
    };
    mockMedicalProcedureRepository.findById.mockResolvedValue(existingProcedure);
    const updatedProcedure = new MedicalProcedure(
      'procedure-123',
      'doctor-abc',
      'patient-xyz',
      new Date('2025-04-11T10:00:00-03:00'),
      200.0,
      PaymentStatus.PAID,
    );
    mockMedicalProcedureRepository.update.mockResolvedValue(undefined);
    mockMedicalProcedureRepository.findById.mockResolvedValue(updatedProcedure);

    const result = await updateMedicalProcedureUseCase.execute(input);

    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledTimes(2);
    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledWith(input.id);
    expect(mockMedicalProcedureRepository.update).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.update).toHaveBeenCalledWith(updatedProcedure);
    expect(result).toEqual({
      id: 'procedure-123',
      doctorId: 'doctor-abc',
      patientId: 'patient-xyz',
      procedureDate: new Date('2025-04-11T10:00:00-03:00'),
      procedureValue: 200.0,
      paymentStatus: PaymentStatus.PAID,
    });
  });
});
