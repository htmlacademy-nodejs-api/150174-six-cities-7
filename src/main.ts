import { Application } from './application/index.js';
import { Component } from './models/component.enum.js';
import { Container } from 'inversify';
import { createApplicationContainer } from './application/application.container.js';
import { createUserContainer } from './shared/modules/user/user.container.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createApplicationContainer(),
    createUserContainer(),
  );
  const application = appContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
