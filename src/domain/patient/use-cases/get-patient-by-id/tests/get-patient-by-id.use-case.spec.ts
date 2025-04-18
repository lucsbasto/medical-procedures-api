import { Patient } from '@/domain/patient/entities/patient.entity';
import { PatientRepository } from '@/domain/patient/repositories/patient.repository';
import { GetPatientByIdInputDto } from '../../dtos/get-patient-by-id-input.dto';
import { GetPatientByIdUseCase } from '../get-patient-by-id.use-case';

const mockPatientRepository: jest.Mocked<PatientRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findByName: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

describe('GetPatientByIdUseCase', () => {
  let getPatientByIdUseCase: GetPatientByIdUseCase;

  beforeEach(() => {
    getPatientByIdUseCase = new GetPatientByIdUseCase(mockPatientRepository);
    jest.clearAllMocks();
  });

  it('should return a patient when a valid ID is provided and the patient exists', async () => {
    const input: GetPatientByIdInputDto = { id: 'patient-123' };
    const expectedPatient = new Patient('patient-123', 'John Doe', '1234567890', 'john.doe@example.com');
    mockPatientRepository.findById.mockResolvedValue(expectedPatient);

    const result = await getPatientByIdUseCase.execute(input);

    expect(mockPatientRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockPatientRepository.findById).toHaveBeenCalledWith('patient-123');
    expect(result).toEqual({
      id: 'patient-123',
      name: 'John Doe',
      phone: '1234567890',
      email: 'john.doe@example.com',
    });
  });

  it('should return null when a valid ID is provided but the patient does not exist', async () => {
    const input: GetPatientByIdInputDto = { id: 'non-existent-id' };
    mockPatientRepository.findById.mockResolvedValue(null);

    const result = await getPatientByIdUseCase.execute(input);

    expect(mockPatientRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockPatientRepository.findById).toHaveBeenCalledWith('non-existent-id');
    expect(result).toBeNull();
  });

  it('should throw an error if an empty ID is provided', async () => {
    const input: GetPatientByIdInputDto = { id: '' };

    await expect(getPatientByIdUseCase.execute(input)).rejects.toThrow('Patient ID cannot be empty.');
    expect(mockPatientRepository.findById).not.toHaveBeenCalled();
  });

  it('should throw an error if an ID with only whitespace is provided', async () => {
    const input: GetPatientByIdInputDto = { id: '   ' };

    await expect(getPatientByIdUseCase.execute(input)).rejects.toThrow('Patient ID cannot be empty.');
    expect(mockPatientRepository.findById).not.toHaveBeenCalled();
  });
});
