import { createReducer, on } from "@ngrx/store";
import { AuthState } from "../../shared/models/auth.models";
import * as AuthActions from '../actions/auth.actions';


export const initAuthState: AuthState = {
    error: null,
    email: "",
    idToken: localStorage.getItem('access-token') || '', 
    refreshToken: "",
    expiresIn: "",
    localId: "",
}

export const authReducer = createReducer(
    initAuthState,
    on(AuthActions.login, (state) => ({
        ...state, 
    })),
    on(AuthActions.loginSuccess, (state, {response}) => ({
        ...state, 
        ...response, 
    })),
    on(AuthActions.loginFailure, (state, {error}) => ({
        ...state,
        error,
    })),
    on(AuthActions.register, (state) => ({
        ...state,
    })),
    on(AuthActions.registerSuccess, (state, {response}) => ({
        ...state, 
        ...response,
    })),
    on(AuthActions.registerFailure, (state, {error}) => ({
        ...state,
        error,
    })),
    on(AuthActions.logout, (state) => ({
        ...state,
        email: '',
        idToken: '',
        refreshToken: '',
        expiresIn: '',
        localId: '',
        error: null
    }))
)