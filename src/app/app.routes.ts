import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EvaluationListComponent } from './components/evaluation-list/evaluation-list.component';
import { EvaluationDetailComponent } from './components/evaluation-detail/evaluation-detail.component';
import { CallListComponent } from './components/call-list/call-list.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'evaluaciones', component: EvaluationListComponent, canActivate: [authGuard] },
    { path: 'evaluaciones/:id', component: EvaluationDetailComponent, canActivate: [authGuard] },
    { path: 'evaluaciones/:id/llamadas', component: CallListComponent, canActivate: [authGuard] },

    // User Management Routes
    { path: 'usuarios', component: UserListComponent, canActivate: [authGuard] },
    { path: 'usuarios/nuevo', component: UserFormComponent, canActivate: [authGuard] },
    { path: 'usuarios/:id/editar', component: UserFormComponent, canActivate: [authGuard] },

    { path: '**', redirectTo: '' }
];
