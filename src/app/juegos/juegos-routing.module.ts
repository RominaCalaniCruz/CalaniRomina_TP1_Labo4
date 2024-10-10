import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { SlotComponent } from './slot/slot.component';
import { CartasComponent } from './cartas/cartas.component';
import { estaLogueadoGuard } from '../guards/esta-logueado.guard';

const routes: Routes = [
  {
    path: '',
    component: JuegosComponent
  },
  {
    path: 'preguntados',
    component: PreguntadosComponent,
    canActivate: [estaLogueadoGuard]
  },
  {
    path: 'ahorcado',
    component: AhorcadoComponent,
    canActivate: [estaLogueadoGuard]
  },
  {
    path: 'slot',
    component: SlotComponent,
    canActivate: [estaLogueadoGuard]
  },
  {
    path: 'cartas',
    component: CartasComponent,
    canActivate: [estaLogueadoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
