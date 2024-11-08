import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { authGuard } from './core/auth.guard';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '',
        component: MainComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
        ]
      },
      { path: '**', redirectTo: '/login' }
];
