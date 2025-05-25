import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { GastosService } from '../../core/services/gastos.service';

@Component({
  selector: 'app-gasto-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './gasto-form.component.html',
})
export class GastoFormComponent {
  gastoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gastosService: GastosService
  ) {
    this.gastoForm = this.fb.group({
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      importe: [0, [Validators.required, Validators.min(0.01)]],
      fecha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.gastoForm.valid) {
      // Llamamos al servicio que hace POST y recarga
      this.gastosService.addGasto(this.gastoForm.value)
        .subscribe({
          next: () => {
            this.gastoForm.reset();
          },
          error: err => {
            console.error('Error al añadir gasto', err);
          }
        });
    }
  }
}