import { MedicalProcedure } from '@/domain/medical-procedure/entities/medical-procedure.entity';
import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';
import { MedicalProcedureRepository } from '@/domain/medical-procedure/repositories/medical-procedure.repository';
import { GetMedicalProcedureByIdInputDto } from '../../dtos/get-medical-procedure-by-id-input.dto';
import { GetMedicalProcedureByIdUseCase } from '../get-medical-procedure-by-id.use-case';

const mockMedicalProcedureRepository: jest.Mocked<MedicalProcedureRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

describe('GetMedicalProcedureByIdUseCase', () => {
  let getMedicalProcedureByIdUseCase: GetMedicalProcedureByIdUseCase;

  beforeEach(() => {
    getMedicalProcedureByIdUseCase = new GetMedicalProcedureByIdUseCase(mockMedicalProcedureRepository);
    jest.clearAllMocks();
  });

  it('should successfully retrieve a medical procedure by ID and return the procedure data', async () => {
    const input: GetMedicalProcedureByIdInputDto = { id: 'procedure-123' };
    const expectedMedicalProcedure = new MedicalProcedure(
      'procedure-123',
      'doctor-abc',
      'patient-xyz',
      new Date(),
      150.0,
      PaymentStatus.PAID,
    );
    mockMedicalProcedureRepository.findById.mockResolvedValue(expectedMedicalProcedure);

    const result = await getMedicalProcedureByIdUseCase.execute(input);

    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledWith(input.id);
    expect(result).toEqual({
      id: expectedMedicalProcedure.id,
      doctorId: expectedMedicalProcedure.doctorId,
      patientId: expectedMedicalProcedure.patientId,
      procedureDate: expectedMedicalProcedure.procedureDate,
      procedureValue: expectedMedicalProcedure.procedureValue,
      paymentStatus: expectedMedicalProcedure.paymentStatus,
    });
  });

  it('should return null if the medical procedure with the given ID does not exist', async () => {
    const input: GetMedicalProcedureByIdInputDto = { id: 'non-existent-id' };
    mockMedicalProcedureRepository.findById.mockResolvedValue(null);

    const result = await getMedicalProcedureByIdUseCase.execute(input);

    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledWith(input.id);
    expect(result).toBeNull();
  });
});
