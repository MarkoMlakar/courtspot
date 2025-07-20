import api from './api';
import { ApiResponse, ApiError } from './api';

// User interface matching your backend model
export interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  created_at: string;
  updated_at: string;
}

// Registration request interface
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

// Login request interface
export interface LoginRequest {
  email: string;
  password: string;
}

// Authentication response interface
export interface AuthResponse {
  user: User;
  token?: string; // For future JWT implementation
}

// Auth service class
class AuthService {
  private readonly baseUrl = '/users';

  /**
   * Register a new user
   */
  async register(userData: RegisterRequest): Promise<ApiResponse<User>> {
    try {
      const response = await api.post<User>(this.baseUrl, userData);

      // Backend returns user object directly, not wrapped in ApiResponse
      return {
        data: response.data,
        success: true,
      };
    } catch (error: any) {
      // Handle specific error cases
      if (error.response?.status === 409) {
        throw new Error('User with this email or username already exists');
      }
      if (error.response?.status === 400) {
        throw new Error('Invalid registration data. Please check your input.');
      }
      throw new Error('Registration failed. Please try again.');
    }
  }

  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await api.post<User>('/users/login', credentials);

      // Backend returns user object directly, not wrapped in ApiResponse
      return {
        data: {
          user: response.data,
          token: undefined, // For future JWT implementation
        },
        success: true,
      };
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      }
      throw new Error('Login failed. Please try again.');
    }
  }

  /**
   * Logout user (placeholder for future implementation)
   */
  async logout(): Promise<void> {
    try {
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(userId: string): Promise<ApiResponse<User>> {
    try {
      const response = await api.get<ApiResponse<User>>(
        `${this.baseUrl}/${userId}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('User not found');
      }
      throw new Error('Failed to fetch user profile');
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    userData: Partial<User>
  ): Promise<ApiResponse<User>> {
    try {
      const response = await api.put<ApiResponse<User>>(
        `${this.baseUrl}/${userId}`,
        userData
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 409) {
        throw new Error('Email or username already exists');
      }
      if (error.response?.status === 404) {
        throw new Error('User not found');
      }
      throw new Error('Failed to update profile');
    }
  }

  /**
   * Change user password
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await api.patch<ApiResponse<{ message: string }>>(
        `${this.baseUrl}/${userId}/password`,
        { currentPassword, newPassword }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Current password is incorrect');
      }
      throw new Error('Failed to change password');
    }
  }
}

// Export singleton instance
export default new AuthService();
