import { Request, Response } from "express";
import { UserModel } from "../models/User";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export class UserController {
  // Create a new user
  static async createUser(req: Request, res: Response) {
    try {
      const {
        email,
        username,
        password,
        first_name,
        last_name,
        date_of_birth,
      } = req.body;

      // Validate required fields
      if (!email || !username || !password) {
        return res
          .status(400)
          .json({ error: "Email, username, and password are required" });
      }

      // Check if user already exists
      const existingUser = await UserModel.query()
        .where("email", email)
        .orWhere("username", username)
        .where("is_deleted", false)
        .first();

      if (existingUser) {
        return res
          .status(409)
          .json({ error: "User with this email or username already exists" });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = await UserModel.query().insert({
        id: uuidv4(),
        email,
        username,
        password_hash: passwordHash,
        first_name: first_name || null,
        last_name: last_name || null,
        date_of_birth: date_of_birth || null,
      });

      // Return user without password hash
      const { password_hash, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
      return;
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  // Get all users
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.query()
        .select(
          "id",
          "email",
          "username",
          "first_name",
          "last_name",
          "date_of_birth",
          "created_at",
          "updated_at"
        )
        .where("is_deleted", false);
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  // Get a specific user by ID
  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await UserModel.query()
        .select(
          "id",
          "email",
          "username",
          "first_name",
          "last_name",
          "date_of_birth",
          "created_at",
          "updated_at"
        )
        .where("id", id)
        .where("is_deleted", false)
        .first();

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  }

  // Update a specific user
  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email, username, first_name, last_name, date_of_birth } =
        req.body;

      // Check if user exists
      const existingUser = await UserModel.query()
        .where("id", id)
        .where("is_deleted", false)
        .first();

      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if email or username is being changed and if it conflicts with existing users
      if (email && email !== existingUser.email) {
        const emailExists = await UserModel.query()
          .where("email", email)
          .where("id", "!=", id)
          .where("is_deleted", false)
          .first();

        if (emailExists) {
          return res.status(409).json({ error: "Email already exists" });
        }
      }

      if (username && username !== existingUser.username) {
        const usernameExists = await UserModel.query()
          .where("username", username)
          .where("id", "!=", id)
          .where("is_deleted", false)
          .first();

        if (usernameExists) {
          return res.status(409).json({ error: "Username already exists" });
        }
      }

      // Prepare update data
      const updateData: any = {
        email: email || existingUser.email,
        username: username || existingUser.username,
        first_name:
          first_name !== undefined ? first_name : existingUser.first_name,
        last_name: last_name !== undefined ? last_name : existingUser.last_name,
      };

      // Handle date_of_birth
      if (date_of_birth !== undefined) {
        updateData.date_of_birth = date_of_birth;
      } else if (existingUser.date_of_birth) {
        updateData.date_of_birth = existingUser.date_of_birth
          .toISOString()
          .split("T")[0];
      } else {
        updateData.date_of_birth = null;
      }

      // Update user
      const updatedUser = await UserModel.query().patchAndFetchById(
        id,
        updateData
      );

      // Return user without password hash
      const { password_hash, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  }

  // Update user password
  static async updatePassword(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res
          .status(400)
          .json({ error: "Current password and new password are required" });
      }

      // Get user with password hash
      const user = await UserModel.query()
        .where("id", id)
        .where("is_deleted", false)
        .first();

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password_hash
      );
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }

      // Hash new password
      const newPasswordHash = await bcrypt.hash(newPassword, 10);

      // Update password
      await UserModel.query()
        .patch({ password_hash: newPasswordHash })
        .where("id", id);

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ error: "Failed to update password" });
    }
  }

  // Soft delete a user
  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if user exists
      const existingUser = await UserModel.query()
        .where("id", id)
        .where("is_deleted", false)
        .first();

      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Soft delete user
      await UserModel.query().patch({ is_deleted: true }).where("id", id);

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  }
}
