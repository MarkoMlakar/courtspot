import { BaseModel } from './BaseModel';

// Define the User interface
export interface User {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  username: string;
  password_hash: string;
  date_of_birth: Date | null;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}

export class UserModel extends BaseModel {
  // Table name
  static tableName = 'users';

  // TypeScript type for the model
  declare id: string;
  declare first_name: string | null;
  declare last_name: string | null;
  declare email: string;
  declare username: string;
  declare password_hash: string;
  declare date_of_birth: Date | null;
  declare is_deleted: boolean;
  declare created_at: Date;
  declare updated_at: Date;

  // JSON schema for validation
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'username', 'password_hash'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        first_name: { type: ['string', 'null'], maxLength: 255 },
        last_name: { type: ['string', 'null'], maxLength: 255 },
        email: { 
          type: 'string', 
          format: 'email',
          maxLength: 255,
          pattern: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
        },
        username: { type: 'string', maxLength: 255 },
        password_hash: { type: 'string', maxLength: 255 },
        date_of_birth: { type: ['string', 'null'], format: 'date' },
        is_deleted: { type: 'boolean' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  // Convert date string to Date object when setting
  $beforeInsert() {
    super.$beforeInsert();
    if (this.date_of_birth && typeof this.date_of_birth === 'string') {
      this.date_of_birth = new Date(this.date_of_birth);
    }
  }

  $beforeUpdate() {
    super.$beforeUpdate();
    if (this.date_of_birth && typeof this.date_of_birth === 'string') {
      this.date_of_birth = new Date(this.date_of_birth);
    }
  }

  // Relations
  static get relationMappings() {
    return {
      // Add relations here when needed
      // Example:
      // courts: {
      //   relation: Model.HasManyRelation,
      //   modelClass: CourtModel,
      //   join: {
      //     from: 'users.id',
      //     to: 'courts.created_by'
      //   }
      // }
    };
  }

  // Indexes
  static get indexes() {
    return [
      {
        name: 'idx_email',
        columns: ['email']
      },
      {
        name: 'idx_username',
        columns: ['username']
      }
    ];
  }
} 