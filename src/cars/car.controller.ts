import { Controller, Get, Param } from '@nestjs/common';
import { FindOneRequest } from './dto/find.one.request.dto';
import { CarService } from './car.service';
import { Logger } from '@nestjs/common/services';
import { Car } from './car.schema';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiProduces,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('car')
@Controller('car')
export class CarController {
  private readonly logger = new Logger(CarController.name);

  constructor(private _service: CarService) {}

  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @ApiOperation({
    summary: 'Find chat by ID',
  })
  @ApiQuery({
    name: '_id',
    required: true,
    type: String,
    description: 'The ID of the car to retrieve',
    example: '611d06a2979f7a2ed8cd7223',
  })
  @ApiResponse({
    status: 200,
    description: 'The car has been successfully retrieved.',
    type: Car,
  })
  @Get(':_id')
  async findByCarId(@Param() params: FindOneRequest): Promise<Car> {
    this.logger.log(`find car by id: ${params._id}`);
    return await this._service.findById(params._id);
  }

  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @ApiOperation({
    summary: 'Find cars by passenger ID',
  })
  @ApiQuery({
    name: '_id',
    required: true,
    type: String,
    description: 'The ID of the passenger',
    example: '611d06a2979f7a2ed8cd7223',
  })
  @ApiResponse({
    status: 200,
    description: 'The cars have been successfully retrieved.',
    type: [Car],
  })
  @Get('participants/:_id')
  async findByPassengerId(@Param() params: FindOneRequest): Promise<Car[]> {
    this.logger.log(`find all cars related to the user_id: ${params._id}`);
    return this._service.findByPassengerId(params._id);
  }
}
