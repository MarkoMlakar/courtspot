import { Model } from 'objection';
import db from './connection';

// Initialize Objection with Knex instance
Model.knex(db);

export { Model }; 