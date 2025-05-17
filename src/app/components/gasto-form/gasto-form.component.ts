import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GastosService } from '../../core/services/gastos.service';

@Component({
  selector: 'app-gasto-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './gasto-form.component.html',
  styleUrls: ['./gasto-form.component.css']
})
export class GastoFormComponent {

  private fb = inject(FormBuilder);
  private gastosService = inject(GastosService);

  gastoForm: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    categoria: [''],
    importe: [0, [Validators.required, Validators.min(1)]],
    fecha: ['']
  });

  /**
   * Método que se ejecuta al enviar el formulario
   */
  onSubmit(): void {
    if (this.gastoForm.valid) {
      const nuevoGasto = {
        id: Date.now(),
        ...this.gastoForm.value
      };
      this.gastosService.addGasto(nuevoGasto);
      this.gastoForm.reset();
    }
  }
}