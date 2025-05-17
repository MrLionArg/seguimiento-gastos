import { Component, inject } from '@angular/core';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { GastosService, Gasto } from '../../core/services/gastos.service';

@Component({
  selector: 'app-gastos-list',
  standalone: true,
  templateUrl: './gastos-list.component.html',
  styleUrls: ['./gastos-list.component.css'],
  imports: [NgForOf, CurrencyPipe] // Aquí importamos el CurrencyPipe
})
export class GastosListComponent {

  private gastosService = inject(GastosService);
  gastos: Gasto[] = this.gastosService.getGastos();

  eliminarGasto(id: number): void {
    this.gastosService.deleteGasto(id);
    this.gastos = this.gastosService.getGastos();
  }
}