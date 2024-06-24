import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState } from "../../shared/models/auth.models";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { selectAuthAccessToken } from "../../store/selectors/auth.selectors";
import { catchError, switchMap, take } from "rxjs/operators";
import { logout } from "../../store/actions/auth.actions";

@Injectable({ providedIn: "root" })
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<{ auth: AuthState }>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(selectAuthAccessToken).pipe(
            take(1),
            switchMap(token => {
                if (token) {
                    const modifiedRequest = req.clone({
                        params: new HttpParams().set('auth', token)
                    });
                    return next.handle(modifiedRequest);
                }
                return next.handle(req);
            }),
            catchError((error: HttpErrorResponse) => {
                if(error.status == 401) {
                    this.store.dispatch(logout());
                }
                return throwError(error);
            })
        );
    }
}
