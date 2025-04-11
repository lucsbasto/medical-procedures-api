import { Doctor } from '@/domain/doctor/entities/doctor.entity';
import { DoctorRepository } from '@/domain/doctor/repositories/doctor.repository';
import { RegisterDoctorInputDto } from '../../dtos/register-doctor-input.dto';
import { RegisterDoctorUseCase } from '../register-doctor.use-case';

const mockDoctorRepository: jest.Mocked<DoctorRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

describe('RegisterDoctorUseCase', () => {
  let registerDoctorUseCase: RegisterDoctorUseCase;

  beforeEach(() => {
    registerDoctorUseCase = new RegisterDoctorUseCase(mockDoctorRepository);
    jest.clearAllMocks();
  });

  it('should successfully register a doctor and return the doctor data with an ID', async () => {
    const input: RegisterDoctorInputDto = {
      name: 'Dr. John Doe',
      specialty: 'Cardiology',
      crm: 'SP123456',
      phone: '1199999999',
      email: 'john.doe@example.com',
    };
    const generatedId = 'doctor-123';
    const expectedDoctor = new Doctor(generatedId, input.name, input.crm, input.specialty, input.phone, input.email);
    mockDoctorRepository.create.mockResolvedValue(expectedDoctor);

    const result = await registerDoctorUseCase.execute(input);

    expect(mockDoctorRepository.create).toHaveBeenCalledTimes(1);
    expect(mockDoctorRepository.create).toHaveBeenCalledWith(expect.any(Doctor));
    expect(result).toEqual({
      id: generatedId,
      name: input.name,
      specialty: input.specialty.toUpperCase().trim(),
      crm: input.crm.toUpperCase(),
      phone: input.phone,
      email: input.email,
    });
  });
});
