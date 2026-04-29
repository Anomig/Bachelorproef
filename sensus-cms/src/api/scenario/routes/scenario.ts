/**
 * scenario router
 */

// Route-laag voor CRUD endpoints van het `scenario` content type.

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::scenario.scenario');
