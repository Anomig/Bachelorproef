# Sensus Admin - Data Requirements Per Screen

This checklist describes what must exist in Strapi and Supabase for the current `sensus-admin` app to work with real data.

## 1. Login / Signup

### Supabase
- Supabase Auth must be enabled.
- Email/password login must be allowed.
- `VITE_SUPABASE_URL` must point to the project.
- `VITE_SUPABASE_ANON_KEY` must be available in the deployed admin app.
- If you use email confirmation, make sure the confirmation flow is acceptable for your admin users.

### Result in the app
- `/login` uses `signInWithPassword`.
- `/signup` uses `signUp`.
- Logout uses `signOut`.
- Route guards redirect anonymous users to `/login`.

## 2. Dashboard

### Supabase
- No special table is required for the dashboard shell itself.
- If you want live metrics, you need a `sessions` table because the dashboard pulls session counts from there.

### Result in the app
- Top-level shell, notifications, and user display work from auth state.
- Metrics are derived from sessions data when Supabase is configured.

## 3. Scenarios list / detail / create / edit / preview

### Strapi
You need a `scenario` collection type with at least these fields:
- `title` - string
- `theme` - string
- `description` - text
- `status` - draft/published state, or equivalent publishing support
- `flow` - JSON field for the scenario flow

Recommended additional fields, based on the current mock data:
- `date` - datetime or string if you want a visible created/published date
- `sessions` - integer if you want the list and detail screens to show usage counts
- `is_active` - boolean if you want to manage whether a scenario is active
- `age_min` - integer
- `age_max` - integer
- `engine_json` - JSON if you keep engine-specific scenario config separate from `flow`

### Strapi API behavior
- `GET /api/scenarios?populate=*`
- `GET /api/scenarios/:id?populate=*`
- `POST /api/scenarios`
- `PUT /api/scenarios/:id`

### Result in the app
- Scenario list reads from Strapi first.
- Create/edit calls POST and PUT through `strapiService`.
- Preview/detail screens can still fall back to mock data if Strapi is unavailable.

## 4. Sessions list

### Supabase
Create a `sessions` table with at least these columns:
- `id` - string or UUID
- `name` - text
- `scenario` - text, or foreign key if you prefer a relational setup
- `date` - text or timestamp
- `start` - text or time
- `end` - text or time
- `status` - enum/text with values like `done`, `stopped`, `active`

Recommended extras:
- `user_id` - if sessions should link to a user/profile
- `duration_seconds` - if you want accurate analytics
- `completed_at` - if you want finish-time based reporting

### Result in the app
- The sessions screen reads from Supabase when config is present.
- If the query fails or config is missing, the app falls back to mock sessions.

## 5. Users screen

### Current state
- The current users screen still uses mock user data.
- It is not yet connected to a real backend table.

### If you want real users
Use Supabase:
- Create a `profiles` table, or another user metadata table.
- Store fields like `id`, `name`, `email`, `role`.
- Link it to `auth.users` via the same `id` if you want a standard Supabase setup.

Or use Strapi:
- Create a `user` or `profile` content type.
- Expose the required read permissions for the admin.

## 6. Auth and access control

### Supabase policies
- Turn on Row Level Security for sensitive tables.
- Add policies that let authenticated admin users read the tables you need.
- Add insert/update/delete policies only where needed.

### Strapi access
- If the API is not public, create a Strapi API token.
- Store that token as `VITE_STRAPI_TOKEN` in the deployed admin environment.
- Allow the admin origin in Strapi CORS.

## 7. Minimum production setup

To make the current admin usable online, you need:
- One working Strapi environment with the `scenario` content type.
- One working Supabase project with Auth and a `sessions` table.
- Correct env vars in the admin hosting platform.
- CORS configured on Strapi.
- RLS policies configured on Supabase.

## 8. Quick readiness check

Before deployment, verify these screens:
- `/login` logs in with Supabase Auth.
- `/signup` creates a Supabase account.
- `/scenarios` loads scenarios from Strapi.
- `/scenarios/new` can create a scenario in Strapi.
- `/sessions` loads rows from Supabase.
- Logout clears the session and redirects to `/login`.

## 9. Go-live checklist

1. Confirm all env vars are set in the hosting platform.
2. Confirm `npm run build` passes in `sensus-admin`.
3. Confirm Strapi CORS allows the admin domain.
4. Confirm the Strapi API token works if the API is private.
5. Confirm Supabase Auth is enabled.
6. Confirm Supabase RLS policies allow the required reads.
7. Confirm the `sessions` table exists and has the expected columns.
8. Confirm scenario data exists in Strapi and is published.
9. Confirm login, logout, scenario load, and session load all work in production.
10. Confirm no secrets are committed in the repo history.
