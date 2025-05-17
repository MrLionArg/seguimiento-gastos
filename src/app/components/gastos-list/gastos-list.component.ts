import { Component, Input } from '@angular/core';
import { NgForOf, NgIf, CurrencyPipe } from '@angular/common';
import { Gasto } from '../../core/services/gastos.service';

/**
 * Componente Lista de Gastos
 * - Muestra los gastos aplicando los filtros recibidos.
 */
@Component({
  selector: 'app-gastos-list',
  standalone: true,
  templateUrl: './gastos-list.component.html',
  styleUrls: ['./gastos-list.component.css'],
  imports: [NgForOf, NgIf, CurrencyPipe]  // Importamos NgForOf, NgIf y CurrencyPipe
})
export class GastosListComponent {

  @Input() filtros: any = {};

  gastos: Gasto[] = [];
  gastosFiltrados: Gasto[] = [];

  // Aplica los filtros a la lista de gastos.
   
  aplicarFiltros(): void {
    console.log('Aplicando filtros:', this.filtros);
    // Aquí iría la lógica para filtrar los gastos
  }
}