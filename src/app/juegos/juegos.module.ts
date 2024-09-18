import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { NgIconsModule } from '@ng-icons/core';
import { jamGamepadRetroF, jamEyeCloseF, jamEyeF,jamCloseRectangleF } from '@ng-icons/jam-icons';
import { JuegosComponent } from './juegos.component';


@NgModule({
  declarations: [JuegosComponent],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    NgIconsModule.withIcons({jamGamepadRetroF})
  ]
})
export class JuegosModule { }
