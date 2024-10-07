import { AfterContentInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirestoreService, Message } from '../../services/firestore.service';
import { collection, collectionData, Firestore, Timestamp, query, orderBy } from '@angular/fire/firestore';
import { AuthService} from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matSendRound } from '@ng-icons/material-icons/round'

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule,NgIconComponent],
  providers: [provideIcons({ matSendRound })],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, AfterContentInit, OnDestroy{
  login: boolean = false;
  messages: any = [];
  newMessage = '';
  emailActual: any = '';
  loginsCollection: any[] = [];
  sub!: Subscription;
  fireSvc = inject(FirestoreService);
  authSvc = inject(AuthService);
  firestore = inject(Firestore);
  loading : boolean = true;

  constructor() {
    // this.login = this.fireSvc.getLocalStorage('user');
    
    
  }
  ngOnInit(): void {    
    this.GetData();
    setTimeout(() => {
      this.emailActual = this.authSvc.usuarioActual?.email;
      
      console.log("Email actual"+this.authSvc.usuarioActual?.email);      
      this.loading = false;
    }, 900);

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.messages=[];
    this.sub.unsubscribe();
  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    
    this.authSvc.traerUsuarioActual();
    
    this.login = true;
    
    
  }
  

  guardarMensaje() {
    try {
      let user : any = this.authSvc.usuarioActual;
      if (user) {
        const mnsj = {
          email: user.email,
          nombre: user.displayName,
          fecha: Timestamp.fromDate(new Date()),
          mensaje: this.newMessage
        }
        this.fireSvc.setDocument(mnsj,'chats').then(()=>{
          this.messages.push(mnsj);
          this.newMessage = '';
        });
      }
      else {
        console.error('no hay usuario logueado');
      }

    } catch (error) {
      console.log(error);
    }
  }


  GetData() {
    let col = collection(this.firestore, 'chats');
    const consulta = query(col, orderBy('fecha', 'asc'));

    const observable = collectionData(consulta);

    this.sub = observable.subscribe((respuesta: any) => {
      this.messages = respuesta;
      console.log(respuesta);
    })

  }
}
