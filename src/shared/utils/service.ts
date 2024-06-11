import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationErrorItem } from 'joi';
import { ErrorObject } from '../models/error-object.type.js';
import { HttpError } from '../libs/rest/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];

function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });
}

interface CreateErrorObjectParams {
  title: string;
  detail?: string;
  constraints?: ValidationErrorItem[];
  reference?: string;
}

function createErrorObject({
  title,
  detail,
  constraints,
  reference,
}: CreateErrorObjectParams): ErrorObject {
  const errorObject: ErrorObject = {
    title,
  };

  if (detail) {
    errorObject.detail = detail;
  }

  if (constraints) {
    errorObject.constraints = constraints.map((item) => ({
      name: item.context?.key || '',
      message: item.message,
      type: item.type,
    }));
  }

  if (reference) {
    errorObject.reference = reference;
  }

  return errorObject;
}

function getFullServerPath(serverHost: string, serverPort: number) {
  return `http://${serverHost}:${serverPort}`;
}

function checkFileMimeType(mimeType: string) {
  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    throw new HttpError(
      StatusCodes.UNSUPPORTED_MEDIA_TYPE,
      'File type is not allowed',
      `Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`,
    );
  }
  return true;
}

export { fillDTO, createErrorObject, getFullServerPath, checkFileMimeType };
