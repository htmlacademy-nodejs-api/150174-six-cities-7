import { injectable, inject } from 'inversify';
import express from 'express';
import type {
  Config,
  DBClient,
  Logger,
  ConfigSchema,
} from '../shared/libs/index.js';
import { Component } from '../models/component.enum.js';

@injectable()
class Application {
  private readonly server = express();

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<ConfigSchema>,
    @inject(Component.DBClient) private readonly dbClient: DBClient,
  ) {}

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  public async init() {
    this.logger.info('Application is initializing…');

    this.logger.info('Initialize database…');
    await this.dbClient.connect();
    this.logger.info('Database initialized!');

    this.logger.info('Initialize server…');
    await this.initServer();
    this.logger.info(`Server is running on port: ${this.config.get('PORT')}!`);
  }

  public async close() {
    await this.dbClient.disconnect();
    this.logger.info('Exited successfully!');
  }
}

export { Application };
