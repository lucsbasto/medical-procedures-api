import { Doctor } from '@/domain/doctor/entities/doctor.entity';
import { DoctorRepository } from '@/domain/doctor/repositories/doctor.repository';
import { GetDoctorByIdInputDto } from '../../dtos/get-doctor-by-id-input.dto';
import { GetDoctorByIdUseCase } from '../get-doctor-by-id.use-case';

const mockDoctorRepository: jest.Mocked<DoctorRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

describe('GetDoctorByIdUseCase', () => {
  let getDoctorByIdUseCase: GetDoctorByIdUseCase;

  beforeEach(() => {
    getDoctorByIdUseCase = new GetDoctorByIdUseCase(mockDoctorRepository);
    jest.clearAllMocks();
  });

  it('should successfully retrieve a doctor by ID and return the doctor data', async () => {
    const input: GetDoctorByIdInputDto = { id: 'doctor-123' };
    const expectedDoctor = new Doctor(
      'doctor-123',
      'Dr. John Doe',
      'SP123456',
      'Cardiology',
      '1199999999',
      'john.doe@example.com',
    );
    mockDoctorRepository.findById.mockResolvedValue(expectedDoctor);

    const result = await getDoctorByIdUseCase.execute(input);

    expect(mockDoctorRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockDoctorRepository.findById).toHaveBeenCalledWith(input.id);
    expect(result).toEqual({
      id: expectedDoctor.id,
      name: expectedDoctor.name,
      specialty: expectedDoctor.specialty,
      crm: expectedDoctor.crm,
      phone: expectedDoctor.phone,
      email: expectedDoctor.email,
    });
  });

  it('should throw a NotFoundException if the doctor with the given ID does not exist', async () => {
    const input: GetDoctorByIdInputDto = { id: 'non-existent-id' };
    mockDoctorRepository.findById.mockResolvedValue(null);

    const promise = getDoctorByIdUseCase.execute(input);

    expect(mockDoctorRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockDoctorRepository.findById).toHaveBeenCalledWith(input.id);
    expect(promise).rejects.toThrow();
  });

  it('should throw an error if an empty ID is provided', async () => {
    const input: GetDoctorByIdInputDto = { id: '' };

    await expect(getDoctorByIdUseCase.execute(input)).rejects.toThrow('Doctor ID cannot be empty.');
    expect(mockDoctorRepository.findById).not.toHaveBeenCalled();
  });
});
