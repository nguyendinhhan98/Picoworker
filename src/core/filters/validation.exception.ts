import { BadRequestException } from '@nestjs/common';

interface Error {
  field: string;
  message: any;
}

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: Error[]) {
    super();
  }
}
