import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamGamepadRetroF, jamEyeCloseF, jamEyeF,jamCloseRectangleF } from '@ng-icons/jam-icons';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ jamGamepadRetroF, jamEyeF, jamEyeCloseF,jamCloseRectangleF })],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('modalSlide', [
      state('void', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      state('*', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('void => *', [
        animate('300ms ease-in')
      ]),
      transition('* => void', [
        animate('300ms ease-out')
      ]),
    ]),
  ]

})
export class LoginComponent {
  @ViewChild('authenticationModal') modalElement!: ElementRef; // Usa ViewChild para obtener el modal
  isPasswordVisible = false;
  showModal = false;
  // modalElement: any = document.getElementById('authenticationModal');

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
      setTimeout(() => {        
        this.modal.hide();
      }, 250);
      
    } else {
      console.log("error");
    }
  }
}
