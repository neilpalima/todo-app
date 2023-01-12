import { get } from 'env-var';

export const AppConfig = {
    servicePort: get('PORT').default(8080).asPortNumber(),
    nodeEnv: get('NODE_ENV').default('development').asEnum(['development', 'production', 'test'])
};
