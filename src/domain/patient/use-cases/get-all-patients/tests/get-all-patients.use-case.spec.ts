import { Patient } from '@/domain/patient/entities/patient.entity';
import { PatientRepository } from '@/domain/patient/repositories/patient.repository';
import { GetAllPatientsUseCase } from '../get-all-patients.use-case';

const mockPatientRepository: jest.Mocked<PatientRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

describe('GetAllPatientsUseCase', () => {
  let getAllPatientsUseCase: GetAllPatientsUseCase;

  beforeEach(() => {
    getAllPatientsUseCase = new GetAllPatientsUseCase(mockPatientRepository);
    jest.clearAllMocks();
  });

  it('should return an array of all patients when no filters are provided', async () => {
    const patients = [
      new Patient('1', 'John Doe', '123', 'john.doe@example.com'),
      new Patient('2', 'Jane Smith', '456', 'jane.smith@example.com'),
    ];
    mockPatientRepository.findAll.mockResolvedValue(patients);

    const result = await getAllPatientsUseCase.execute();

    expect(mockPatientRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockPatientRepository.findAll).toHaveBeenCalledWith(undefined);
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: '1', name: 'John Doe', phone: '123', email: 'john.doe@example.com' },
      { id: '2', name: 'Jane Smith', phone: '456', email: 'jane.smith@example.com' },
    ]);
  });
});
