import * as winston from 'winston';
import { AppConfig } from 'src/config';

export const logger = winston.createLogger({
    level: AppConfig.nodeEnv === 'test' ? 'silent' : 'info',
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(winston.format.colorize(), winston.format.simple())
        })
    ]
});
