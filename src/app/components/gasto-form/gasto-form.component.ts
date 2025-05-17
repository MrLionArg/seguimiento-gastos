// Importamos los módulos necesarios de Angular
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

// Componente Formulario de Gasto y permite al usuario añadir un nuevo gasto.

@Component({
  selector: 'app-gasto-form',
  standalone: true,
  templateUrl: './gasto-form.component.html',
  styleUrls: ['./gasto-form.component.css'],
  imports: [ReactiveFormsModule, NgIf]  // Importamos ReactiveFormsModule y NgIf
})
export class GastoFormComponent {

  // Formulario reactivo para añadir un gasto
  gastoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializamos el formulario con los campos necesarios
    this.gastoForm = this.fb.group({
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      importe: [0, [Validators.required, Validators.min(1)]],
      fecha: ['', Validators.required]
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (this.gastoForm.valid) {
      console.log('Gasto añadido:', this.gastoForm.value);
      this.gastoForm.reset();  // Reseteamos el formulario tras enviar los datos
    }
  }
}