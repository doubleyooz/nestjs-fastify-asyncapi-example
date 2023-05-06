import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },

})
export class Car {
  @ApiProperty({
    example: ['611d90614b2ff9a9f3cfe3b7', '611d90614b2ff9a9f3cfe3b8'],
    description: 'List of user IDs participating in the car',
  })
  @Prop()
  passengers: string[];

  @ApiProperty({
    type: String,
    description: 'Car model',
  })
  @Prop()
  carModel: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);