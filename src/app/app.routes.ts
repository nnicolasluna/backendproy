import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EvaluationListComponent } from './components/evaluation-list/evaluation-list.component';
import { EvaluationDetailComponent } from './components/evaluation-detail/evaluation-detail.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'evaluaciones', component: EvaluationListComponent },
    { path: 'evaluaciones/:id', component: EvaluationDetailComponent },
    { path: '**', redirectTo: '' }
];
