import { AppConfig, MongoDBClient } from '../../shared/libs/index.js';
import { Application } from '../../application/application.js';
import { UserController } from '../../shared/modules/user/user.controller.js';
import { DefaultUserService } from '../../shared/modules/user/default-user.service.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';

const configureApp = async () => {
  const logger = console;
  const config = new AppConfig();
  const dbClient = new MongoDBClient(config, logger);
  const userService = new DefaultUserService(logger, UserModel);
  const userController = new UserController(logger, userService, config);
  const app = new Application(logger, config, dbClient, userController);
  await app.init();
  return app;
};

export { configureApp };
