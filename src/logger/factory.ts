import { Format } from 'logform';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { format, transports } from 'winston';
import winston from 'winston/lib/winston/config';

export const LoggerFactory = (appName: string) => {
  let consoleFormat: Format;

  consoleFormat = format.combine(
    format.timestamp(),
    format.ms(),
    nestWinstonModuleUtilities.format.nestLike(appName, {
      colors: true,
      prettyPrint: true,
    }),
  );
  return WinstonModule.createLogger({
    level: 'debug',
    transports: [
      new transports.Console({ format: consoleFormat }),
      new transports.File({
        filename: 'logger/error.log',
        level: 'error',
        format: format.combine(format.timestamp(), format.json()),
      }),
      new transports.File({
        filename: 'logger.log',
        level: 'debug',
        format: format.combine(format.timestamp(), format.json()),
      }),
    ],
  });
};
