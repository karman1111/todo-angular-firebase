import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthState } from "../../shared/models/auth.models";
import { Observable, map, take } from "rxjs";
import { selectAuthAccessToken } from "../../store/selectors/auth.selectors";
import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class AuthenticationGuard implements CanActivate {
    constructor(private store: Store<{ auth: AuthState }>, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.store.select(selectAuthAccessToken).pipe(
            take(1),
            map(token => {
                if(token) {
                    return true;
                }else {
                    this.router.navigate(['/login'])
                    return false;
                }
            })
        )
    }

}