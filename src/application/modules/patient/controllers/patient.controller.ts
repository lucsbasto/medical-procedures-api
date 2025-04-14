import { Body, Controller, Get, Inject, Param, Patch, Post, ValidationPipe } from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ILoggerService } from '@/domain/interfaces/common/logger';
import { GetAllPatientsUseCaseInterface } from '@/domain/patient/use-cases/get-all-patients/get-all-patients.use-case.interface';
import { GetPatientByIdUseCaseInterface } from '@/domain/patient/use-cases/get-patient-by-id/get-patient-by-id.use-case.interface';
import { RegisterPatientUseCaseInterface } from '@/domain/patient/use-cases/register-patient/register-patient.use-case.interface';
import { UpdatePatientUseCaseInterface } from '@/domain/patient/use-cases/update-patient/update-patient.use-case.interface';
import {
  CreatePatientInputDto,
  CreatePatientResponseDto,
  GetAllPatientResponseDto,
  GetByIdPatientResponseDto,
  UpdatePatientInputDto,
  UpdatePatientResponseDto,
} from './dtos';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(
    @Inject('ILoggerService')
    private readonly loggerService: ILoggerService,
    @Inject('RegisterPatientUseCaseInterface')
    private readonly registerPatientUseCase: RegisterPatientUseCaseInterface,
    @Inject('GetAllPatientsUseCaseInterface')
    private readonly getAllPatientsUseCase: GetAllPatientsUseCaseInterface,
    @Inject('GetPatientByIdUseCaseInterface')
    private readonly getPatientByIdUseCase: GetPatientByIdUseCaseInterface,
    @Inject('UpdatePatientUseCaseInterface')
    private readonly updatePatientUseCase: UpdatePatientUseCaseInterface,
  ) {
    this.loggerService.setContext(PatientsController.name);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Paciente criado com sucesso.', type: CreatePatientResponseDto })
  @ApiBadRequestResponse({ description: 'Dados de requisição inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  async create(@Body(new ValidationPipe()) createPatientDto: CreatePatientInputDto): Promise<CreatePatientResponseDto> {
    this.loggerService.info(`create - ${JSON.stringify(createPatientDto)}`);
    return await this.registerPatientUseCase.execute(createPatientDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de todos os pacientes.', type: [GetAllPatientResponseDto] })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  async findAll(): Promise<GetAllPatientResponseDto[]> {
    this.loggerService.info('findAll');
    return await this.getAllPatientsUseCase.execute();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Detalhes de um paciente específico.', type: GetByIdPatientResponseDto })
  @ApiNotFoundResponse({ description: 'Paciente não encontrado.' })
  @ApiBadRequestResponse({ description: 'ID do paciente em formato inválido.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  async findOne(@Param('id') id: string): Promise<GetByIdPatientResponseDto> {
    this.loggerService.info(`findOne - id: ${id}`);
    return await this.getPatientByIdUseCase.execute({ id });
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Paciente atualizado com sucesso.', type: UpdatePatientResponseDto })
  @ApiNotFoundResponse({ description: 'Paciente não encontrado.' })
  @ApiBadRequestResponse({ description: 'Dados de requisição inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatePatientDto: UpdatePatientInputDto,
  ): Promise<UpdatePatientResponseDto> {
    this.loggerService.info(`update - id: ${id} - ${JSON.stringify(updatePatientDto)}`);
    return await this.updatePatientUseCase.execute({ id, ...updatePatientDto });
  }
}
