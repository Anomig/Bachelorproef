// Middleware-pipeline: activeert security/body parsing en beperkt CORS tot frontend origins.
import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => {
  const allowedOrigins = [env('FRONTEND_URL', 'http://localhost:5173'), env('FRONTEND_PREVIEW_URL', '')].filter(
    (value): value is string => Boolean(value)
  );

  return [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
      name: 'strapi::cors',
      config: {
        origin: allowedOrigins,
      },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};

export default config;
