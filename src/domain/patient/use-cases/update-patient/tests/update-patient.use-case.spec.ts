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
});
