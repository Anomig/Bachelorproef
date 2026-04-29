/**
 * scenario service
 */

// Service-laag: bevat businesslogica/data-operaties voor scenario's.

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::scenario.scenario');
