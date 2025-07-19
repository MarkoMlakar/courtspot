import api from './api';
import { ApiResponse } from './api';
import { User } from './authService';

// User service class for non-auth user operations
class UserService {
  private readonly baseUrl = '/users';

  /**
   * Get all users (for admin purposes or user discovery)
   */
  async getAllUsers(): Promise<ApiResponse<User[]>> {
    try {
      const response = await api.get<ApiResponse<User[]>>(this.baseUrl);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Access denied');
      }
      throw new Error('Failed to fetch users');
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<ApiResponse<User>> {
    try {
      const response = await api.get<ApiResponse<User>>(
        `${this.baseUrl}/${userId}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('User not found');
      }
      throw new Error('Failed to fetch user');
    }
  }

  /**
   * Delete user account (soft delete)
   */
  async deleteUser(userId: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await api.delete<ApiResponse<{ message: string }>>(
        `${this.baseUrl}/${userId}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('User not found');
      }
      if (error.response?.status === 403) {
        throw new Error('Access denied');
      }
      throw new Error('Failed to delete user');
    }
  }

  /**
   * Search users by criteria (for future implementation)
   */
  async searchUsers(query: string): Promise<ApiResponse<User[]>> {
    try {
      const response = await api.get<ApiResponse<User[]>>(
        `${this.baseUrl}/search`,
        {
          params: { q: query },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to search users');
    }
  }
}

// Export singleton instance
export default new UserService();
