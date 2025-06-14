import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('first_name', 255);
    table.string('last_name', 255);
    table.string('email', 255).notNullable().unique();
    table.string('username', 255).notNullable().unique();
    table.string('password_hash', 255).notNullable();
    table.date('date_of_birth');
    table.boolean('is_deleted').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Add indexes
    table.index('email', 'idx_email');
    table.index('username', 'idx_username');

    // Add check constraint for email format
    table.check('email REGEXP "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
} 