# Sensus Admin Deploy Checklist

## 1. Admin app

- Install dependencies in `sensus-admin`.
- Set these env vars in your hosting platform:
  - `VITE_STRAPI_URL`
  - `VITE_STRAPI_TOKEN` if Strapi is protected
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Run `npm run build` and make sure it succeeds before deploying.
- Confirm the app is served from a static host that supports Vue Router history mode.

## 2. Strapi requirements

- Strapi must be reachable from the admin host.
- CORS in `sensus-cms/config/middlewares.ts` must allow the admin origin.
- A `scenario` collection type must exist with at least:
  - `title`
  - `theme`
  - `description`
  - `age_min`
  - `age_max`
  - `is_active`
  - `engine_json`
- If the admin should not access Strapi anonymously, create and use a Strapi API token.
- Make sure the content type is published and the database connection is production-ready.

## 3. Supabase requirements

- Supabase project URL and anon key must be present in the admin env.
- Supabase Auth must be enabled if the admin login should work.
- A `sessions` table should exist with columns compatible with the admin code:
  - `id`
  - `name`
  - `scenario`
  - `date`
  - `start`
  - `end`
  - `status`
- Row Level Security should be configured for the data you want to expose.
- Policies must allow the authenticated admin users to read the required tables.

## 4. Production sanity check

- Open `/login` and verify auth works.
- Verify the dashboard loads after login.
- Verify scenarios can be read from Strapi.
- Verify sessions can be read from Supabase.
- Verify logout clears the session and redirects to `/login`.
