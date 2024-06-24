import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from "../../core/services/auth.service";
import { Router } from "@angular/router";
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from "rxjs";
import { Store } from "@ngrx/store";
import * as GlobalAction from '../actions/global.actions' 

@Injectable({providedIn:"root"})
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private store: Store
    ) {}
    
    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.login),
        tap(() => this.store.dispatch(GlobalAction.setLoading({loading: true}))),
        mergeMap(action => this.authService.login(action.request).pipe(
            map(response => {
                this.store.dispatch(GlobalAction.setLoading({loading: false}))
                return AuthActions.loginSuccess({ response })
            }),
            catchError(error => {
                this.store.dispatch(GlobalAction.setLoading({loading: false}))
                return of(AuthActions.loginFailure({ error }))
            })
        ))
    ));

    register$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.register),
        tap(() => this.store.dispatch(GlobalAction.setLoading({loading: true}))),
        mergeMap(action => this.authService.register(action.request).pipe(
            map(response => {
                this.store.dispatch(GlobalAction.setLoading({loading: false}))
                return AuthActions.registerSuccess({response})
            }),
            catchError(error => {
                this.store.dispatch(GlobalAction.setLoading({loading: false}))
                return of(AuthActions.registerFailure({error}))
            })
        ))
    ));
    
    loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(action => {
            localStorage.setItem("access-token", action.response.idToken);
            this.router.navigate(['/']);
        })
    ), {dispatch: false})

    registerSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(action => {
            localStorage.setItem("access-token", action.response.idToken);
            this.router.navigate(['/']);
        })
    ), {dispatch: false})

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
            localStorage.removeItem("access-token");
            this.router.navigate(['/login']);
        })
    ), {dispatch: false})
}