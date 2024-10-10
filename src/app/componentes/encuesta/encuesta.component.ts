import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { InstanceOptions, Modal, ModalInterface, ModalOptions } from 'flowbite';
import { jamGamepadRetroF, jamLogIn,jamCloseRectangleF } from '@ng-icons/jam-icons';
import { FirestoreService } from '../../services/firestore.service';
import { Timestamp } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,NgIconComponent],
  providers: [provideIcons({ jamGamepadRetroF, jamLogIn,jamCloseRectangleF})],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent {
  @Output() closed = new EventEmitter<void>();
  // encuestaModal
  @ViewChild('encuestaModal') modalElement!: ElementRef; // Usa ViewChild para obtener el modal
  isLoading: boolean = false;
  encuestaForm: FormGroup;
  isVisible = false; // Controla la visibilidad del modal
  showModal = false;
  fireSvc = inject(FirestoreService);
  toastM = inject(ToastrService);

  juegosDisponibles: string[] = [
    'Preguntados',
    'Mayor o menor',
    'Ahorcado',
    'Ruleta',
  ];
  constructor(private fb: FormBuilder) {
    this.encuestaForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      juegoFavorito: ['', Validators.required],
      recomendar: ['', Validators.required],
      juegoSugerido: ['', Validators.required],
    });
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
      this.encuestaForm.reset();
      this.encuestaForm.get("juegoFavorito")?.setValue("");
      setTimeout(() => {
        this.modal.hide();
      }, 250);

    } else {
      console.log("error");
    }
  }

  enviarEncuesta(): void {
    if (this.encuestaForm.valid) {
      this.isLoading = true;
      console.log('Datos enviados:', this.encuestaForm.value);
      const formValues = this.encuestaForm.getRawValue();
      const respuestaForm = {
        nombreCompleto: formValues.nombre,
        edad: formValues.edad,
        celular: formValues.celular,
        favorito: formValues.juegoFavorito,
        recomendado: formValues.recomendar,
        juegoNuevo: formValues.juegoSugerido,
        fechaEnvio: Timestamp.fromDate(new Date())
      };
      this.fireSvc.guardarDato("encuesta_respuestas",respuestaForm).then(()=>{
        this.isLoading=false;
        this.toastM.success("Gracias por responder","Reseña enviada!");
        this.cerrar();
        
      });
    }
    else{
      this.toastM.error("Debes completar todos los datos.","ERROR");
    }
  }

  onOpenSelect(): void {
    const selectElement = document.getElementById('juegoFavorito') as HTMLSelectElement;
    if (selectElement) {
      selectElement.size = 6; // Muestra 5 opciones visibles
      selectElement.classList.remove('closing'); // Remueve la clase de cierre
      selectElement.classList.add('open'); // Añade la clase de apertura
    }
  }

  onCloseSelect(): void {
    const selectElement = document.getElementById('juegoFavorito') as HTMLSelectElement;
    if (selectElement) {
      selectElement.size = 1; // Establece el tamaño a 1 para mostrar una sola opción
      selectElement.classList.remove('open'); // Remueve la clase de apertura
      selectElement.classList.add('closing'); // Añade la clase de cierre
    }
  }

  onSelectOption(): void {
    const selectElement = document.getElementById('juegoFavorito') as HTMLSelectElement;
    if (selectElement) {
      selectElement.size = 1; // Cambia el tamaño para cerrar el select
      selectElement.classList.remove('open'); // Remueve la clase de apertura
      selectElement.classList.add('closing'); // Activa la clase de cierre con animación inversa
      selectElement.blur(); // Pierde el foco para cerrar el select visualmente
    }
  }
}