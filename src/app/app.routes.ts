import { Routes } from '@angular/router';
import { Search } from './pages/Busqueda/search/search';

export const routes: Routes = [
    {path: 'busqueda', component: Search},
    {path: '', redirectTo: 'busqueda', pathMatch: 'full' }
];
