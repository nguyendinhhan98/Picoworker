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
@ValidatorConstraint({ name: 'Duplicated', async: true })
export class DuplicatedRule implements ValidatorConstraintInterface {
  public async validate(value: string, args: any): Promise<boolean> {
    const entityClass = args.constraints;
    return (await getRepository(entityClass).findOne({
      [args.property]: value,
    }))
      ? false
      : true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} record has exist`;
  }
}

export function Duplicated(constraints, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: DuplicatedRule,
      constraints: constraints,
    });
  };
}
