import { config, createLogger, format, transports } from 'winston';

import * as dotenv from 'dotenv';
dotenv.config();

const colorizer = format.colorize();

function loggingLevelOrDefault(level?: string, defaultLevel = 'info'): string {
  if (!level) return defaultLevel;

  const allowedLevels = Object.keys(config.npm.levels);

  return allowedLevels.includes(level) ? level : defaultLevel;
}

const logConsoleTransport = new transports.Console({
  level: loggingLevelOrDefault(process.env.LOGGING_LEVEL, 'info'),
  handleExceptions: true,
  format: format.combine(
    format.timestamp(),
    format.printf((info: any) => {
      const timestamp = typeof info?.timestamp === 'string' ? info?.timestamp : JSON.stringify(info?.timestamp);
      const message = typeof info?.message === 'string' ? info?.message : JSON.stringify(info?.message);
      const context =
        typeof info?.meta?.context === 'string' ? String(info?.meta?.context) : JSON.stringify(info?.meta?.context);

      return (
        `${timestamp} [${colorizer.colorize(info.level, info.level.toLocaleUpperCase())}] [${colorizer.colorize('warn', context) ?? ''}] ` +
        `${colorizer.colorize(info.level, message)} ${JSON.stringify(info?.meta)}`
      );
    }),
  ),
});

export const mainLogger = createLogger({
  exitOnError: false,
  transports: [logConsoleTransport],
});
