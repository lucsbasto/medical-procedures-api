import { InvalidSchema } from '@/common/exceptions/invalid-schema.exception';
import { Optional, ValidationError, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  constructor(
    @Optional()
    options?: Omit<ValidationPipeOptions, 'exceptionFactory' | 'errorHttpStatusCode'>,
  ) {
    super(options);
    this.exceptionFactory = (validationErrors: ValidationError[]) => {
      const errors = this.flattenValidationErrors(validationErrors);
      return new InvalidSchema(
        'body',
        errors,
        undefined,
        'Validation failed for provided data. Check the details in the metadata field.',
      );
    };
  }
}
