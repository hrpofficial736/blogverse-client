export interface LoginResponse {
    authenticated: boolean;
    data?: {
        message: string;
        token: string;
        username: string;
        isProfileCompleted: boolean;
    };
    error?: string;
}