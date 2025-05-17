// Importamos los módulos necesarios de Angular
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GastosService } from '../../core/services/gastos.service';
import { NgIf } from '@angular/common';

/**
 * Componente Formulario de Gasto
 * - Permite al usuario añadir un nuevo gasto.
 */
@Component({
  selector: 'app-gasto-form',
  standalone: true,
  templateUrl: './gasto-form.component.html',
  styleUrls: ['./gasto-form.component.css'],
  imports: [ReactiveFormsModule, NgIf]  // Importamos ReactiveFormsModule y NgIf
})
export class GastoFormComponent {

  // Definimos el formulario reactivo
  gastoForm: FormGroup;

  constructor(private fb: FormBuilder, private gastosService: GastosService) {
    // Inicializamos el formulario con los campos y validaciones
    this.gastoForm = this.fb.group({
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      importe: [0, [Validators.required, Validators.min(1)]],
      fecha: ['', Validators.required]
    });
  }

  /**
   * Método que se ejecuta al enviar el formulario
   */
  onSubmit(): void {
    // Si el formulario es válido, añadimos el gasto
    if (this.gastoForm.valid) {
      console.log('Gasto a añadir:', this.gastoForm.value);
      this.gastosService.addGasto(this.gastoForm.value);  // Enviamos el gasto al servicio
      this.gastoForm.reset();  // Reseteamos el formulario tras añadir el gasto
    } else {
      console.log('Formulario inválido');
    }
  }
}