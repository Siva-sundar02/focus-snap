import { Routes } from '@angular/router';

import { LoginComponent }
from './pages/login/login';

import { Dashboard }
from './pages/dashboard/dashboard';

import { Expenses }
from './pages/expenses/expenses';

import { Register }
from './pages/register/register';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'dashboard',
    component: Dashboard,
    runGuardsAndResolvers: 'always'
  },

  {
    path: 'expenses',
    component: Expenses
  }
];