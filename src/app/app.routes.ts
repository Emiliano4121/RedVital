import { Routes } from '@angular/router';
import { Search } from './pages/Busqueda/search/search';
import { Home } from './pages/Inicio/home/home';

export const routes: Routes = [

    { path: '', component: Home, title: 'RedVital - Inicio' },
    {path: 'busqueda', component: Search},
    {path: '', redirectTo: 'busqueda', pathMatch: 'full' }
];
