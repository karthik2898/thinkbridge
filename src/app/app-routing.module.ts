import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register',component: RegisterUserComponent},
  {path: 'dashboard',component: DashboardComponent,canActivate:[AuthGuard]},
  {path:'**',redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
