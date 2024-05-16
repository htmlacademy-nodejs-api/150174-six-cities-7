import 'reflect-metadata';
import { Container } from 'inversify';

import { AppLogger, type Logger } from './shared/libs/logger/index.js';
import {
  AppConfig,
  type Config,
  type ConfigSchema,
} from './shared/libs/config/index.js';
import { Application } from './application/index.js';
import { Component } from './models/component.enum.js';
import { DBClient } from './shared/libs/db-client/db-client.interface.js';
import { MongoDBClient } from './shared/libs/db-client/mongo.db-client.js';

const container = new Container();
container
  .bind<Application>(Component.Application)
  .to(Application)
  .inSingletonScope();
container.bind<Logger>(Component.Logger).to(AppLogger).inSingletonScope();
container
  .bind<Config<ConfigSchema>>(Component.Config)
  .to(AppConfig)
  .inSingletonScope();
container
  .bind<DBClient>(Component.DBClient)
  .to(MongoDBClient)
  .inSingletonScope();

export { container };
