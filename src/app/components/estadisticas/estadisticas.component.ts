import { Component, inject } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common';
import { GastosService, Gasto } from '../../core/services/gastos.service';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
  imports: [CurrencyPipe, NgIf]
})
export class EstadisticasComponent {

  private gastosService = inject(GastosService);
  gastos: Gasto[] = this.gastosService.getGastos();

  /** Calcula el total gastado */
  get totalGastos(): number {
    return this.gastos.reduce((total, gasto) => total + gasto.importe, 0);
  }

  /** Calcula el gasto promedio */
  get gastoPromedio(): number {
    return this.gastos.length ? this.totalGastos / this.gastos.length : 0;
  }

  /** Número de gastos registrados */
  get numGastos(): number {
    return this.gastos.length;
  }
}