import { Patient } from '@/domain/patient/entities/patient.entity';
import { PatientRepository } from '@/domain/patient/repositories/patient.repository';
import { RegisterPatientInputDto } from '../dtos/register-patient-input.dto';
import { RegisterPatientUseCase } from '../register-patient.use-case';

const mockPatientRepository: jest.Mocked<PatientRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findByName: jest.fn(),
} as any;

describe('RegisterPatientUseCase', () => {
  let registerPatientUseCase: RegisterPatientUseCase;

  beforeEach(() => {
    registerPatientUseCase = new RegisterPatientUseCase(mockPatientRepository);

    jest.clearAllMocks();
  });

  it('should successfully register a patient and return the patient data with an ID', async () => {
    const input: RegisterPatientInputDto = {
      name: 'John Doe',
      phone: '1234567890',
      email: 'john.doe@example.com',
    };
    const generatedId = 'patient-123';
    const expectedPatient = new Patient(generatedId, input.name, input.phone, input.email);
    mockPatientRepository.create.mockResolvedValue(expectedPatient);

    const result = await registerPatientUseCase.execute(input);

    expect(mockPatientRepository.create).toHaveBeenCalledTimes(1);
    expect(mockPatientRepository.create).toHaveBeenCalledWith(expect.any(Patient));

    expect(result).toEqual({
      id: generatedId,
      name: input.name,
      phone: input.phone,
      email: input.email,
    });
  });

  it('should throw an error if the patient name is empty', async () => {
    const input: RegisterPatientInputDto = {
      name: '',
      phone: '9876543210',
      email: 'jane.doe@example.com',
    };

    await expect(registerPatientUseCase.execute(input)).rejects.toThrow('Patient name cannot be empty.');
    expect(mockPatientRepository.create).not.toHaveBeenCalled();
  });

  it('should throw an error if the patient phone number is empty', async () => {
    const input: RegisterPatientInputDto = {
      name: 'Wendy Darling',
      phone: '',
      email: 'wendy@neverland.com',
    };

    await expect(registerPatientUseCase.execute(input)).rejects.toThrow('Patient phone number is required.');
    expect(mockPatientRepository.create).not.toHaveBeenCalled();
  });
});
