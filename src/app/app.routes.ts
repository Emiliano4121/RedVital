import { Routes } from '@angular/router';
import { Home } from './pages/Inicio/home/home';
import { Search } from './pages/Busqueda/search/search';
import { PacienteDashboard } from './pages/Dashboard/paciente/paciente';
import { EnfereroDashboard } from './pages/Dashboard/enfermero/enfermero';
export const routes: Routes = [
  { path: '',                    component: Home,              title: 'RedVital - Inicio'          },
  { path: 'busqueda',            component: Search,            title: 'RedVital - Búsqueda'        },
  { path: 'dashboard/paciente',  component: PacienteDashboard, title: 'RedVital - Mi Dashboard'    },
  { path: 'dashboard/enfermero', component: EnfereroDashboard, title: 'RedVital - Panel Enfermero' },
  // Cuando integres auth real, agrega guards aquí:
  // { path: 'dashboard/paciente', component: PacienteDashboard, canActivate: [authGuard('paciente')] },
  { path: '**', redirectTo: '' }
];
import { provideRouter, withHashLocation } from '@angular/router';

provideRouter(routes, withHashLocation());