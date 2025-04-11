import { Patient } from '@/domain/patient/entities/patient.entity';
import { PatientRepository } from '@/domain/patient/repositories/patient.repository';
import { GetAllPatientsInputDto } from '../dtos/get-all-patients-input.dto';
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

  it('should return an empty array if there are no patients', async () => {
    mockPatientRepository.findAll.mockResolvedValue([]);

    const result = await getAllPatientsUseCase.execute();

    expect(mockPatientRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockPatientRepository.findAll).toHaveBeenCalledWith(undefined);
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should filter patients by name', async () => {
    const filters: GetAllPatientsInputDto = { name: 'john' };
    const patients = [
      new Patient('1', 'John Doe', '123', 'john.doe@example.com'),
      new Patient('2', 'Jane Smith', '456', 'jane.smith@example.com'),
      new Patient('3', 'Johnny Bravo', '789', 'johnny.bravo@example.com'),
    ];
    mockPatientRepository.findAll.mockResolvedValue(
      patients.filter((p) => p.name.toLowerCase().includes(filters.name.toLowerCase())),
    );

    const result = await getAllPatientsUseCase.execute(filters);

    expect(mockPatientRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockPatientRepository.findAll).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: '1', name: 'John Doe', phone: '123', email: 'john.doe@example.com' },
      { id: '3', name: 'Johnny Bravo', phone: '789', email: 'johnny.bravo@example.com' },
    ]);
  });

  it('should filter patients by phone', async () => {
    const filters: GetAllPatientsInputDto = { phone: '456' };
    const patients = [
      new Patient('1', 'John Doe', '123', 'john.doe@example.com'),
      new Patient('2', 'Jane Smith', '456', 'jane.smith@example.com'),
    ];
    mockPatientRepository.findAll.mockResolvedValue(patients.filter((p) => p.phone.includes(filters.phone)));

    const result = await getAllPatientsUseCase.execute(filters);

    expect(mockPatientRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockPatientRepository.findAll).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(1);
    expect(result).toEqual([{ id: '2', name: 'Jane Smith', phone: '456', email: 'jane.smith@example.com' }]);
  });

  it('should handle multiple filters', async () => {
    const filters: GetAllPatientsInputDto = { name: 'john', phone: '123' };
    const patients = [
      new Patient('1', 'John Doe', '123', 'john.doe@example.com'),
      new Patient('2', 'Johnny Bravo', '789', 'johnny.bravo@example.com'),
    ];
    mockPatientRepository.findAll.mockResolvedValue(
      patients.filter(
        (p) => p.name.toLowerCase().includes(filters.name.toLowerCase()) && p.phone.includes(filters.phone),
      ),
    );

    const result = await getAllPatientsUseCase.execute(filters);

    expect(mockPatientRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockPatientRepository.findAll).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(1);
    expect(result).toEqual([{ id: '1', name: 'John Doe', phone: '123', email: 'john.doe@example.com' }]);
  });

  it('should return all patients if filters are empty', async () => {
    const filters: GetAllPatientsInputDto = {};
    const patients = [
      new Patient('1', 'John Doe', '123', 'john.doe@example.com'),
      new Patient('2', 'Jane Smith', '456', 'jane.smith@example.com'),
    ];
    mockPatientRepository.findAll.mockResolvedValue(patients);

    const result = await getAllPatientsUseCase.execute(filters);

    expect(mockPatientRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockPatientRepository.findAll).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: '1', name: 'John Doe', phone: '123', email: 'john.doe@example.com' },
      { id: '2', name: 'Jane Smith', phone: '456', email: 'jane.smith@example.com' },
    ]);
  });
});
