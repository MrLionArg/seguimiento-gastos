import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent }  from './pages/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];