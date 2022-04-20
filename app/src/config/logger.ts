import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
const { combine, timestamp, colorize, simple, printf, label } = format;
import * as appRoot from 'app-root-path';

//Log print
const printFormat = printf(({ timestamp, label, level, message }) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
});

//Log 속성
const printLogFormat = {
  file: combine(
    label({
      label: 'Express',
    }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:dd',
    }),
    printFormat
  ),
  console: combine(colorize(), simple()),
};

//Log 설정
const options = {
  dailyRotateFileALL: new transports.DailyRotateFile({
    level: 'debug',
    datePattern: 'YYYY-MM-DD',
    dirname: `${appRoot}/logs/all`,
    filename: '%DATE%.all.log',
    maxFiles: 10,
    zippedArchive: true,
    format: printLogFormat.file,
  }),
  dailyRotateFileERROR: new transports.DailyRotateFile({
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    dirname: `${appRoot}/logs/error`,
    filename: '%DATE%.error.log',
    maxFiles: 30,
    zippedArchive: true,
    format: printLogFormat.file,
  }),
  console: new transports.Console({
    level: 'info',
    format: printLogFormat.console,
  }),
};

const logger = createLogger({
  transports: [options.dailyRotateFileALL, options.dailyRotateFileERROR],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(options.console);
}

// logger.stream = {
//   write: (message) => logger.info(message),
// };

export default logger;
