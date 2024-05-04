import dotenv from 'dotenv';
import { Config } from './config.interface.js';
import { ConfigSchema, configSchema } from './config.schema.js';

class AppConfig implements Config {
  private readonly config: ConfigSchema;

  constructor() {
    const mode = process.env.NODE_ENV || 'development';
    const { parsed, error } = dotenv.config({ path: `.env.${mode}` });

    if (error) {
      throw error;
    }

    configSchema.load(parsed);
    configSchema.validate({ allowed: 'strict' });

    this.config = configSchema.getProperties();
  }

  public get: Config['get'] = (key) => this.config[key];
}

export { AppConfig };
