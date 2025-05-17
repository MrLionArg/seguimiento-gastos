import { Component, inject } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common';
import { GastosService, Gasto } from '../../core/services/gastos.service';

  // Componente Estadísticas Muestra el total gastado, el promedio de gastos y el número de gastos.
@Component({
  selector: 'app-estadisticas',
  standalone: true,
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
  imports: [CurrencyPipe, NgIf]  // Importamos CurrencyPipe para formatear moneda y NgIf para condicionales
})
export class EstadisticasComponent {

  // Inyección del servicio de gastos
  private gastosService = inject(GastosService);

  // Array de gastos que obtenemos del servicio
  gastos: Gasto[] = this.gastosService.getGastos();

  // Calcula el total gastado sumando todos los importes
  get totalGastos(): number {
    return this.gastos.reduce((total, gasto) => total + gasto.importe, 0);
  }

  // Calcula el gasto promedio dividiendo el total (de gastos) por la cantidad (de gastos en length.)
  get gastoPromedio(): number {
    return this.gastos.length ? this.totalGastos / this.gastos.length : 0;
  }

  // Devuelve el número total de gastos registrados
  get numGastos(): number {
    return this.gastos.length;
  }
}