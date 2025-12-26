export type UserRole = "Admin" | "Moderator";

export interface LoginEmailRequest {
    email: string;
    password: string;
    role: UserRole;
}

export interface LoginGoogleRequest {
    token: string;
}

export interface LoginFacebookRequest {
    token: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        role: UserRole;
    };
}

export interface RefreshTokenRequest {
    token: string;
}

export interface RefreshTokenResponse {
    token: string;
}