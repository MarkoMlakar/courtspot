import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from 'mobx';
import { authService, User, RegisterRequest } from '../services';

// Authentication state interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

class AuthStore {
  // Observable state
  user: User | null = null;
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      // Observables
      user: observable,
      isAuthenticated: observable,
      isLoading: observable,
      error: observable,

      // Actions
      setUser: action,
      setLoading: action,
      setError: action,
      clearError: action,
      logout: action,
      register: action,

      // Computed
      currentUser: computed,
      hasError: computed,
    });

    // Initialize auth state from localStorage if available
    this.initializeAuth();
  }

  // Computed properties
  get currentUser(): User | null {
    return this.user;
  }

  get hasError(): boolean {
    return this.error !== null;
  }

  // Actions
  setUser = (user: User | null) => {
    this.user = user;
    this.isAuthenticated = !!user;

    // Persist to localStorage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  };

  setLoading = (loading: boolean) => {
    this.isLoading = loading;
  };

  setError = (error: string | null) => {
    this.error = error;
  };

  clearError = () => {
    this.error = null;
  };

  logout = () => {
    runInAction(() => {
      this.user = null;
      this.isAuthenticated = false;
      this.error = null;
    });

    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');

    // Call logout service
    authService.logout();
  };

  // Initialize auth state from localStorage
  initializeAuth = () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.setUser(user);
      }
    } catch (error) {
      console.error('Failed to initialize auth state:', error);
      localStorage.removeItem('user');
    }
  };

  // Register new user
  register = async (userData: RegisterRequest): Promise<User | null> => {
    this.setLoading(true);
    this.clearError();

    try {
      const response = await authService.register(userData);

      runInAction(() => {
        this.setUser(response.data);
        this.setLoading(false);
      });

      return response.data;
    } catch (error: any) {
      runInAction(() => {
        this.setError(error.message || 'Registration failed');
        this.setLoading(false);
      });

      return null;
    }
  };

  // Login user (placeholder for future implementation)
  login = async (email: string, password: string): Promise<User | null> => {
    this.setLoading(true);
    this.clearError();

    try {
      const response = await authService.login({ email, password });

      runInAction(() => {
        this.setUser(response.data.user);
        this.setLoading(false);
      });

      return response.data.user;
    } catch (error: any) {
      runInAction(() => {
        this.setError(error.message || 'Login failed');
        this.setLoading(false);
      });

      return null;
    }
  };

  // Update user profile
  updateProfile = async (
    userId: string,
    userData: Partial<User>
  ): Promise<User | null> => {
    this.setLoading(true);
    this.clearError();

    try {
      const response = await authService.updateProfile(userId, userData);

      runInAction(() => {
        this.setUser(response.data);
        this.setLoading(false);
      });

      return response.data;
    } catch (error: any) {
      runInAction(() => {
        this.setError(error.message || 'Profile update failed');
        this.setLoading(false);
      });

      return null;
    }
  };

  // Get current user profile
  getCurrentUser = async (userId: string): Promise<User | null> => {
    this.setLoading(true);
    this.clearError();

    try {
      const response = await authService.getCurrentUser(userId);

      runInAction(() => {
        this.setUser(response.data);
        this.setLoading(false);
      });

      return response.data;
    } catch (error: any) {
      runInAction(() => {
        this.setError(error.message || 'Failed to fetch user profile');
        this.setLoading(false);
      });

      return null;
    }
  };
}

export default new AuthStore();
