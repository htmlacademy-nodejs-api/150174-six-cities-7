import { AppConfig } from '../libs/config/index.js';
import { AppLogger } from '../libs/logger/index.js';

class Application {
  private logger = new AppLogger();
  private config = new AppConfig();

  public init() {
    this.logger.info('App initialized');
    this.logger.info(`Current port: ${this.config.get('PORT')}`);
  }
}

export { Application };
