import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { provideIcons } from '@ng-icons/core';
import { tablerReload,tablerHandStop} from '@ng-icons/tabler-icons';
import {tablerPlayerPlayFill} from '@ng-icons/tabler-icons/fill';
import {matBackHand} from '@ng-icons/material-icons/baseline';
import { Timestamp } from '@angular/fire/firestore';

interface Reel {
  images: string[];
  currentIndex: number;
  currentImage: string;
  intervalId?: any;
  intervalTime: number;
}
@Component({
  selector: 'app-slot',
  standalone: false,
  providers: [provideIcons({tablerPlayerPlayFill,tablerReload,tablerHandStop,matBackHand})],
  templateUrl: './slot.component.html',
  styleUrl: './slot.component.scss'
})
export class SlotComponent {
  reels: Reel[] = [
    { images: ['./slot_1.png', './slot_2.png', './slot_3.png', './slot_4.png', './slot_5.png', './slot_6.png', './slot_7.png'], currentIndex: 0, currentImage: '', intervalTime: 300 },
    { images: ['./slot_1.png', './slot_2.png', './slot_3.png', './slot_4.png', './slot_5.png', './slot_6.png', './slot_7.png'], currentIndex: 0, currentImage: '', intervalTime: 500 },
    { images: ['./slot_1.png', './slot_2.png', './slot_3.png', './slot_4.png', './slot_5.png', './slot_6.png', './slot_7.png'], currentIndex: 0, currentImage: '', intervalTime: 700 }
  ];
  cantPuntos:number=0;
  start: boolean = false;
  fireSvc = inject(FirestoreService);
  authSvc = inject(AuthService);
  toastM = inject(ToastrService);
  constructor() { }

  ngOnInit(): void {

    this.reels.forEach(reel => {
      reel.currentIndex = Math.floor(Math.random() * reel.images.length);
      this.updateCurrentImage(reel);
    });

  }

  girarReel(): void {
    this.start = true;
    this.reels.forEach(reel => this.startInterval(reel));
  }

  startInterval(reel: Reel): void {
    reel.intervalId = setInterval(() => {
      reel.currentIndex = (reel.currentIndex + 1) % reel.images.length;
      this.updateCurrentImage(reel);
    }, reel.intervalTime);
  }

  detenerReel(): void {
    this.start = false;
    this.reels.forEach(reel => clearInterval(reel.intervalId));
    console.log('resultado:');
    this.reels.forEach((reel, index) => {
      console.log(`Reel ${index + 1}: ${reel.currentIndex}`);
    });
    const indices = this.reels.map(reel => reel.currentIndex);
    if (indices[0] === indices[1] && indices[1] === indices[2]) {
      this.cantPuntos=100;
      this.toastM.success("100 puntos","GANASTE!");
      this.guardarPuntaje();

    } else if (indices[0] === indices[1] || indices[1] === indices[2] || indices[0] === indices[2]) {
      this.cantPuntos = 30;
      this.toastM.info("30 puntos","Algo es peor que nada...");
      this.guardarPuntaje();

    } else {
      this.cantPuntos = 0;
      this.toastM.error("No ganaste ningun punto","Mejor suerte la próxima.");
    }

  }

  updateCurrentImage(reel: Reel): void {
    reel.currentImage = reel.images[reel.currentIndex];
  }
  guardarPuntaje(){
    const datos = {
      email: this.authSvc.usuarioActual?.email,
      puntos: this.cantPuntos,
      fecha: Timestamp.fromDate(new Date()),
      juego: "Ruleta"
    }
    this.fireSvc.guardarDato('resultados_juegos',datos).then(()=>{
      console.log("se guardo\n"+datos);
      
    })
  }
}