import { createContext } from 'react';
import type {
    SignInCredential,
    SignUpCredential,
    AuthResult,
    User,
    OauthSignInCallbackPayload,
} from '@/@types/auth';

type Auth = {
    authenticated: boolean;
    user: User;
    signIn: (values: SignInCredential) => Promise<AuthResult>;
    signUp: (values: SignUpCredential) => Promise<AuthResult>;
    signOut: () => void;
    oAuthSignIn: (
        callback: (payload: OauthSignInCallbackPayload) => void,
    ) => void;
};

const defaultFunctionPlaceHolder = (): Promise<AuthResult> => {
    return Promise.resolve({
        status: 'failed',
        message: 'Not implemented',
    });
};

const defaultOAuthSignInPlaceHolder = (
    callback: (payload: OauthSignInCallbackPayload) => void,
): void => {
    callback({
        onSignIn: () => { },
        redirect: () => { },
    });
};

const AuthContext = createContext<Auth>({
    authenticated: false,
    user: { avatar: '', userName: '', email: '', authority: [] },
    signIn: defaultFunctionPlaceHolder,
    signUp: defaultFunctionPlaceHolder,
    signOut: () => { },
    oAuthSignIn: defaultOAuthSignInPlaceHolder,
});

export default AuthContext;