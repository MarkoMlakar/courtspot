import express from "express";
import { checkConnection } from "./database/connection";
import './database/objection'; // Initialize Objection
import routes from './routes';

const app = express();
app.use(express.json());

// Mount all routes
app.use('/', routes);

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
