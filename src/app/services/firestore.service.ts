import { inject, Injectable } from '@angular/core';
import {  addDoc, collection, Firestore, Timestamp} from '@angular/fire/firestore';

export interface Message{
  email: string,
  nombre: string,
  fecha: Timestamp,
  mensaje: string
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) { }

  setDocument(obj: any, nombreCol: string){
    return addDoc(collection(this.firestore, nombreCol), obj);
  }

  guardarDato(coleccionName:string, objeto:any){
    let col = collection(this.firestore,coleccionName);
    return addDoc(col, objeto);
  }

  guardarLog(email: string) {
    const currentDate = Timestamp.fromDate(new Date());
    const log = {
      user: email,
      date: currentDate,
    };
    this.guardarDato('logs_users', log);
  }
}
