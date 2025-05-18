import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { TOKEN_NAME_IN_STORAGE } from '@/constants/api.constant';
import appConfig from '@/configs/app.config';
import cookiesStorage from '@/hooks/cookiesStorage';
import type { User } from '@/@types/auth';

export interface Session {
    signedIn: boolean;
}

export interface AuthState {
    session: Session;
    user: User;
}

const initialState: AuthState = {
    session: {
        signedIn: false,
    },
    user: {
        avatar: '',
        userName: '',
        email: '',
        authority: [],
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSessionSignedIn(state, action: PayloadAction<boolean>) {
            state.session.signedIn = action.payload;
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = { ...state.user, ...action.payload };
        },
        resetUser(state) {
            state.user = initialState.user;
        },
    },
});

// Token utility
export const useToken = () => {
    const storage = (() => {
        switch (appConfig.accessTokenPersistStrategy) {
            case 'localStorage':
                return localStorage;
            case 'sessionStorage':
                return sessionStorage;
            default:
                return cookiesStorage;
        }
    })();

    const setToken = (token: string) => {
        storage.setItem(TOKEN_NAME_IN_STORAGE, token);
    };

    return {
        setToken,
        token: storage.getItem(TOKEN_NAME_IN_STORAGE),
    };
};

export const { setSessionSignedIn, setUser, resetUser } = authSlice.actions;
export default authSlice.reducer;