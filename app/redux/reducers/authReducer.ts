import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "~/redux";
import SecureStorage, { createSecureStorage, generateSecretKey } from "~/redux/secureStorage";
import { type AuthState } from "~/types/states";

let secureStorage: SecureStorage;

const initSecureStorage = (userId: string): SecureStorage => {
    const APP_SECRET = import.meta.env.VITE_APP_SECRET || 'phong808'
    const secretKey = generateSecretKey(userId, APP_SECRET)
    return createSecureStorage(secretKey)
}

const getInitialState = (): AuthState => {
    try {
        if (typeof window !== 'undefined') {
            const basicAuthInfo = localStorage.getItem('auth_basic')

            if (basicAuthInfo) {
                const { userId } = JSON.parse(basicAuthInfo)

                if (userId) {
                    secureStorage = initSecureStorage(userId)

                    const authData = secureStorage.getItem<AuthState>('auth_data')

                    if (authData && authData.token) {
                        return authData
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error initialing data from localStorage:', error)
    }
    return {
        isLogged: false,
        token: '',
        userId: undefined
    }
}

const initialState = getInitialState()

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string, userId: string }>) => {
            const { token, userId } = action.payload

            state.isLogged = true
            state.token = token
            state.userId = userId

            if (typeof window !== 'undefined') {
                localStorage.setItem('auth_basic', JSON.stringify({ userId }))

                secureStorage = initSecureStorage(userId)

                secureStorage.setItem('auth_data', {
                    isLogged: true,
                    token,
                    userId
                });
            }
        },

        logout: (state) => {
            state.isLogged = false;
            state.token = '';
            state.userId = undefined;

            if (typeof window !== 'undefined') {
                if (secureStorage) {
                    secureStorage.removeItem('auth_data')
                }
                localStorage.removeItem('auth_basic')
            }
        },

        updateToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload

            if (typeof window !== 'undefined') {
                if (secureStorage && state.userId) {
                    secureStorage.setItem('auth_data', {
                        isLogged: state.isLogged,
                        token: action.payload,
                        userId: state.userId
                    });
                }
            }
        }
    }
})

export const { login, logout, updateToken } = authSlice.actions

export default authSlice.reducer

export const selectIsLogged = (state: RootState) => state.auth.isLogged;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUserId = (state: RootState) => state.auth.userId;