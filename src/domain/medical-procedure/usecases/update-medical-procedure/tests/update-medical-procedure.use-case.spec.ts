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
    'Consulta de Rotina',
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
      'Consulta de Rotina',
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
      procedureName: 'Consulta de Rotina',
      procedureDate: new Date('2025-04-11T10:00:00-03:00'),
      procedureValue: 200.0,
      paymentStatus: PaymentStatus.PAID,
    });
  });

  it('should return null if the medical procedure with the given ID does not exist', async () => {
    const input: UpdateMedicalProcedureInputDto = { id: 'non-existent-id', procedureValue: 100 };
    mockMedicalProcedureRepository.findById.mockResolvedValue(null);

    const result = await updateMedicalProcedureUseCase.execute(input);

    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledWith(input.id);
    expect(mockMedicalProcedureRepository.update).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('should throw an error if an empty ID is provided', async () => {
    const input: UpdateMedicalProcedureInputDto = { id: '', procedureValue: 50 };

    await expect(updateMedicalProcedureUseCase.execute(input)).rejects.toThrow(
      'Medical procedure ID cannot be empty for update.',
    );
    expect(mockMedicalProcedureRepository.findById).not.toHaveBeenCalled();
    expect(mockMedicalProcedureRepository.update).not.toHaveBeenCalled();
  });

  it('should update only the provided fields', async () => {
    const input: UpdateMedicalProcedureInputDto = { id: 'procedure-123', paymentStatus: PaymentStatus.PAID };
    mockMedicalProcedureRepository.findById.mockResolvedValue(existingProcedure);
    const updatedProcedure = new MedicalProcedure(
      'procedure-123',
      'doctor-abc',
      'patient-xyz',
      'Consulta de Rotina',
      new Date('2025-04-11T10:00:00-03:00'),
      150.0,
      PaymentStatus.PAID,
    );
    mockMedicalProcedureRepository.update.mockResolvedValue(undefined);
    mockMedicalProcedureRepository.findById.mockResolvedValue(updatedProcedure);

    const result = await updateMedicalProcedureUseCase.execute(input);

    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledTimes(2);
    expect(mockMedicalProcedureRepository.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      id: 'procedure-123',
      doctorId: 'doctor-abc',
      patientId: 'patient-xyz',
      procedureName: 'Consulta de Rotina',
      procedureDate: new Date('2025-04-11T10:00:00-03:00'),
      procedureValue: 150.0,
      paymentStatus: PaymentStatus.PAID,
    });
  });
});
