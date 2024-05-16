import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';

import { User, UserType } from '../../../models/index.js';
import { createSHA256 } from '../../../utils/hash.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatarUrl: string;

  @prop({ required: true, default: '' })
  public name: string;

  @prop({ required: true, default: '' })
  public type: UserType;

  @prop({ required: true, default: '' })
  private _password?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.name = userData.name;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this._password = createSHA256(password, salt);
  }

  public get password() {
    return this._password;
  }
}

export const UserModel = getModelForClass(UserEntity);
