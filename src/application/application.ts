import { AppLogger } from '../shared/logger/index.js';

class Application {
  private logger = new AppLogger();

  public init() {
    this.logger.info('App initialized');
  }
}

export { Application };
