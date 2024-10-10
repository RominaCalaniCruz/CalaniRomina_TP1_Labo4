import { Component, inject, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ToastrService } from 'ngx-toastr'
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { Timestamp } from '@angular/fire/firestore';
import { tablerHeartFill ,tablerPlayerPlayFill} from '@ng-icons/tabler-icons/fill';
import { provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-preguntados',
  standalone: false,
  providers: [provideIcons({tablerPlayerPlayFill})],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss'
})
export class PreguntadosComponent implements OnInit {

  superheroes: any[] = [];
  superheroes2: any[] = [];
  peliculasMarvel: any[] = [];
  peliculasUnidas: any[] = [];
  opcionCorrecta: any;
  jugando = false;
  adivino: boolean = false;
  preguntasLista: any[][] = [];
  numeroPregunta: number = 0;
  cantPuntos:number = 0;
  toastM = inject(ToastrService);
  fireSvc = inject(FirestoreService);
  authSvc = inject(AuthService);
  constructor(private peliculasSvc: PeliculasService) {
  }

  ngOnInit() {
    this.peliculasSvc.traerPeliculasMarvel(1).subscribe((response: any) => {
      this.superheroes = response.results;
    });
    this.peliculasSvc.traerPeliculasMarvel(2).subscribe((response: any) => {
      this.superheroes2 = response.results;
    });
  }

  iniciarJuego() {
    this.numeroPregunta = 0;
    this.cantPuntos = 0;
    this.peliculasUnidas = this.superheroes.concat(this.superheroes2);
    this.peliculasMarvel = this.seleccionarPeliculasAleatorias(this.peliculasUnidas, 12);
    this.preguntasLista = this.agruparPeliculas(this.peliculasMarvel, 4);
    this.mostrarPreguntaActual();
    this.jugando = true;

    // console.log(this.opcionCorrecta);
  }

  agruparPeliculas(peliculas: any[], cantOpciones: number) {
    const grupos = [];
    for (let i = 0; i < peliculas.length; i += cantOpciones) {
      grupos.push(peliculas.slice(i, i + cantOpciones));
    }
    return grupos;
  }

  seleccionarPeliculasAleatorias(peliculas: any[], cant: number) {
    const seleccionadas:any[] = [];
    while (seleccionadas.length < cant) {
      const randomIndex = Math.floor(Math.random() * peliculas.length);
      if (!seleccionadas.includes(peliculas[randomIndex])) {
        seleccionadas.push(peliculas[randomIndex]);
      }
    }
    return seleccionadas;
  }

  verificarOpcion(indice: number) {
    if (this.preguntasLista[this.numeroPregunta][indice].release_date == this.opcionCorrecta.release_date) {
      console.log("ganaste");
      this.toastM.success("+ 20 puntos","Respuesta Correcta!");
      this.adivino = true;
      this.cantPuntos+=20;
    }
    else {
      console.log("perdiste");
      this.toastM.error("No sumaste puntos","Respuesta Incorrecta!");      
      // this.cantPuntos-=5;
    }
    this.numeroPregunta++;
    if (this.numeroPregunta < this.preguntasLista.length) {
      this.mostrarPreguntaActual();
    } else {
      setTimeout(() => {
        console.log("Partida finalizada");
        this.toastM.info(`Conseguiste ${this.cantPuntos} puntos`,"Partida finalizada");
        if (this.cantPuntos){
          this.guardarPuntaje();
        }
      }, 1000);
      this.jugando = false;
    }
  }
  mostrarPreguntaActual(): void {
    const opciones = this.preguntasLista[this.numeroPregunta];
    this.opcionCorrecta = opciones[Math.floor(Math.random() * opciones.length)];
    console.log('opcion correcta: '+this.opcionCorrecta.release_date);
  }
  guardarPuntaje(){
    const datos = {
      email: this.authSvc.usuarioActual?.email,
      puntos: this.cantPuntos,
      fecha: Timestamp.fromDate(new Date()),
      juego: "Preguntados"
    }
    this.fireSvc.guardarDato('resultados_juegos',datos).then(()=>{
      console.log("se guardo\n"+datos);
      
    })
  }
}

