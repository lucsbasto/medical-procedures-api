import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMedicalProcedureInputDto {
  @ApiProperty({ description: 'ID do médico responsável pelo procedimento.' })
  @IsNotEmpty({ message: 'O ID do médico é obrigatório.' })
  @IsUUID('4', { message: 'O ID do médico deve ser um UUID válido.' })
  doctorId: string;

  @ApiProperty({ description: 'ID do paciente que realizou o procedimento.' })
  @IsNotEmpty({ message: 'O ID do paciente é obrigatório.' })
  @IsUUID('4', { message: 'O ID do paciente deve ser um UUID válido.' })
  patientId: string;

  @ApiProperty({ description: 'Nome do procedimento médico.' })
  @IsNotEmpty({ message: 'O nome do procedimento é obrigatório.' })
  @IsString({ message: 'O nome do procedimento deve ser uma string.' })
  procedureName: string;

  @ApiProperty({ description: 'Data e hora do procedimento.' })
  @IsNotEmpty({ message: 'A data do procedimento é obrigatória.' })
  @IsDate({ message: 'A data do procedimento deve ser uma data válida.' })
  @Type(() => Date)
  procedureDate: Date;

  @ApiProperty({ description: 'Valor do procedimento.' })
  @IsNotEmpty({ message: 'O valor do procedimento é obrigatório.' })
  @IsNumber({}, { message: 'O valor do procedimento deve ser um número.' })
  procedureValue: number;

  @ApiProperty({ enum: PaymentStatus, description: 'Status do pagamento.' })
  @IsNotEmpty({ message: 'O status do pagamento é obrigatório.' })
  @IsEnum(PaymentStatus, {
    message: `O status do pagamento deve ser um dos seguintes: ${Object.values(PaymentStatus).join(', ')}`,
  })
  paymentStatus: PaymentStatus;

  @ApiProperty({ required: false, description: 'Motivo da recusa do pagamento (opcional).' })
  @IsOptional()
  @IsString({ message: 'O motivo da recusa deve ser uma string.' })
  denialReason?: string | null;
}
