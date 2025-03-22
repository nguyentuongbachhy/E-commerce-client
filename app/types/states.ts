export interface AuthState {
    isLogged: boolean,
    token: string,
    userId?: string
}