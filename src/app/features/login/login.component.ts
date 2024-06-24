import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRequest, AuthState } from '../../shared/models/auth.models';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.actions'
import { Subscription } from 'rxjs';
import { selectAuthErrors } from '../../store/selectors/auth.selectors';
import { selectGlobalLoadingState } from '../../store/selectors/global.selects';
import { LoadingComponent } from '../../shared/components/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  isRegister:boolean = false;
  error: string | undefined;
  loading: boolean = false;

  private errorSub!: Subscription;
  private loadingSub!: Subscription;

  usersForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(private store: Store<{ auth: AuthState }>) {
    this.errorSub = this.store.select(selectAuthErrors).subscribe(error => {
      if(error == null)
        return
      if(error.error?.error?.errors == null || error.error?.error?.errors?.length < 1) {
        this.error = "Something went wrong, please try later"
      } 
      switch(error.error?.error?.errors[0].message) {
        case 'INVALID_LOGIN_CREDENTIALS': this.error = 'Invalid credentials for this user'; break;
        case 'USER_NOT_FOUND': this.error = 'User not found'; break;
        default: this.error = 'Undefined error, try again'
      }
    });

    this.loadingSub = this.store.select(selectGlobalLoadingState)
      .subscribe(loading => {this.loading = loading})
  }
  
  ngOnDestroy() : void {
    this.errorSub.unsubscribe();
    this.loadingSub.unsubscribe();
  }

  onSubmit(){
    const request = this.usersForm.value as AuthRequest;
    if(this.isRegister) {
      this.store.dispatch(AuthActions.register({request}))
    }else{
      this.store.dispatch(AuthActions.login({request}))
    }
    this.usersForm.reset();
  }

  toggleMode() {
    this.isRegister = !this.isRegister;
  }
}
