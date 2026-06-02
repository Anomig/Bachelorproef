// Middleware-pipeline: activeert security/body parsing en beperkt CORS tot frontend origins.
import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => {
  const allowedOrigins = [env('FRONTEND_URL', 'http://localhost:5173'), env('FRONTEND_PREVIEW_URL', ''), env('FRONTEND_ADMIN_URL', 'https://bachelorproef-admin.vercel.app')].filter(
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
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        headers: '*',
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
