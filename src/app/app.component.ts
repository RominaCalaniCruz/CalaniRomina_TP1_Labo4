import { AfterContentInit, Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tdesignGamepad1 } from '@ng-icons/tdesign-icons';
import { jamGamepadRetroF,jamPlaySquareF } from '@ng-icons/jam-icons';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgIconComponent],
  providers: [provideIcons({ tdesignGamepad1, jamGamepadRetroF,jamPlaySquareF })],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterContentInit{
  title = 'labo4-tp';
  authSvc = inject(AuthService);
  ngOnInit(): void {
    initFlowbite();
    this.authSvc.traerUsuarioActual();
    
    
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log(this.authSvc.usuarioActual);
  }
}
