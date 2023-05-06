import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'IsValidObjectId', async: false })
export class IsObjectId implements ValidatorConstraintInterface {
  validate(value: string) {
    try {
      new Types.ObjectId(value);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export function IsValidObjectId(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsValidObjectId',
      target: object.constructor,
      propertyName,
      options: validationOptions
        ? validationOptions
        : {
            message: `${propertyName} is not a valid ObjectId`,
          },
      validator: IsObjectId,
    });
  };
}
