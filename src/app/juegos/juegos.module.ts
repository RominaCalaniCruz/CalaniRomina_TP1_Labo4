import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { NgIconsModule } from '@ng-icons/core';
import { jamGamepadRetroF } from '@ng-icons/jam-icons';
import { tablerHeartFill,tablerPlayerPlayFill } from '@ng-icons/tabler-icons/fill';
import { tablerHeart,tablerHeartBroken ,tablerHeartOff,tablerArrowNarrowUp, tablerArrowNarrowDown,tablerReload} from '@ng-icons/tabler-icons';


import { JuegosComponent } from './juegos.component';
import { CartasComponent } from './cartas/cartas.component';
import { BrowserModule } from '@angular/platform-browser';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { SlotComponent } from './slot/slot.component';


@NgModule({
  declarations: [JuegosComponent, CartasComponent,AhorcadoComponent,PreguntadosComponent,SlotComponent],
  imports: [
    CommonModule,    
    JuegosRoutingModule,
    NgIconsModule.withIcons({tablerReload,tablerPlayerPlayFill,jamGamepadRetroF,tablerHeartFill,tablerHeart,tablerHeartBroken ,tablerHeartOff,tablerArrowNarrowUp,tablerArrowNarrowDown})
  ]
})
export class JuegosModule { }
