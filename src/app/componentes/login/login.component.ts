import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamGamepadRetroF, jamEyeCloseF, jamEyeF, jamCloseRectangleF, jamArrowSquareRightF, jamAndroid, jamGhostF, jamPadlockF } from '@ng-icons/jam-icons';
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
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, NgIconComponent, FormsModule, ReactiveFormsModule, RegisterComponent],
  providers: [provideIcons({ jamGamepadRetroF, jamEyeF, jamEyeCloseF, jamCloseRectangleF, jamArrowSquareRightF, jamAndroid, jamGhostF, jamPadlockF })],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'

})
export class LoginComponent implements OnInit {
  @ViewChild('register') registerComp!: RegisterComponent;
  @ViewChild('authenticationModal') modalElement!: ElementRef; // Usa ViewChild para obtener el modal
  isPasswordVisible = false;
  showModal = false;
  isLoading: boolean = false;

  loginForm!: FormGroup;
  fireSvc = inject(FirestoreService);
  authSvc = inject(AuthService);
  toastM = inject(ToastrService);
  router = inject(Router);
  // modalElement: any = document.getElementById('authenticationModal');
  constructor() {

  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    }, Validators.required);
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
    id: 'authenticationModal',
    override: true
  };

  modal!: ModalInterface;
  ngAfterViewInit(): void {
    this.modal = new Modal(this.modalElement.nativeElement, this.modalOptions, this.instanceOptions);

  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  guardarLog(email: string) {
    const currentDate = Timestamp.fromDate(new Date());
    const log = {
      user: email,
      date: currentDate,
    };
    this.fireSvc.guardarDato('logs_users', log);
  }

  autocompletar(correo: string, pass: string) {
    this.loginForm.setValue({
      email: correo,
      password: pass
    });
  }
  iniciarSesion() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const formValues = this.loginForm.getRawValue();
      this.authSvc.login(formValues.email, formValues.password)
      .then(()=>{
        this.cerrar();
      }).finally(()=>{
        this.isLoading=false;
      });

    } else {
      this.toastM.info("Faltan campos", "Aviso");

    }
  }
  abrir() {
    this.showModal = true;
    if (this.modal) {
      this.modal.show();
    } else {
      console.log("error");

    }
  }
  cerrar() {
    if (this.modal) {
      this.showModal = false;
      this.loginForm.reset();
      setTimeout(() => {
        this.modal.hide();
      }, 250);

    } else {
      console.log("error");
    }
  }

  abrirRegistro() {
    this.cerrar();
    if (this.registerComp) {
      this.registerComp.abrir();
    }
    // this.registerComp.abrir();
    // this.switchToRegister.emit();
  }

}
