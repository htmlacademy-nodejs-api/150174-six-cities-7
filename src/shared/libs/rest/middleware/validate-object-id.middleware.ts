import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';

class ValidateObjectIdMiddleware implements Middleware {
  constructor(
    private param: string,
    private target: 'params' | 'body' = 'params',
  ) {}

  public execute(req: Request, _res: Response, next: NextFunction): void {
    const objectId = req[this.target][this.param];
    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${objectId} is not valid ObjectID`,
      'ValidateObjectIdMiddleware',
    );
  }
}

export { ValidateObjectIdMiddleware };
