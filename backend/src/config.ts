import { get } from 'env-var';

export const AppConfig = {
    servicePort: get('PORT').default(3000).asPortNumber(),
    nodeEnv: get('NODE_ENV').default('development').asEnum(['development', 'production', 'test'])
};
