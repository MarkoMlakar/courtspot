import { makeAutoObservable, runInAction } from "mobx";
import { User, UserSignOutResponse } from "../models/user";
import { supabase } from "../shared/database/supabaseClient";
import { UserRegistration, UserRegistrationResponse } from "../models/user";

class AuthStore {
    user: User | null = null;
    isLoading: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.listenToAuthChanges();
        this.fetchCurrentUser();
    }

    get isAuthenticated(): boolean {
        return this.user !== null && this.user.isEmailVerified;
    }

    async register(registration: UserRegistration): Promise<UserRegistrationResponse> {
        this.isLoading = true;
        this.error = null;
        const { email, password, userName, firstName, lastName, dateOfBirth } = registration;   
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            this.error = error.message;
            return { user: null, error: error.message };
        }
        if (data.user) {
            const { error: insertError } = await supabase
                .from('users')
                .insert([{
                    id: data.user.id,
                    email,
                    userName,
                    firstName,
                    lastName,
                    dateOfBirth,
                }]);
            if (insertError) {
                this.error = insertError.message;
                return { user: null, error: insertError.message };
            }
        }
        this.user = data.user ? {
            id: data.user.id,
            email: data.user.email ?? '',
            createdAt: data.user.created_at ? new Date(data.user.created_at) : new Date(),
            updatedAt: data.user.updated_at ? new Date(data.user.updated_at) : new Date(),
            isEmailVerified: !!data.user.email_confirmed_at,
        } : null;
        return { user: this.user, error: null };
    }

    async signOut(): Promise<UserSignOutResponse> {
        const { error } = await supabase.auth.signOut();
        if (error) {
            return { error: error.message };
        }
        this.user = null;
        return { error: null };
    }

    async login(email: string, password: string): Promise<UserRegistrationResponse> {
        this.isLoading = true;
        this.error = null;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        this.isLoading = false;
        if (error) {
            this.error = error.message;
            return { user: null, error: error.message };
        }
        this.user = data.user ? {
            id: data.user.id,
            email: data.user.email ?? '',
            createdAt: data.user.created_at ? new Date(data.user.created_at) : new Date(),
            updatedAt: data.user.updated_at ? new Date(data.user.updated_at) : new Date(),
            isEmailVerified: !!data.user.email_confirmed_at,
        } : null;
        return { user: this.user, error: null };
    }

    listenToAuthChanges() {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                this.user = {
                    id: session.user.id,
                    email: session.user.email ?? '',
                    createdAt: session.user.created_at ? new Date(session.user.created_at) : new Date(),
                    updatedAt: session.user.updated_at ? new Date(session.user.updated_at) : new Date(),
                    isEmailVerified: !!session.user.email_confirmed_at,
                };
                if (this.user.isEmailVerified) {
                    const {error} = await supabase.from('users').insert({
                        id: this.user.id,
                        email: this.user.email,
                        first_name: "TestMarko",
                        last_name: "TestMlakar",
                        username: "TestUsername",
                        date_of_birth: new Date("1990-01-01"),
                        created_at: this.user.createdAt,
                        updated_at: this.user.updatedAt,
                    })
                    if (error) {
                        console.error('Error inserting user:', error);
                    } else {
                        console.log("User inserted successfully");
                    }
                }
            } else {
                this.user = null;
            }
        });
    }

    async fetchCurrentUser() {
        const { data, error } = await supabase.auth.getUser();
        runInAction(() => {
            if (data.user) {
                this.user = {
                    id: data.user.id,
                    email: data.user.email ?? '',
                    createdAt: data.user.created_at ? new Date(data.user.created_at) : new Date(),
                    updatedAt: data.user.updated_at ? new Date(data.user.updated_at) : new Date(),
                    isEmailVerified: !!data.user.email_confirmed_at,
                };
            } else {
                this.user = null;
            }
        });
    }
}

export default new AuthStore();

