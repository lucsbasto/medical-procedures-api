import { Doctor } from '@/domain/doctor/entities/doctor.entity';
import { DoctorRepository } from '@/domain/doctor/repositories/doctor.repository';
import { GetAllDoctorsUseCase } from '../get-all-doctors.use-case';

const mockDoctorRepository: jest.Mocked<DoctorRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findByName: jest.fn(),
  findByCRM: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

describe('GetAllDoctorsUseCase', () => {
  let getAllDoctorsUseCase: GetAllDoctorsUseCase;

  beforeEach(() => {
    getAllDoctorsUseCase = new GetAllDoctorsUseCase(mockDoctorRepository);
    jest.clearAllMocks();
  });

  it('should return an array of all doctors when no filters are provided', async () => {
    const doctors = [
      new Doctor('1', 'Dr. John Doe', 'SP123456', 'Cardiology', '1199999999', 'john.doe@example.com'),
      new Doctor('2', 'Dr. Jane Smith', 'RJ987654', 'Dermatology', '2188888888', 'jane.smith@example.com'),
    ];
    mockDoctorRepository.findAll.mockResolvedValue(doctors);

    const result = await getAllDoctorsUseCase.execute();

    expect(mockDoctorRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockDoctorRepository.findAll).toHaveBeenCalledWith(undefined);
    expect(result).toEqual([
      {
        id: '1',
        name: 'Dr. John Doe',
        specialty: 'CARDIOLOGY',
        crm: 'SP123456',
        phone: '1199999999',
        email: 'john.doe@example.com',
      },
      {
        id: '2',
        name: 'Dr. Jane Smith',
        specialty: 'DERMATOLOGY',
        crm: 'RJ987654',
        phone: '2188888888',
        email: 'jane.smith@example.com',
      },
    ]);
  });

  it('should return an empty array if there are no doctors', async () => {
    mockDoctorRepository.findAll.mockResolvedValue([]);

    const result = await getAllDoctorsUseCase.execute();

    expect(mockDoctorRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockDoctorRepository.findAll).toHaveBeenCalledWith(undefined);
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
});
