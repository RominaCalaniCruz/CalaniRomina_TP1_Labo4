import { Component, inject } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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
  isLoading: boolean = true;
  listaFiltradaXUsuario:any = [];
  authSvc = inject(AuthService);
  constructor(){
    this.fireSvc.traerLista("resultados_juegos").subscribe((res:any)=>{
      this.listaResultados = res;
      this.listaFiltradaXUsuario = this.listaResultados.filter((res:any)=>res.email == this.authSvc.usuarioActual?.email);
      console.log(this.listaFiltradaXUsuario);
      this.isLoading = false;
      console.log(res);      
    });
  }
  getImageForGame(game: string): string {
    const gameImages: { [key: string]: string } = {
      'Ahorcado': '/ahorcado2.png',
      'Mayor o menor': '/mayor_menor.png',
      'Preguntados': '/quiz.png',
      'Ruleta': '/slot.png'
    };
    return gameImages[game] || '';
  }
}
