import { http } from '@/core/api/http';
import { LoginEmailRequest, LoginGoogleRequest, LoginFacebookRequest, RefreshTokenRequest, RefreshTokenResponse, LoginResponse } from '@/features/auth/types/auth';

export const authApi = {
    login_email: (data: LoginEmailRequest) =>
        http.post<LoginResponse>('/api/v1/authentication/sign-in-management', data),

    login_google: (data: LoginGoogleRequest) =>
        http.post<LoginResponse>('/api/v1/authentication/sign-in-google-management', data),


    login_facebook: (data: LoginFacebookRequest) =>
        http.post<LoginResponse>('/api/v1/authentication/sign-in-facebook-management', data),


    refresh_token: (data: RefreshTokenRequest) =>
        http.post<RefreshTokenResponse>('/api/v1/authentication/refresh-token', { data }),


};