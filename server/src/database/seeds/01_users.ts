import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Generate password hash
  const passwordHash = await bcrypt.hash('password123', 10);

  // Inserts seed entries
  await knex('users').insert([
    {
      id: uuidv4(),
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
      password_hash: passwordHash,
      date_of_birth: '1990-01-01',
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      username: 'janesmith',
      password_hash: passwordHash,
      date_of_birth: '1992-05-15',
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date()
    },
  ]);
} 