import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getRepository } from 'typeorm';

@Injectable()
@ValidatorConstraint({ name: 'Exists', async: true })
export class ExistsRule implements ValidatorConstraintInterface {
  public async validate(value: string, args: any): Promise<boolean> {
    const entityClass = args.constraints;
    return (await getRepository(entityClass).findOne(value)) ? true : false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} record doesn't exist`;
  }
}

export function Exists(constraints, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ExistsRule,
      constraints: constraints,
    });
  };
}
