import knex from 'knex';
import config from './knexfile';

// Get the environment from NODE_ENV or default to development
const environment = process.env.NODE_ENV || 'development';

// Create and export the Knex instance
const db = knex(config[environment]);

// Export the db instance
export default db;

// Export a function to check the database connection
export const checkConnection = async () => {
  try {
    await db.raw('SELECT 1');
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}; 