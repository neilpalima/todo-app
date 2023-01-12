import { NextFunction, Request, Response } from 'express';
import { logger } from 'src/libs/logger';
import { NotFoundError } from 'src/errors';

export const errorHandler = () => {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof NotFoundError) {
            return res.status(err.status).json({
                message: err.message,
                error_code: err.error_code
            });
        }
        if (err.status) {
            logger.info(`Validation Error: ${err}`);
            return res.status(err.status).json({
                message: err.message,
                error_code: err.error_code || 'API_VALIDATION_ERROR',
                errors: err.errors
                    ? err.errors.map((e: { path: string; message: string; doc_url?: string }) => ({
                          path: e.path,
                          message: e.message,
                          doc_url: e.doc_url
                      }))
                    : err.errors
            });
        }

        logger.error(err, 'unexpected error');

        return res.status(500).send({
            error_code: 'SERVER_ERROR',
            message: 'Something unexpected happened, we are investigating this issue right now'
        });
    };
};
