import { ConfigSchema } from './config.schema.js';

interface Config {
  get<T extends keyof ConfigSchema = keyof ConfigSchema>(
    key: T,
  ): ConfigSchema[T];
}

export type { Config };
