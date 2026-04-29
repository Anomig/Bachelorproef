/**
 * scenario controller
 */

// Controller-laag: verwerkt inkomende requests voor scenario resources.

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::scenario.scenario');
