
export interface AuthRequest {
    password: string,
    email: string,
}

export interface AuthResponse {
    email: string,
    idToken: string,
    refreshToken: string, 
    expiresIn: string,
    localId: string,
    registered?: boolean
}

export interface AuthState extends AuthResponse {
    error: any,
}