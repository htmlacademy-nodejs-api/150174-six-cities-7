export const Component = {
  Application: Symbol.for('Application'),
  Logger: Symbol.for('AppLogger'),
  Config: Symbol.for('AppConfig'),
  DBClient: Symbol.for('DBClient'),
} as const;
