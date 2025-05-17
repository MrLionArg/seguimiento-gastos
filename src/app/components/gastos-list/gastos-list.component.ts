// Importamos los módulos necesarios de Angular
import { Component, Input, OnInit, signal } from '@angular/core';
import { NgForOf, NgIf, CurrencyPipe } from '@angular/common';
import { GastosService, Gasto } from '../../core/services/gastos.service';

/**
 * Componente Lista de Gastos
 * - Muestra la lista de gastos actualizada desde el servicio.
 * - Se actualiza automáticamente cuando la lista de gastos cambia.
 */
@Component({
  selector: 'app-gastos-list',
  standalone: true,
  templateUrl: './gastos-list.component.html',
  styleUrls: ['./gastos-list.component.css'],
  imports: [NgForOf, NgIf, CurrencyPipe]  // Importamos NgForOf, NgIf y CurrencyPipe
})
export class GastosListComponent implements OnInit {

  // Recibe los filtros aplicados desde el componente padre
  @Input() filtros: any = {};

  // Lista de gastos que se actualizará automáticamente
  gastosFiltrados: Gasto[] = [];

  constructor(private gastosService: GastosService) {}

  /**
   * Al inicializar el componente, nos suscribimos a los cambios en la lista de gastos
   */
  ngOnInit(): void {
    this.actualizarGastos();
  }

  /**
   * Método para actualizar la lista de gastos
   */
  actualizarGastos(): void {
    // Obtenemos los gastos actualizados del servicio
    const todosLosGastos = this.gastosService.getGastos();

    // Aplicamos los filtros
    this.gastosFiltrados = todosLosGastos.filter(gasto => {
      const coincideCategoria = this.filtros.categoria ? gasto.categoria === this.filtros.categoria : true;
      const coincideBusqueda = this.filtros.busqueda ? gasto.descripcion.toLowerCase().includes(this.filtros.busqueda.toLowerCase()) : true;
      const coincideFechaInicio = this.filtros.fechaInicio ? gasto.fecha >= this.filtros.fechaInicio : true;
      const coincideFechaFin = this.filtros.fechaFin ? gasto.fecha <= this.filtros.fechaFin : true;

      return coincideCategoria && coincideBusqueda && coincideFechaInicio && coincideFechaFin;
    });

    console.log('Gastos actualizados:', this.gastosFiltrados);
  }

  /**
   * Método para eliminar un gasto
   * @param id - ID del gasto a eliminar
   */
  eliminarGasto(id: number): void {
    this.gastosService.deleteGasto(id);
    this.actualizarGastos();
  }
}