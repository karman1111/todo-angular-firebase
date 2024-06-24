import { Routes } from '@angular/router';
import { TasksComponent } from './features/tasks/tasks.component';
import { LoginComponent } from './features/login/login.component';
import { AppContainerComponent } from './shared/components/container/app-container.component'
import { AuthenticationGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', 
        component: AppContainerComponent, 
        canActivate: [AuthenticationGuard],
        children: [
            { path: '', component: TasksComponent },
        ]
    }
];
