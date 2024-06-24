import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'
import { LogoComponent } from '../logo.component';
import { Store } from '@ngrx/store';
import { AuthState } from '../../models/auth.models';
import * as AuthActions from '../../../store/actions/auth.actions'

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, LogoComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  constructor(private store: Store<{ auth: AuthState }>) {}

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
