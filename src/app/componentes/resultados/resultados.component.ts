import { Component, inject } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.scss'
})
export class ResultadosComponent {
  fireSvc = inject(FirestoreService);
  listaResultados:any = [];
  constructor(){
    this.fireSvc.traerLista("resultados_juegos").subscribe((res:any)=>{
      this.listaResultados = res;
      console.log(res);      
    });
  }
  getImageForGame(game: string): string {
    const gameImages: { [key: string]: string } = {
      'Ahorcado': '/ahorcado2.png',
      'Mayor o menor': '/mayor_menor.png',
      'Preguntados': '/quiz.png',
      'Slot': '/slot.png'
    };
    return gameImages[game] || '';
  }
}
