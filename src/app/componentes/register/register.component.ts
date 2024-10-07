import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamGamepadRetroF, jamEyeCloseF, jamEyeF,jamCloseRectangleF, jamArrowSquareRightF, jamAndroid, jamGhostF, jamPadlockF} from '@ng-icons/jam-icons';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormControl, FormsModule } from '@angular/forms';
import { FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  standalone: true,  
  imports: [LoginComponent,CommonModule, NgIconComponent, FormsModule, ReactiveFormsModule],
  providers: [provideIcons({ jamGamepadRetroF, jamEyeF, jamEyeCloseF,jamCloseRectangleF, jamArrowSquareRightF,jamAndroid, jamGhostF , jamPadlockF})],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  
})
export class RegisterComponent implements OnInit {
  @ViewChild('hola') loginComp!: LoginComponent;

  @ViewChild('registerModal') modalElement!: ElementRef; // Usa ViewChild para obtener el modal
  isPasswordVisible = false;
  showModal = false;
  isLoading: boolean = false;

  registerForm!: FormGroup;
  fireSvc = inject(FirestoreService);
  authSvc = inject(AuthService);
  toastM = inject(ToastrService);
  router = inject(Router);
  // modalElement: any = document.getElementById('registerModal');
constructor(){
  
}
ngOnInit(): void {
  this.registerForm = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    correo: new FormControl('',[Validators.required, Validators.email]),
    pass: new FormControl('',[Validators.required, Validators.minLength(4)])
  }, Validators.required );
}
  modalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses:
      'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      console.log('modal is hidden');
      
    },
    onShow: () => {
      console.log('modal is shown');
    },
    onToggle: () => {
      console.log('modal has been toggled');
    },
  };

  instanceOptions: InstanceOptions = {
    id: 'registerModal',
    override: true
  };

  modal!: ModalInterface;
  ngAfterViewInit(): void {
    this.modal = new Modal(this.modalElement.nativeElement, this.modalOptions, this.instanceOptions);

  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  crearCuenta(){
    if(this.registerForm.valid){
      this.isLoading=true;

      const formValues = this.registerForm.getRawValue();
      this.authSvc.registerAccount(formValues.nombre, formValues.correo, formValues.pass)
      .then(()=>{
        this.cerrar();
      }).finally(()=>{
        this.isLoading=false;
      })

      // this.authSvc.login(formValues.email,formValues.password);
      // this.guardarLog(formValues.correo);
      // this.cerrar();
      // this.router.navigate(['juegos']);
    }else{
      this.toastM.info("Faltan campos","Aviso");
    }
  }
  abrir(){
    this.showModal=true;
    if(this.modal){
      this.modal.show();
    }else{
      console.log("error");
      
    }
  }
  cerrar() {
    if (this.modal) {
      this.showModal=false;
      this.registerForm.reset();
      setTimeout(() => {        
        this.modal.hide();
      }, 250);
      
    } else {
      console.log("error");
    }
  }
  abrirLogin(){
    this.cerrar();
    if(this.loginComp){
      this.loginComp.abrir();
    }
    // this.switchToLogin.emit();
  }
}
