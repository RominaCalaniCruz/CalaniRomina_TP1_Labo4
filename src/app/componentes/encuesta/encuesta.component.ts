import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent {
  @Output() closed = new EventEmitter<void>();
  encuestaForm: FormGroup;
  isVisible = false; // Controla la visibilidad del modal

  juegosDisponibles: string[] = [
    'Preguntados',
    'Mayor o menor',
    'Ahorcado',
    'Máquina tragamonedas',
  ];
  constructor(private fb: FormBuilder) {
    this.encuestaForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      juegoFavorito: ['', Validators.required], // Cambiado a string para un select
      recomendar: ['', Validators.required],
      juegoSugerido: ['', Validators.required],
    });
  }

  openModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
    this.closed.emit(); // Notifica al componente padre que el modal se cerró
  }

  submitSurvey(): void {
    if (this.encuestaForm.valid) {
      console.log('Datos enviados:', this.encuestaForm.value);
      this.closeModal();
    }
  }
}