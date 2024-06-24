
import { AuthRequest, AuthResponse } from '../../shared/models/auth.models';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
    '[Auth] Login',
    props<{request: AuthRequest}>()
)
export const loginSuccess = createAction(
    '[Auth] Login success', 
    props<{response: AuthResponse}>()
)
export const loginFailure = createAction(
    '[Auth] Login failure',
    props<{error:any}>()
)
export const register = createAction(
    '[Auth] Register',
    props<{request: AuthRequest}>()
)
export const registerSuccess = createAction(
    '[Auth] Register success',
    props<{response: AuthResponse}>()
)
export const registerFailure = createAction(
    '[Auth] Register failure',
    props<{error: any}>()
)
export const logout = createAction(
    '[Auth] Logout'
)