import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetAllPatientsUseCase } from '@/domain/patient/use-cases/get-all-patients/get-all-patients.use-case';
import { GetPatientByIdUseCase } from '@/domain/patient/use-cases/get-patient-by-id/get-patient-by-id.use-case';
import { RegisterPatientUseCase } from '@/domain/patient/use-cases/register-patient/register-patient.use-case';
import { UpdatePatientUseCase } from '@/domain/patient/use-cases/update-patient/update-patient.use-case'; // Importe o caso de uso de atualização
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
    private readonly registerPatientUseCase: RegisterPatientUseCase,
    private readonly getAllPatientsUseCase: GetAllPatientsUseCase,
    private readonly getPatientByIdUseCase: GetPatientByIdUseCase,
    private readonly updatePatientUseCase: UpdatePatientUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({ description: 'Paciente criado com sucesso.', type: CreatePatientResponseDto })
  @ApiBadRequestResponse({ description: 'Dados de requisição inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  async create(@Body(new ValidationPipe()) createPatientDto: CreatePatientInputDto): Promise<CreatePatientResponseDto> {
    try {
      return await this.registerPatientUseCase.execute(createPatientDto);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar o paciente.');
    }
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de todos os pacientes.', type: [GetAllPatientResponseDto] })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  async findAll(): Promise<GetAllPatientResponseDto[]> {
    try {
      return await this.getAllPatientsUseCase.execute();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar os pacientes.');
    }
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Detalhes de um paciente específico.', type: GetByIdPatientResponseDto })
  @ApiNotFoundResponse({ description: 'Paciente não encontrado.' })
  @ApiBadRequestResponse({ description: 'ID do paciente em formato inválido.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  async findOne(@Param('id') id: string): Promise<GetByIdPatientResponseDto> {
    try {
      const patient = await this.getPatientByIdUseCase.execute({ id });
      if (!patient) {
        throw new NotFoundException(`Paciente com ID ${id} não encontrado.`);
      }
      return patient;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao buscar o paciente.');
    }
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
    try {
      const updatedPatient = await this.updatePatientUseCase.execute({ id, ...updatePatientDto });
      if (!updatedPatient) {
        throw new NotFoundException(`Paciente com ID ${id} não encontrado.`);
      }
      return updatedPatient;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao atualizar o paciente.');
    }
  }
}
