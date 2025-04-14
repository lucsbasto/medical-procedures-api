import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateMedicalProcedureInputDto {
  @ApiProperty({ required: false, description: 'ID do médico responsável pelo procedimento.' })
  @IsOptional()
  @IsUUID('4', { message: 'O ID do médico deve ser um UUID válido.' })
  doctorId?: string;

  @ApiProperty({ required: false, description: 'ID do paciente que realizou o procedimento.' })
  @IsOptional()
  @IsUUID('4', { message: 'O ID do paciente deve ser um UUID válido.' })
  patientId?: string;

  @ApiProperty({ required: false, description: 'Nome do procedimento médico.' })
  @IsOptional()
  @IsString({ message: 'O nome do procedimento deve ser uma string.' })
  procedureName?: string;

  @ApiProperty({ required: false, description: 'Data e hora do procedimento.' })
  @IsOptional()
  @IsDate({ message: 'A data do procedimento deve ser uma data válida.' })
  @Type(() => Date)
  procedureDate?: Date;

  @ApiProperty({ required: false, description: 'Valor do procedimento.' })
  @IsOptional()
  @IsNumber({}, { message: 'O valor do procedimento deve ser um número.' })
  procedureValue?: number;

  @ApiProperty({ required: false, enum: PaymentStatus, description: 'Status do pagamento.' })
  @IsOptional()
  @IsEnum(PaymentStatus, {
    message: `O status do pagamento deve ser um dos seguintes: ${Object.values(PaymentStatus).join(', ')}`,
  })
  paymentStatus?: PaymentStatus;

  @ApiProperty({ required: false, nullable: true, description: 'Motivo da recusa do pagamento (opcional).' })
  @IsOptional()
  @IsString({ message: 'O motivo da recusa deve ser uma string.' })
  denialReason?: string | null;
}
