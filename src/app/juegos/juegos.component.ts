import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos',
  standalone: true,
  imports: [],
  templateUrl: './juegos.component.html',
  styleUrl: './juegos.component.scss'
})
export class JuegosComponent {
  imagen = "./slot.png";
  imagen2 = './ahorcado2.png';
  imagen3 = './mayor_menor.png';
  imagen4 = './quiz.png';
  // gif = '../../assets/gifs/slot.gif';
  // gif2 = '';
  // gif3 = '';
  // gif4 = '';
  mostrarGif = false;
  constructor(private router: Router) { }
  alternarGif(): void {
    this.mostrarGif = !this.mostrarGif;
  }
  navegarAJuego(nombre: string): void {
    this.router.navigate([nombre]);
  }
}
