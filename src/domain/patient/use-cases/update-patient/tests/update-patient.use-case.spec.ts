import { Patient } from '@/domain/patient/entities/patient.entity';
import { PatientRepository } from '@/domain/patient/repositories/patient.repository';
import { UpdatePatientInputDto } from '../dtos/update-patient-input.dto';
import { UpdatePatientUseCase } from '../update-patient.use-case';

const mockPatientRepository: jest.Mocked<PatientRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

describe('UpdatePatientUseCase', () => {
  let updatePatientUseCase: UpdatePatientUseCase;

  beforeEach(() => {
    updatePatientUseCase = new UpdatePatientUseCase(mockPatientRepository);
    jest.clearAllMocks();
  });

  it('should successfully update a patient when a valid ID and data are provided', async () => {
    const input: UpdatePatientInputDto = {
      id: 'patient-123',
      name: 'Updated Name',
      phone: '9876543210',
    };
    const existingPatient = new Patient('patient-123', 'Original Name', '1234567890', 'original@example.com');
    const updatedPatient = new Patient('patient-123', 'Updated Name', '9876543210', 'original@example.com');
    mockPatientRepository.findById.mockResolvedValue(existingPatient);
    mockPatientRepository.update.mockResolvedValue(undefined);
    mockPatientRepository.findById.mockResolvedValueOnce(existingPatient);
    mockPatientRepository.findById.mockResolvedValueOnce(updatedPatient);

    const result = await updatePatientUseCase.execute(input);

    expect(mockPatientRepository.findById).toHaveBeenCalledTimes(2);
    expect(mockPatientRepository.findById).toHaveBeenCalledWith('patient-123');
    expect(mockPatientRepository.update).toHaveBeenCalledTimes(1);
    expect(mockPatientRepository.update).toHaveBeenCalledWith(updatedPatient);
    expect(result).toEqual({
      id: 'patient-123',
      name: 'Updated Name',
      phone: '9876543210',
      email: 'original@example.com',
    });
  });

  it('should return null if the patient ID does not exist', async () => {
    const input: UpdatePatientInputDto = { id: 'non-existent-id', name: 'Updated Name' };
    mockPatientRepository.findById.mockResolvedValue(null);

    const result = await updatePatientUseCase.execute(input);

    expect(mockPatientRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockPatientRepository.findById).toHaveBeenCalledWith('non-existent-id');
    expect(mockPatientRepository.update).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('should throw an error if an empty ID is provided', async () => {
    const input: UpdatePatientInputDto = { id: '', name: 'Updated Name' };

    await expect(updatePatientUseCase.execute(input)).rejects.toThrow('Patient ID cannot be empty for update.');
    expect(mockPatientRepository.findById).not.toHaveBeenCalled();
    expect(mockPatientRepository.update).not.toHaveBeenCalled();
  });

  it('should successfully update a patient with only one field', async () => {
    const input: UpdatePatientInputDto = { id: 'patient-456', email: 'updated@example.com' };
    const existingPatient = new Patient('patient-456', 'Another Patient', '1122334455', 'another@example.com');
    const updatedPatient = new Patient('patient-456', 'Another Patient', '1122334455', 'updated@example.com');
    mockPatientRepository.findById.mockResolvedValueOnce(existingPatient);
    mockPatientRepository.update.mockResolvedValue(undefined);
    mockPatientRepository.findById.mockResolvedValueOnce(updatedPatient);

    const result = await updatePatientUseCase.execute(input);

    expect(mockPatientRepository.findById).toHaveBeenCalledTimes(2);
    expect(mockPatientRepository.findById).toHaveBeenCalledWith('patient-456');
    expect(mockPatientRepository.update).toHaveBeenCalledTimes(1);
    expect(mockPatientRepository.update).toHaveBeenCalledWith(updatedPatient);
    expect(result).toEqual({
      id: 'patient-456',
      name: 'Another Patient',
      phone: '1122334455',
      email: 'updated@example.com',
    });
  });
});
