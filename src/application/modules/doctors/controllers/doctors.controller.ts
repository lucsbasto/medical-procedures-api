import { GetAllDoctorsUseCase } from '@/domain/doctor/use-cases/get-all-doctors/get-all-doctors.use-case';
import { GetDoctorByIdUseCase } from '@/domain/doctor/use-cases/get-doctor-by-id/get-doctor-by-id.use-case';
import { RegisterDoctorUseCase } from '@/domain/doctor/use-cases/register-doctor/register-doctor.use-case';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
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
import { CreateDoctorDto } from './dtos/create-doctor.dto';
import { DoctorResponseDto } from './dtos/doctor-response.dto';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(
    private readonly registerDoctorUseCase: RegisterDoctorUseCase,
    private readonly getAllDoctorsUseCase: GetAllDoctorsUseCase,
    private readonly getDoctorByIdUseCase: GetDoctorByIdUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({ description: 'Médico criado com sucesso.', type: DoctorResponseDto })
  @ApiBadRequestResponse({ description: 'Dados de requisição inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  async create(@Body(new ValidationPipe()) createDoctorDto: CreateDoctorDto): Promise<DoctorResponseDto> {
    try {
      return await this.registerDoctorUseCase.execute(createDoctorDto);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar o médico.');
    }
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de todos os médicos.', type: [DoctorResponseDto] })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  async findAll(): Promise<DoctorResponseDto[]> {
    try {
      return await this.getAllDoctorsUseCase.execute();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar os médicos.');
    }
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Detalhes de um médico específico.', type: DoctorResponseDto })
  @ApiNotFoundResponse({ description: 'Médico não encontrado.' })
  @ApiBadRequestResponse({ description: 'ID do médico em formato inválido.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  async findOne(@Param('id') id: string): Promise<DoctorResponseDto> {
    try {
      const doctor = await this.getDoctorByIdUseCase.execute({ id });
      if (!doctor) {
        throw new NotFoundException(`Médico com ID ${id} não encontrado.`);
      }
      return doctor;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao buscar o médico.');
    }
  }
}
