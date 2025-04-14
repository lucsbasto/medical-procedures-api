import { MedicalProcedure } from '@/domain/medical-procedure/entities/medical-procedure.entity';
import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';
import { MedicalProcedureRepository } from '@/domain/medical-procedure/repositories/medical-procedure.repository';
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
    const id = 'procedure-123';
    const expectedMedicalProcedure = new MedicalProcedure(
      'procedure-123',
      'doctor-abc',
      'patient-xyz',
      'procedure-name-1',
      new Date(),
      150.0,
      PaymentStatus.PAID,
    );
    mockMedicalProcedureRepository.findById.mockResolvedValue(expectedMedicalProcedure);

    const result = await getMedicalProcedureByIdUseCase.execute(id);

    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual({
      id: expectedMedicalProcedure.id,
      doctorId: expectedMedicalProcedure.doctorId,
      patientId: expectedMedicalProcedure.patientId,
      procedureName: expectedMedicalProcedure.procedureName,
      procedureDate: expectedMedicalProcedure.procedureDate,
      procedureValue: expectedMedicalProcedure.procedureValue,
      paymentStatus: expectedMedicalProcedure.paymentStatus,
      denialReason: null,
    });
  });

  it('should return null if the medical procedure with the given ID does not exist', async () => {
    const id = 'non-existent-id';
    mockMedicalProcedureRepository.findById.mockResolvedValue(null);

    const result = await getMedicalProcedureByIdUseCase.execute(id);

    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.findById).toHaveBeenCalledWith(id);
    expect(result).toBeNull();
  });

  it('should throw an error if an empty ID is provided', async () => {
    const id = '';

    await expect(getMedicalProcedureByIdUseCase.execute(id)).rejects.toThrow('Medical procedure ID cannot be empty.');
    expect(mockMedicalProcedureRepository.findById).not.toHaveBeenCalled();
  });
});
