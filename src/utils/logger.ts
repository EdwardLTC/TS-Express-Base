import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { LOG_DIR } from '@config';
import { format } from 'winston';

// logs dir
const logDir: string = join(__dirname, LOG_DIR);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

const vietnamTimestamp = format(info => {
  info.timestamp =
    //format date time to vietnam timezone  +7
    new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  return info;
});
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: winston.format.combine(vietnamTimestamp(), logFormat),

  transports: [
    //debug log setting
    //   new winstonDaily({
    //     level: 'info',
    //     datePattern: 'DD-MM-YYYY',
    //     dirname: logDir + '/debug', // log file /logs/debug/*.log in save
    //     filename: `%DATE%.log`,
    //     maxFiles: 30, // 30 Days saved
    //     json: false,
    //     zippedArchive: true,
    //   }),
    //   // error log setting
    //   new winstonDaily({
    //     level: 'error',
    //     datePattern: 'DD-MM-YYYY',
    //     dirname: logDir + '/error', // log file /logs/error/*.log in save
    //     filename: `%DATE%.log`,
    //     maxFiles: 30, // 30 Days saved
    //     handleExceptions: true,
    //     json: false,
    //     zippedArchive: true,
    //   }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
  }),
);

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

export { logger, stream };
