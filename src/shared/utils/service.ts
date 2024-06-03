import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'joi';

function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });
}

type InvalidField = {
  name: string;
  message: string;
};

interface ErrorObject {
  title: string;
  detail?: string;
  fields?: InvalidField[];
}

function createErrorObject(
  title: string,
  detail?: string,
  validationError?: ValidationError,
): ErrorObject {
  const errorObject: ErrorObject = {
    title,
  };

  if (detail) {
    errorObject.detail = detail;
  }

  if (validationError) {
    errorObject.title = `${validationError.name}: ${title}`;
    errorObject.fields = validationError.details.map((item) => ({
      name: item.context?.key || '',
      message: item.message,
    }));
  }

  return errorObject;
}

export { fillDTO, createErrorObject };
