import { MedicalProcedure } from '@/domain/medical-procedure/entities/medical-procedure.entity';
import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';
import { MedicalProcedureRepository } from '@/domain/medical-procedure/repositories/medical-procedure.repository';
import { RegisterMedicalProcedureInputDto } from '../../dtos/register-medical-procedure-input.dto';
import { RegisterMedicalProcedureUseCase } from '../register-medical-procedure.use-case';

const mockMedicalProcedureRepository: jest.Mocked<MedicalProcedureRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

const validInput = (): RegisterMedicalProcedureInputDto => ({
  doctorId: 'doctor-valid',
  patientId: 'patient-valid',
  procedureName: 'Procedure Name',
  procedureDate: new Date(),
  procedureValue: 50.0,
  paymentStatus: PaymentStatus.PAID,
});

describe('RegisterMedicalProcedureUseCase', () => {
  let registerMedicalProcedureUseCase: RegisterMedicalProcedureUseCase;

  beforeEach(() => {
    registerMedicalProcedureUseCase = new RegisterMedicalProcedureUseCase(mockMedicalProcedureRepository);
    jest.clearAllMocks();
  });

  it('should successfully register a medical procedure and return the procedure data with an ID', async () => {
    const input = validInput();
    const generatedId = 'procedure-789';
    const expectedMedicalProcedure = new MedicalProcedure(
      generatedId,
      input.doctorId,
      input.patientId,
      input.procedureName,
      input.procedureDate,
      input.procedureValue,
      input.paymentStatus,
    );
    mockMedicalProcedureRepository.create.mockResolvedValue(expectedMedicalProcedure);

    const result = await registerMedicalProcedureUseCase.execute(input);

    expect(mockMedicalProcedureRepository.create).toHaveBeenCalledTimes(1);
    expect(mockMedicalProcedureRepository.create).toHaveBeenCalledWith(expect.any(MedicalProcedure));
    expect(result).toEqual({
      id: generatedId,
      doctorId: input.doctorId,
      patientId: input.patientId,
      procedureName: input.procedureName,
      procedureDate: input.procedureDate,
      procedureValue: input.procedureValue,
      paymentStatus: input.paymentStatus,
    });
  });

  it('should throw an error if doctorId is empty', async () => {
    const input: RegisterMedicalProcedureInputDto = { ...validInput(), doctorId: '' };
    await expect(registerMedicalProcedureUseCase.execute(input)).rejects.toThrow('Doctor ID cannot be empty.');
    expect(mockMedicalProcedureRepository.create).not.toHaveBeenCalled();
  });

  it('should throw an error if patientId is empty', async () => {
    const input: RegisterMedicalProcedureInputDto = { ...validInput(), patientId: '' };
    await expect(registerMedicalProcedureUseCase.execute(input)).rejects.toThrow('Patient ID cannot be empty.');
    expect(mockMedicalProcedureRepository.create).not.toHaveBeenCalled();
  });

  it('should throw an error if procedureDate is empty', async () => {
    const input: RegisterMedicalProcedureInputDto = { ...validInput(), procedureDate: undefined as any };
    await expect(registerMedicalProcedureUseCase.execute(input)).rejects.toThrow('Procedure date cannot be empty.');
    expect(mockMedicalProcedureRepository.create).not.toHaveBeenCalled();
  });

  it('should throw an error if procedureValue is not a positive number', async () => {
    const input1: RegisterMedicalProcedureInputDto = { ...validInput(), procedureValue: 0 };
    await expect(registerMedicalProcedureUseCase.execute(input1)).rejects.toThrow(
      'Procedure value must be a positive number.',
    );
    const input2: RegisterMedicalProcedureInputDto = { ...validInput(), procedureValue: -50 };
    await expect(registerMedicalProcedureUseCase.execute(input2)).rejects.toThrow(
      'Procedure value must be a positive number.',
    );
    expect(mockMedicalProcedureRepository.create).not.toHaveBeenCalledTimes(2);
  });

  it('should throw an error if paymentStatus is empty', async () => {
    const input: RegisterMedicalProcedureInputDto = { ...validInput(), paymentStatus: undefined as any };
    await expect(registerMedicalProcedureUseCase.execute(input)).rejects.toThrow('Payment status cannot be empty.');
    expect(mockMedicalProcedureRepository.create).not.toHaveBeenCalled();
  });
});
