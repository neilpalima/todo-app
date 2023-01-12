import 'source-map-support/register';
import './module-alias';

import { logger } from 'src/libs/logger';
import { createApp } from 'src/app';

/**
 * Start an Express server
 */
(async () => {
    try {
        const app = await createApp();
        app.listen(app.get('port'), () => {
            logger.info(`Started express server at port: ${app.get('port')} with env: ${app.get('env')}`);
        });
    } catch (err) {
        logger.error(err, 'error caught in server.ts');
    }
})();
