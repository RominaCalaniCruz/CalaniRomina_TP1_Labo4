import { Component, ViewChild } from '@angular/core';
import { jamGamepadRetroF,jamLogIn } from '@ng-icons/jam-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {matAccountCircle} from '@ng-icons/material-icons/baseline';
import {tablerSquareX , tablerMenu4} from '@ng-icons/tabler-icons'
import { LoginComponent } from '../login/login.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIconComponent,LoginComponent,RouterOutlet, RouterLink, RouterLinkActive],
  providers: [provideIcons({ jamGamepadRetroF, matAccountCircle, tablerSquareX,jamLogIn,tablerMenu4})],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @ViewChild('login') loginCmp!: LoginComponent;

  abrirModal(){
    this.loginCmp.abrir();
  }

}
