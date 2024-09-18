import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'sobre-mi', loadComponent: () => import('./componentes/about-me/about-me.component').then(c => c.AboutMeComponent)},
    { 
        path: 'juegos', loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosModule)        
    },
    { path: 'inicio', loadComponent: () => import('./componentes/home/home.component').then(c => c.HomeComponent)},


];
