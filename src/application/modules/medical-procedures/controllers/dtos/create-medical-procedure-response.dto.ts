import { PaymentStatus } from '@/domain/medical-procedure/enums/payment-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicalProcedureResponseDto {
  @ApiProperty({ description: 'ID do procedimento médico.' })
  id: string;

  @ApiProperty({ description: 'ID do médico responsável pelo procedimento.' })
  doctorId: string;

  @ApiProperty({ description: 'ID do paciente que realizou o procedimento.' })
  patientId: string;

  @ApiProperty({ description: 'Nome do procedimento médico.' })
  procedureName: string;

  @ApiProperty({ description: 'Data e hora do procedimento.' })
  procedureDate: Date;

  @ApiProperty({ description: 'Valor do procedimento.' })
  procedureValue: number;

  @ApiProperty({ enum: PaymentStatus, description: 'Status do pagamento.' })
  paymentStatus: PaymentStatus;

  @ApiProperty({ nullable: true, description: 'Motivo da recusa do pagamento (opcional).' })
  denialReason: string | null;
}
