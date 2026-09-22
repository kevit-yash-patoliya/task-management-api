import winston from 'winston';

const { combine, timestamp, json, printf, colorize, errors } = winston.format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, stack, ...data }) => {
      const response: Record<string, unknown> = {
        level,
        timestamp,
        message,
      };
      if (stack) {
        response.stack = stack;
      }
      if (Object.keys(data).length > 0) {
        response.data = data;
      }
      return JSON.stringify(response);
    })
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        printf(({ timestamp, level, message, stack }) => {
          const msg = `${timestamp} [${level}]: ${message}`;
          return stack ? `${msg}\n${stack}` : msg;
        })
      ),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});

export default logger;
