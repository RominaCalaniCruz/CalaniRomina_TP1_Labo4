import { Component, inject, OnInit } from '@angular/core';
import { CartasService } from '../../services/cartas.service';
import { provideIcons } from '@ng-icons/core';
import { jamGamepadRetroF } from '@ng-icons/jam-icons';
import { tablerHeartFill ,tablerPlayerPlayFill} from '@ng-icons/tabler-icons/fill';
import { tablerHeart,tablerHeartBroken ,tablerHeartOff,tablerArrowNarrowUp, tablerArrowNarrowDown,tablerReload} from '@ng-icons/tabler-icons';
import { FirestoreService } from '../../services/firestore.service';
import { ToastrService } from 'ngx-toastr'
import { config, timeout } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-cartas',
  standalone: false,
  // imports: [NgIconComponent],
  providers: [provideIcons({tablerReload, jamGamepadRetroF,tablerHeartFill,tablerHeart,tablerHeartBroken ,tablerHeartOff,tablerArrowNarrowUp, tablerArrowNarrowDown,tablerPlayerPlayFill})],
  templateUrl: './cartas.component.html',
  styleUrl: './cartas.component.scss'
})
export class CartasComponent implements OnInit {
  cards: any[] = [];
  cards_view: any[]=[];
  isLoading: boolean = true;
  currentCardIndex: number = 0;
  message: string = '';
  cantVidas: number = 3;
  jugando = false;
  finJuego = false;
  vistaTemporal = false;
  mensajeTemporal = false;
  cantPuntos : number = 0;
  cartaAtras = 'https://deckofcardsapi.com/static/img/back.png';
  toastM = inject(ToastrService);
  fireSvc = inject(FirestoreService);
  authSvc = inject(AuthService);
  constructor(private cartasSvc: CartasService) { }

  ngOnInit(): void {
    this.cartasSvc.crearBaraja().subscribe(deck => {
      this.cartasSvc.drawCards(deck.deck_id).subscribe(draw => {
        this.cards = draw.cards;
        
        this.isLoading = false;
      });
    });
  }

  iniciarPartida() {
    this.jugando = true;
    this.cantPuntos = 0;

  }

  mezclarCartas(): void {
    this.cards.sort(() => Math.random() - 0.5);
    console.log(this.cards);

  }
  reiniciarPartida(){
    this.cantVidas = 3;
    this.currentCardIndex = 0;
    this.mezclarCartas();
    this.finJuego = false;
  }

  guardarPuntaje(){
    // console.log(this.authSvc.usuarioActual.);
    
    const datos = {
      email: this.authSvc.usuarioActual?.email,
      puntos: this.cantPuntos,
      fecha: Timestamp.fromDate(new Date()),
      juego: "Mayor o menor"
    }
    this.fireSvc.guardarDato('resultados_juegos',datos).then(()=>{
      console.log("se guardo\n"+datos);
      
    })
  }

  verificarFinJuego(): void {
    if (this.cantVidas == 0) {
      this.message = '¡Se te acabaron las vidas!';
      this.jugando = false;
      this.finJuego = true;
      this.guardarPuntaje();
      // this.cantVidas = 3;
      setTimeout(() => {
        this.toastM.success(`Obtuviste ${this.cantPuntos} puntos`,this.message, {timeOut:4000, positionClass:'toast-top-center'});
      }, 1000);
    }
  }
  esMayor(): void {
    this.verificarAcierto(true);
  }

  esMenor(): void {
    this.verificarAcierto(false);
  }

  verificarAcierto(isHigher: boolean): void {
    if (this.currentCardIndex < this.cards.length - 1) {
      const nextCardValue = this.traerValorNumericoCarta(this.cards[this.currentCardIndex + 1].value);
      const currentCardValue = this.traerValorNumericoCarta(this.cards[this.currentCardIndex].value);
      if ((isHigher && nextCardValue > currentCardValue) || (!isHigher && nextCardValue < currentCardValue)) {
        this.message = 'Acertaste!';
        this.cantPuntos++;
      } else if ((isHigher && nextCardValue < currentCardValue) || (!isHigher && nextCardValue > currentCardValue)) {
        this.message = 'Ups..incorrecto (╥﹏╥)';
        this.cantVidas--;        
      } else {
        this.message = 'Son iguales (ㆆ_ㆆ)';
      }
      this.vistaTemporal = true;
      this.mensajeTemporal = true;
      this.toastM.info(this.message,"Resultado");
      setTimeout(() => {
        this.vistaTemporal = false;
        this.currentCardIndex++;
        this.mensajeTemporal = false;
      }, 1000);
    } else {
      this.message = 'No hay más cartas';
    }
    this.verificarFinJuego();
    console.log(this.message);
  }

  traerValorNumericoCarta(valor: any): number {
    switch (valor) {
      case 'ACE': return 1;
      case '2': return 2;
      case '3': return 3;
      case '4': return 4;
      case '5': return 5;
      case '6': return 6;
      case '7': return 7;
      case '8': return 8;
      case '9': return 9;
      case '10': return 10;
      case 'JACK': return 11;
      case 'QUEEN': return 12;
      case 'KING': return 13;
      default: return 0;
    }
  }
}
