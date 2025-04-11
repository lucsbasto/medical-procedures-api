import { MedicalProcedure } from '@/domain/medical-procedure/entities/medical-procedure.entity';
import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';
import { MedicalProcedureRepository } from '@/domain/medical-procedure/repositories/medical-procedure.repository';
import { DeleteMedicalProcedureInputDto } from '../../dtos/delete-medical-procedure-input.dto';
import { DeleteMedicalProcedureUseCase } from '../delete-medical-procedure.use-case';

const mockMedicalProcedureRepository: jest.Mocked<MedicalProcedureRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

describe('DeleteMedicalProcedureUseCase', () => {
  let deleteMedicalProcedureUseCase: DeleteMedicalProcedureUseCase;

  beforeEach(() => {
    deleteMedicalProcedureUseCase = new DeleteMedicalProcedureUseCase(mockMedicalProcedureRepository);
    jest.clearAllMocks();
  });

  it('should successfully delete a medical procedure by ID', async () => {
    const input: DeleteMedicalProcedureInputDto = { id: 'procedure-123' };
    const mockExistingProcedure: MedicalProcedure = new MedicalProcedure(
      'procedure-123',
      'doctor-abc',
      'patient-xyz',
      'Consulta de Rotina',
      new Date(),
      100,
      PaymentStatus.PENDING,
    );
    mockMedicalProcedureRepository.findById.mockResolvedValue(mockExistingProcedure);
    mockMedicalProcedureRepository.delete.mockResolvedValue(undefined);

    await deleteMedicalProcedureUseCase.execute(input);

    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledWith(input.id);
    expect(mockMedicalProcedureRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.delete).toHaveBeenCalledWith(input.id);
  });

  it('should not call delete if the medical procedure with the given ID does not exist (implementation choice)', async () => {
    const input: DeleteMedicalProcedureInputDto = { id: 'non-existent-id' };
    mockMedicalProcedureRepository.findById.mockResolvedValue(null);

    await deleteMedicalProcedureUseCase.execute(input);

    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledWith(input.id);
    expect(mockMedicalProcedureRepository.delete).not.toHaveBeenCalled();
  });

  it('should throw an error if an empty ID is provided', async () => {
    const input: DeleteMedicalProcedureInputDto = { id: '' };

    await expect(deleteMedicalProcedureUseCase.execute(input)).rejects.toThrow(
      'Medical procedure ID cannot be empty for deletion.',
    );
    expect(mockMedicalProcedureRepository.findById).not.toHaveBeenCalled();
    expect(mockMedicalProcedureRepository.delete).not.toHaveBeenCalled();
  });
});
