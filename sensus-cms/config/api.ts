// REST API limieten: bepaalt default/max paginatie voor content endpoints.
import type { Core } from '@strapi/strapi';

const config: Core.Config.Api = {
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },
};

export default config;
