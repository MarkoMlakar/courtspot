export interface User {
    id: string;
    email: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt?: Date;
    isEmailVerified: boolean;
    dateOfBirth?: Date;
}

export interface UserRegistration {
    email: string;
    password: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
}

export interface UserRegistrationResponse {
    user: User | null;
    error: string | null;
}

export interface UserSignOutResponse {
    error: string | null;
}
