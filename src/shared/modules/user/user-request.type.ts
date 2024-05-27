import { Request } from 'express';
import { RequestBody, RequestParams } from '../../models/index.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';

type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;

export type { CreateUserRequest, LoginUserRequest };
