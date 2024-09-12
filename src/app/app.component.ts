import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tdesignGamepad1 } from '@ng-icons/tdesign-icons';
import { jamGamepadRetroF,jamPlaySquareF } from '@ng-icons/jam-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgIconComponent],
  providers: [provideIcons({ tdesignGamepad1, jamGamepadRetroF,jamPlaySquareF })],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'labo4-tp';
  ngOnInit(): void {
    initFlowbite();
  }
}
