import { ILoggerService } from '@/domain/interfaces/common/logger';
import { DeleteMedicalProcedureUseCaseInterface } from '@/domain/medical-procedure/usecases/delete-medical-procedure/delete-medical-procedure.use-case.interface';
import { GetAllMedicalProceduresUseCaseInterface } from '@/domain/medical-procedure/usecases/get-all-medical-procedures/get-all-medical-procedures.use-case.interface';
import { GetMedicalProcedureByIdUseCaseInterface } from '@/domain/medical-procedure/usecases/get-medical-procedure-by-id/get-medical-procedure-by-id.use-case.interface';
import { RegisterMedicalProcedureUseCaseInterface } from '@/domain/medical-procedure/usecases/register-medical-procedure/register-medical-procedure.use-case.interface';
import { UpdateMedicalProcedureUseCaseInterface } from '@/domain/medical-procedure/usecases/update-medical-procedure/update-medical-procedure.use-case.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  CreateMedicalProcedureInputDto,
  CreateMedicalProcedureResponseDto,
  GetAllMedicalProceduresResponseDto,
  GetMedicalProcedureByIdResponseDto,
  UpdateMedicalProcedureInputDto,
  UpdateMedicalProcedureResponseDto,
} from './dtos';

@ApiTags('Medical Procedures')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical-procedures')
export class MedicalProceduresController {
  constructor(
    @Inject('ILoggerService')
    private readonly loggerService: ILoggerService,
    @Inject('RegisterMedicalProcedureUseCaseInterface')
    private readonly registerMedicalProcedureUseCase: RegisterMedicalProcedureUseCaseInterface,
    @Inject('GetMedicalProcedureByIdUseCaseInterface')
    private readonly getMedicalProcedureByIdUseCase: GetMedicalProcedureByIdUseCaseInterface,
    @Inject('GetAllMedicalProceduresUseCaseInterface')
    private readonly getAllMedicalProceduresUseCase: GetAllMedicalProceduresUseCaseInterface,
    @Inject('UpdateMedicalProcedureUseCaseInterface')
    private readonly updateMedicalProcedureUseCase: UpdateMedicalProcedureUseCaseInterface,
    @Inject('DeleteMedicalProcedureUseCaseInterface')
    private readonly deleteMedicalProcedureUseCase: DeleteMedicalProcedureUseCaseInterface,
  ) {
    this.loggerService.setContext(MedicalProceduresController.name);
  }

  @Post()
  @ApiCreatedResponse({
    type: CreateMedicalProcedureResponseDto,
    description: 'Medical procedure registered successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async create(
    @Body() createMedicalProcedureInputDto: CreateMedicalProcedureInputDto,
  ): Promise<CreateMedicalProcedureResponseDto> {
    this.loggerService.log(`create: ${JSON.stringify(createMedicalProcedureInputDto)}`);
    return this.registerMedicalProcedureUseCase.execute(createMedicalProcedureInputDto);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: GetMedicalProcedureByIdResponseDto, description: 'Medical procedure found.' })
  @ApiNotFoundResponse({ description: 'Medical procedure not found.' })
  @ApiBadRequestResponse({ description: 'Invalid ID format.' })
  async findById(@Param('id') id: string): Promise<GetMedicalProcedureByIdResponseDto> {
    this.loggerService.log(`findById: ${id}`);
    return await this.getMedicalProcedureByIdUseCase.execute(id);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllMedicalProceduresResponseDto], description: 'List of all medical procedures.' })
  async findAll(): Promise<GetAllMedicalProceduresResponseDto> {
    this.loggerService.log('findAll');
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
    this.loggerService.log(`update: ${id} - ${JSON.stringify(updateMedicalProcedureInputDto)}`);
    return await this.updateMedicalProcedureUseCase.execute({
      id,
      ...updateMedicalProcedureInputDto,
    });
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({ description: 'Medical procedure deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Medical procedure not found.' })
  @ApiBadRequestResponse({ description: 'Invalid ID format.' })
  async delete(@Param('id') id: string): Promise<void> {
    this.loggerService.log(`delete: ${id}`);
    await this.deleteMedicalProcedureUseCase.execute({ id });
  }
}
