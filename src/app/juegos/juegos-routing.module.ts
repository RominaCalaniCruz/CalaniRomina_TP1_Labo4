import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { SlotComponent } from './slot/slot.component';
import { CartasComponent } from './cartas/cartas.component';

const routes: Routes = [
  {
    path: '',
    component: JuegosComponent
  },
  {
    path: 'preguntados',
    component: PreguntadosComponent
  },
  {
    path: 'ahorcado',
    component: AhorcadoComponent
  },
  {
    path: 'slot',
    component: SlotComponent
  },
  {
    path: 'cartas',
    component: CartasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
