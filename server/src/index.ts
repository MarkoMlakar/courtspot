import express from "express";
import { checkConnection } from "./database/connection";
import './database/objection'; // Initialize Objection
import { UserModel } from "./models/User";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Test user endpoints
app.post('/test/users', async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash('test123', 10);
    const newUser = await UserModel.query().insert({
      id: uuidv4(),
      email: 'test@example.com',
      username: 'testuser',
      password_hash: passwordHash,
      first_name: 'Test',
      last_name: 'User'
    });
    res.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/test/users', async (req, res) => {
  try {
    const users = await UserModel.query()
      .select('id', 'email', 'username', 'first_name', 'last_name', 'created_at')
      .where('is_deleted', false);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
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
