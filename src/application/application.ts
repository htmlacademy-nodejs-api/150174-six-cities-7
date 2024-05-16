import { injectable, inject } from 'inversify';
import { Config, ConfigSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../models/component.enum.js';
import { DBClient } from '../shared/libs/db-client/db-client.interface.js';

@injectable()
class Application {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<ConfigSchema>,
    @inject(Component.DBClient) private readonly dbClient: DBClient,
  ) {}

  public async init() {
    this.logger.info('App initialized');
    this.logger.info(`Current port: ${this.config.get('PORT')}`);

    this.logger.info('Initialize database…');
    await this.dbClient.connect();
    this.logger.info('Database initialized');
  }
}

export { Application };
