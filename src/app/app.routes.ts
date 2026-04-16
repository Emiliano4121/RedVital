// app.routes.ts
import { Routes } from '@angular/router';
import { Home } from './pages/Inicio/home/home';
import { Search } from './pages/Busqueda/search/search';
import { PacienteDashboard } from './pages/Dashboard/paciente/paciente';
import { EnfereroDashboard } from './pages/Dashboard/enfermero/enfermero';
import { AboutUs } from './pages/Inicio/about-us/about-us';

export const routes: Routes = [
  { path: '',                    component: Home,              title: 'RedVital - Inicio', data: { hideNavbar: false }          },
  { path: 'busqueda',            component: Search,            title: 'RedVital - Búsqueda',  data: { hideNavbar: false }        },
  { path: 'dashboard/paciente',  component: PacienteDashboard, title: 'RedVital - Mi Dashboard', data: { hideNavbar: true } },
  { path: 'dashboard/enfermero', component: EnfereroDashboard, title: 'RedVital - Panel Enfermero', data: { hideNavbar: true } },
  { path: 'sobre-nosotros', component: AboutUs, data: { hideNavbar: false } },
  // Cuando integres auth real, agrega guards aquí:
  // { path: 'dashboard/paciente', component: PacienteDashboard, canActivate: [authGuard('paciente')] },
  { path: '**', redirectTo: '' }
];
// import { provideRouter, withHashLocation } from '@angular/router';

// provideRouter(routes, withHashLocation());