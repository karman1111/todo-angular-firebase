import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthRequest, AuthResponse } from "../../shared/models/auth.models";


@Injectable({providedIn: "root"})
export class AuthService {
    constructor(
        private http: HttpClient
    ){}

    login (request: AuthRequest) {
        return this.http.post<AuthResponse>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXNyeDMzpsWfma5zTzmg9kHu9Svvs1I4g",
            {...request, returnSecureToken: true}
        )
    } 

    register (request: AuthRequest) {
        return this.http.post<AuthResponse>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXNyeDMzpsWfma5zTzmg9kHu9Svvs1I4g",
            {...request, returnSecureToken: true}
        )
    }
}