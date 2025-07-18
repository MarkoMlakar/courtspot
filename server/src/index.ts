import express, { Request, Response } from "express";
import { checkConnection } from "./database/connection";
import './database/objection'; // Initialize Objection
import { UserModel } from "./models/User";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

// Health check endpoint
app.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'Server is running!' });
});

// CREATE - Create a new user
app.post('/users', async (req: Request, res: Response) => {
  try {
    const { email, username, password, first_name, last_name, date_of_birth } = req.body;
    
    // Validate required fields
    if (!email || !username || !password) {
      res.status(400).json({ error: 'Email, username, and password are required' });
      return;
    }

    // Check if user already exists
    const existingUser = await UserModel.query()
      .where('email', email)
      .orWhere('username', username)
      .where('is_deleted', false)
      .first();

    if (existingUser) {
      res.status(409).json({ error: 'User with this email or username already exists' });
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user - pass date as string, model hooks will convert to Date
    const newUser = await UserModel.query().insert({
      id: uuidv4(),
      email,
      username,
      password_hash: passwordHash,
      first_name: first_name || null,
      last_name: last_name || null,
      date_of_birth: date_of_birth || null
    });

    // Return user without password hash
    const { password_hash, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// READ - Get all users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await UserModel.query()
      .select('id', 'email', 'username', 'first_name', 'last_name', 'date_of_birth', 'created_at', 'updated_at')
      .where('is_deleted', false);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// READ - Get a specific user by ID
app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const user = await UserModel.query()
      .select('id', 'email', 'username', 'first_name', 'last_name', 'date_of_birth', 'created_at', 'updated_at')
      .where('id', id)
      .where('is_deleted', false)
      .first();

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// UPDATE - Update a specific user
app.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, username, first_name, last_name, date_of_birth } = req.body;

    // Check if user exists
    const existingUser = await UserModel.query()
      .where('id', id)
      .where('is_deleted', false)
      .first();

    if (!existingUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Check if email or username is being changed and if it conflicts with existing users
    if (email && email !== existingUser.email) {
      const emailExists = await UserModel.query()
        .where('email', email)
        .where('id', '!=', id)
        .where('is_deleted', false)
        .first();

      if (emailExists) {
        res.status(409).json({ error: 'Email already exists' });
        return;
      }
    }

    if (username && username !== existingUser.username) {
      const usernameExists = await UserModel.query()
        .where('username', username)
        .where('id', '!=', id)
        .where('is_deleted', false)
        .first();

      if (usernameExists) {
        res.status(409).json({ error: 'Username already exists' });
        return;
      }
    }

    // Prepare update data - convert existing Date to string if needed
    const updateData: any = {
      email: email || existingUser.email,
      username: username || existingUser.username,
      first_name: first_name !== undefined ? first_name : existingUser.first_name,
      last_name: last_name !== undefined ? last_name : existingUser.last_name
    };

    // Handle date_of_birth - ensure it's passed as string
    if (date_of_birth !== undefined) {
      updateData.date_of_birth = date_of_birth;
    } else if (existingUser.date_of_birth) {
      // Convert existing Date to string format for the update
      updateData.date_of_birth = existingUser.date_of_birth.toISOString().split('T')[0];
    } else {
      updateData.date_of_birth = null;
    }

    // Update user
    const updatedUser = await UserModel.query()
      .patchAndFetchById(id, updateData);

    // Return user without password hash
    const { password_hash, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// UPDATE - Update user password
app.patch('/users/:id/password', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({ error: 'Current password and new password are required' });
      return;
    }

    // Get user with password hash
    const user = await UserModel.query()
      .where('id', id)
      .where('is_deleted', false)
      .first();

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Current password is incorrect' });
      return;
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update password
    await UserModel.query()
      .patch({ password_hash: newPasswordHash })
      .where('id', id);

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Failed to update password' });
  }
});

// DELETE - Soft delete a user
app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await UserModel.query()
      .where('id', id)
      .where('is_deleted', false)
      .first();

    if (!existingUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Soft delete user
    await UserModel.query()
      .patch({ is_deleted: true })
      .where('id', id);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Test database connection before starting the server
const startServer = async () => {
  try {
    // Check database connection
    const isConnected = await checkConnection();
    if (!isConnected) {
      throw new Error('Failed to connect to database');
    }

    // Start the server
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
