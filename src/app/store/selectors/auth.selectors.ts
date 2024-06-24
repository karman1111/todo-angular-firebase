import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../../shared/models/auth.models";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthErrors = createSelector(
    selectAuthState,
    (state: AuthState) => state.error
)

export const selectAuthAccessToken = createSelector(
    selectAuthState,
    (state: AuthState) => state.idToken
)