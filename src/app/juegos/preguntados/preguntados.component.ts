import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-preguntados',
  standalone: false,
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
      // Swal.fire({
      //   position: 'top',
      //   icon: 'success',
      //   title: '¡Correcto!',
      //   showConfirmButton: false,
      //   timer: 900
      // });
      this.adivino = true;
    }
    else {
      console.log("perdiste");
      // Swal.fire({
      //   position: 'top',
      //   icon: 'error',
      //   title: 'Incorrecto  ( ´•︵•` )',
      //   showConfirmButton: false,
      //   timer: 900
      // });
    }
    this.numeroPregunta++;
    if (this.numeroPregunta < this.preguntasLista.length) {
      this.mostrarPreguntaActual();
    } else {
      setTimeout(() => {

        console.log("Partida finalizada");
        // Swal.fire({
        //   position: 'top',
        //   icon: 'success',
        //   title: 'PARTIDA FINALIZADA. Conseguiste 0 puntos'
        // });
      }, 1000);
      this.jugando = false;
    }
  }
  mostrarPreguntaActual(): void {
    const opciones = this.preguntasLista[this.numeroPregunta];
    this.opcionCorrecta = opciones[Math.floor(Math.random() * opciones.length)];
    console.log('opcion correcta: '+this.opcionCorrecta.release_date);
  }
}

