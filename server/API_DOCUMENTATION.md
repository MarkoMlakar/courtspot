# CourtSpot API Documentation

## Base URL
```
http://localhost:3000
```

## Health Check
**GET** `/test`
- **Description**: Check if the server is running
- **Response**: `{ "message": "Server is running!" }`

## User Management Endpoints

### 1. Create User
**POST** `/users`
- **Description**: Create a new user account
- **Required Fields**: `email`, `username`, `password`
- **Optional Fields**: `first_name`, `last_name`, `date_of_birth`

**Request Body Example:**
```json
{
  "email": "john.doe@example.com",
  "username": "johndoe",
  "password": "securepassword123",
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "1990-01-01"
}
```

**Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john.doe@example.com",
  "username": "johndoe",
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "1990-01-01T00:00:00.000Z",
  "is_deleted": false,
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `400` - Missing required fields
- `409` - Email or username already exists
- `500` - Server error

### 2. Get All Users
**GET** `/users`
- **Description**: Retrieve all active users (excluding deleted ones)
- **Response**: Array of user objects (without password hashes)

**Response Example:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john.doe@example.com",
    "username": "johndoe",
    "first_name": "John",
    "last_name": "Doe",
    "date_of_birth": "1990-01-01T00:00:00.000Z",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
]
```

### 3. Get Specific User
**GET** `/users/:id`
- **Description**: Retrieve a specific user by ID
- **Parameters**: `id` (UUID) - User's unique identifier

**Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john.doe@example.com",
  "username": "johndoe",
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "1990-01-01T00:00:00.000Z",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `404` - User not found
- `500` - Server error

### 4. Update User
**PUT** `/users/:id`
- **Description**: Update user information
- **Parameters**: `id` (UUID) - User's unique identifier
- **Optional Fields**: `email`, `username`, `first_name`, `last_name`, `date_of_birth`

**Request Body Example:**
```json
{
  "first_name": "Johnny",
  "last_name": "Smith",
  "email": "johnny.smith@example.com"
}
```

**Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "johnny.smith@example.com",
  "username": "johndoe",
  "first_name": "Johnny",
  "last_name": "Smith",
  "date_of_birth": "1990-01-01T00:00:00.000Z",
  "is_deleted": false,
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T11:45:00.000Z"
}
```

**Error Responses:**
- `404` - User not found
- `409` - Email or username already exists
- `500` - Server error

### 5. Update Password
**PATCH** `/users/:id/password`
- **Description**: Update user's password
- **Parameters**: `id` (UUID) - User's unique identifier
- **Required Fields**: `currentPassword`, `newPassword`

**Request Body Example:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newsecurepassword456"
}
```

**Response Example:**
```json
{
  "message": "Password updated successfully"
}
```

**Error Responses:**
- `400` - Missing required fields
- `401` - Current password is incorrect
- `404` - User not found
- `500` - Server error

### 6. Delete User
**DELETE** `/users/:id`
- **Description**: Soft delete a user (marks as deleted but doesn't remove from database)
- **Parameters**: `id` (UUID) - User's unique identifier

**Response Example:**
```json
{
  "message": "User deleted successfully"
}
```

**Error Responses:**
- `404` - User not found
- `500` - Server error

## Testing the API

### Using cURL

1. **Create a user:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

2. **Get all users:**
```bash
curl -X GET http://localhost:3000/users
```

3. **Get specific user (replace USER_ID with actual ID):**
```bash
curl -X GET http://localhost:3000/users/USER_ID
```

4. **Update user (replace USER_ID with actual ID):**
```bash
curl -X PUT http://localhost:3000/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Updated",
    "last_name": "Name"
  }'
```

5. **Update password (replace USER_ID with actual ID):**
```bash
curl -X PATCH http://localhost:3000/users/USER_ID/password \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "password123",
    "newPassword": "newpassword456"
  }'
```

6. **Delete user (replace USER_ID with actual ID):**
```bash
curl -X DELETE http://localhost:3000/users/USER_ID
```

### Using Postman or similar tools
Import these endpoints into your API testing tool using the examples above.

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with salt rounds of 10
- **Soft Deletes**: Users are marked as deleted rather than physically removed
- **Input Validation**: Email format validation and required field checks
- **Duplicate Prevention**: Prevents duplicate emails and usernames
- **Password Verification**: Current password verification for password updates

## Error Handling

All endpoints include comprehensive error handling:
- Input validation
- Database connection errors
- Duplicate constraint violations
- Not found scenarios
- Server errors

## Database Schema

The user table includes:
- `id` (UUID, Primary Key)
- `email` (Unique, Required)
- `username` (Unique, Required)
- `password_hash` (Required, Hashed)
- `first_name` (Optional)
- `last_name` (Optional)
- `date_of_birth` (Optional)
- `is_deleted` (Boolean, Default: false)
- `created_at` (Timestamp)
- `updated_at` (Timestamp) 