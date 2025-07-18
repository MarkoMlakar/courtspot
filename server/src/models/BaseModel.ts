import { Model } from 'objection';

export class BaseModel extends Model {
  // Common columns for all models
  id!: string;
  created_at!: Date;
  updated_at!: Date;
  is_deleted!: boolean;

  // Common model configuration
  static get modelPaths() {
    return [__dirname];
  }

  // Common timestamp handling
  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
} 