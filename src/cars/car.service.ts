import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { FindOneRequest } from './dto/find.one.request.dto';
import { Car, CarDocument } from './car.schema';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class CarService {
  private readonly logger = new Logger(CarService.name);

  constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

  async findById(filter: FilterQuery<CarDocument>): Promise<Car> {
    const id = filter._id;
    this.logger.log(`Find car by ID: ${id}`);
    const document = await this.carModel.findById(id).exec();
    if (!document) {
      this.logger.error(
        `No documents with passenger id ${id} were found.`,
        null,
      );
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async findByPassengerId(filter: FilterQuery<CarDocument>): Promise<Car[]> {
    const passengerId = filter._id;
    this.logger.log(
      `Find all cars associated with the passenger ID: ${passengerId}`,
    );
    const documents = await this.carModel.find({ passengerId }).exec();
    if (!documents) {
      this.logger.error(
        `No documents with passenger id ${passengerId} were found.`,
        null,
      );
    }
    return documents;
  }
}
