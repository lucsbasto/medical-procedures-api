import { PatientRepository } from '@/domain/patient/repositories/patient.repository';
import { DeletePatientUseCase } from '../delete-patient.use-case';
import { DeletePatientInputDto } from '../dtos/delete-patient-input.dto';

const mockPatientRepository: jest.Mocked<PatientRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

describe('DeletePatientUseCase', () => {
  let deletePatientUseCase: DeletePatientUseCase;

  beforeEach(() => {
    deletePatientUseCase = new DeletePatientUseCase(mockPatientRepository);
    jest.clearAllMocks();
  });

  it('should successfully delete a patient when a valid ID is provided and the patient exists', async () => {
    const input: DeletePatientInputDto = { id: 'patient-123' };
    mockPatientRepository.findById.mockResolvedValue(true as any);
    mockPatientRepository.delete.mockResolvedValue(undefined);

    await deletePatientUseCase.execute(input);

    expect(mockPatientRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockPatientRepository.findById).toHaveBeenCalledWith('patient-123');
    expect(mockPatientRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockPatientRepository.delete).toHaveBeenCalledWith('patient-123');
  });

  it('should not call delete if the patient ID does not exist', async () => {
    const input: DeletePatientInputDto = { id: 'non-existent-id' };
    mockPatientRepository.findById.mockResolvedValue(null);

    await deletePatientUseCase.execute(input);

    expect(mockPatientRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockPatientRepository.findById).toHaveBeenCalledWith('non-existent-id');
    expect(mockPatientRepository.delete).not.toHaveBeenCalled();
  });

  it('should throw an error if an empty ID is provided', async () => {
    const input: DeletePatientInputDto = { id: '' };

    await expect(deletePatientUseCase.execute(input)).rejects.toThrow('Patient ID cannot be empty for deletion.');
    expect(mockPatientRepository.findById).not.toHaveBeenCalled();
    expect(mockPatientRepository.delete).not.toHaveBeenCalled();
  });
});
