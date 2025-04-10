import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

// Should ONLY be used in server, database and unknown errors
export class ApiError extends AppException {
  constructor(message: string, internalDetails?: unknown, isToAlert?: boolean) {
    const warning =
      'Please try again. If the problem continues, get in touch with our support team with this response body and any other related details.';
    super(
      'api_error',
      message ? `API Error: ${message}. ${warning}` : `Unfortunately, there was a problem. ${warning}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
      internalDetails,
      isToAlert,
    );
  }
}
