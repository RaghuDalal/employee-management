import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { authGuard } from './core/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { EmpListingComponent } from './pages/emp-listing/emp-listing.component';
import { EmpFormComponent } from './pages/emp-form/emp-form.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
        children: [
          { path: '', redirectTo: 'employees', pathMatch: 'full' },
          { path: 'employees', component: EmpListingComponent },
          { path: 'add/new', component: EmpFormComponent },
          { path: 'edit/:empId', component: EmpFormComponent },
          { path: 'search', component: SearchComponent },
        ]
      },
    ]
  },
  { path: '**', redirectTo: '/login' }
];
