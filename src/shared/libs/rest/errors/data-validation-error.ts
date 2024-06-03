import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';

class DataValidationError extends Error {
  public statusCode = StatusCodes.BAD_REQUEST;

  constructor(
    public message: string,
    public detail: string,
    public validationError: ValidationError,
  ) {
    super(message);
  }
}

export { DataValidationError };
