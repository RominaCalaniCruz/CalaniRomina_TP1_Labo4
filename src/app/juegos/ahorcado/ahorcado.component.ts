import { Component, inject } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr'
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-ahorcado',
  standalone: false,
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss'
})
export class AhorcadoComponent {
  palabraOculta = '';
  cantIntentos = 0;
  cantIntentosMax = 7; //  7 imagenes disponibles por ahora
  palabra = '';
  gano = false;
  perdio = false;
  jugando = true;
  cantPuntos:number = 100;
  botonesHabilitados: boolean[][]=[];
  fireSvc = inject(FirestoreService);
  authSvc = inject(AuthService);
  toastM = inject(ToastrService);

  letrasTeclado: string[][] = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q'],
    ['R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  ];

  palabrasJuego = ['JAVASCRIPT', 'HTML', 'ANGULAR',
    'FIESTA', 'SUERTE', 'APLICACION'];

  constructor() {
    this.inicializarValores();
  }

  inicializarValores() {
    this.palabra = this.palabrasJuego[Math.floor(Math.random() * this.palabrasJuego.length)];
    this.palabraOculta = '_ '.repeat(this.palabra.length).trimEnd();
    this.botonesHabilitados = this.letrasTeclado.map(row => row.map(() => false));
  }

  comprobar(letra: string, fila: number, columna: number) {
    this.existeLetra(letra);
    const palabraOcultaArr = this.palabraOculta.split(' ');
    this.botonesHabilitados[fila][columna] = true;
    for (let i = 0; i < this.palabra.length; i++) {
      if (this.palabra[i] === letra) {
        palabraOcultaArr[i] = letra;
      }
    }
    this.palabraOculta = palabraOcultaArr.join(' ');
    this.verificarAcierto();
  }

  desactivarBoton(fila: number, columna: number) {
    return this.botonesHabilitados[fila][columna];
  }

  verificarAcierto() {
    const palabraArr = this.palabraOculta.split(' ');
    const palabraEvaluar = palabraArr.join('');
    if (palabraEvaluar === this.palabra) {
      this.gano = true;
      this.jugando = false;
      console.log('GANO');
      this.guardarPuntaje();
    }
    if (this.cantIntentos >= this.cantIntentosMax) {
      this.perdio = true;
      this.jugando = false;
      console.log('PERDIO');
      this.guardarPuntaje();
    }
  }

  existeLetra(letra: string) {
    if (!this.palabra.includes(letra)) {
      this.cantIntentos++;
      this.cantPuntos-=10;      
      this.toastM.error(" - 10 puntos","Letra equivocada!",{positionClass:'toast-bottom-right',timeOut:900});

    }
  }

  guardarPuntaje(){
    const datos = {
      email: this.authSvc.usuarioActual?.email,
      puntos: this.cantPuntos,
      fecha: Timestamp.fromDate(new Date()),
      juego: "Ahorcado"
    }
    this.fireSvc.guardarDato('resultados_juegos',datos).then(()=>{
      console.log("se guardo\n"+datos);
      
    })
  }

  reiniciarPartida() {
    
    this.inicializarValores();
    this.jugando = true;
    this.cantIntentos = 0;
    this.cantPuntos = 100;
    this.perdio = false;
    this.gano = false;
    // Swal.fire({
    //   position: 'top',
    //   icon: 'success',
    //   title: 'Juego reiniciado',
    //   showConfirmButton: false,
    //   timer: 1300
    // });
  }
}
