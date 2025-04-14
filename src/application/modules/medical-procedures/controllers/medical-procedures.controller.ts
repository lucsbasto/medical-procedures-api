import { DeleteMedicalProcedureUseCase } from '@/domain/medical-procedure/usecases/delete-medical-procedure/delete-medical-procedure.use-case';
import { GetAllMedicalProceduresUseCase } from '@/domain/medical-procedure/usecases/get-all-medical-procedures/get-all-medical-procedures.use-case';
import { GetMedicalProcedureByIdUseCase } from '@/domain/medical-procedure/usecases/get-medical-procedure-by-id/get-medical-procedure-by-id.use-case';
import { RegisterMedicalProcedureUseCase } from '@/domain/medical-procedure/usecases/register-medical-procedure/register-medical-procedure.use-case';
import { UpdateMedicalProcedureUseCase } from '@/domain/medical-procedure/usecases/update-medical-procedure/update-medical-procedure.use-case';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateMedicalProcedureInputDto,
  CreateMedicalProcedureResponseDto,
  GetAllMedicalProceduresResponseDto,
  GetMedicalProcedureByIdResponseDto,
  UpdateMedicalProcedureInputDto,
  UpdateMedicalProcedureResponseDto,
} from './dtos';

@ApiTags('Medical Procedures')
@Controller('medical-procedures')
export class MedicalProceduresController {
  constructor(
    private readonly registerMedicalProcedureUseCase: RegisterMedicalProcedureUseCase,
    private readonly getMedicalProcedureByIdUseCase: GetMedicalProcedureByIdUseCase,
    private readonly getAllMedicalProceduresUseCase: GetAllMedicalProceduresUseCase,
    private readonly updateMedicalProcedureUseCase: UpdateMedicalProcedureUseCase,
    private readonly deleteMedicalProcedureUseCase: DeleteMedicalProcedureUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: CreateMedicalProcedureResponseDto,
    description: 'Medical procedure registered successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async register(
    @Body() createMedicalProcedureInputDto: CreateMedicalProcedureInputDto,
  ): Promise<CreateMedicalProcedureResponseDto> {
    return this.registerMedicalProcedureUseCase.execute(createMedicalProcedureInputDto);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: GetMedicalProcedureByIdResponseDto, description: 'Medical procedure found.' })
  @ApiNotFoundResponse({ description: 'Medical procedure not found.' })
  @ApiBadRequestResponse({ description: 'Invalid ID format.' })
  async findById(@Param('id') id: string): Promise<GetMedicalProcedureByIdResponseDto> {
    const medicalProcedure = await this.getMedicalProcedureByIdUseCase.execute(id);
    if (!medicalProcedure) {
      throw new NotFoundException('Medical procedure not found');
    }
    return medicalProcedure;
  }

  @Get()
  @ApiOkResponse({ type: [GetAllMedicalProceduresResponseDto], description: 'List of all medical procedures.' })
  async findAll(): Promise<GetAllMedicalProceduresResponseDto> {
    return this.getAllMedicalProceduresUseCase.execute();
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: UpdateMedicalProcedureResponseDto, description: 'Medical procedure updated successfully.' })
  @ApiNotFoundResponse({ description: 'Medical procedure not found.' })
  @ApiBadRequestResponse({ description: 'Invalid input data or ID format.' })
  async update(
    @Param('id') id: string,
    @Body() updateMedicalProcedureInputDto: UpdateMedicalProcedureInputDto,
  ): Promise<UpdateMedicalProcedureResponseDto> {
    const medicalProcedure = await this.updateMedicalProcedureUseCase.execute({
      id,
      ...updateMedicalProcedureInputDto,
    });
    if (!medicalProcedure) {
      throw new NotFoundException('Medical procedure not found');
    }
    return medicalProcedure;
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({ description: 'Medical procedure deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Medical procedure not found.' })
  @ApiBadRequestResponse({ description: 'Invalid ID format.' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteMedicalProcedureUseCase.execute({ id });
  }
}
