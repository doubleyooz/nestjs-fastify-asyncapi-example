import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { IsValidObjectId } from '../../utils/is.object.id.decorator';

export class FindOneRequest {
  @IsValidObjectId()
  @ApiProperty({
    example: '60e63b123c579e31a82f9867',
    description: 'The ID of the document to retrieve',
  })
  _id: Types.ObjectId;
}
