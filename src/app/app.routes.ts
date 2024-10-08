import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'sobre-mi',
    loadComponent: () =>
      import('./componentes/about-me/about-me.component').then(
        (c) => c.AboutMeComponent
      ),
  },
  {
    path: 'juegos',
    loadChildren: () =>
      import('./juegos/juegos.module').then((m) => m.JuegosModule),
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./componentes/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./componentes/chat/chat.component').then((c) => c.ChatComponent),
  },
  {
    path: 'resultados',
    loadComponent: () =>
      import('./componentes/resultados/resultados.component').then((c) => c.ResultadosComponent),
  },
];
