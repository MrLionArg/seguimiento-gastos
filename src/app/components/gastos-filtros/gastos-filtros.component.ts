// Importamos los módulos necesarios de Angular
import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gastos-filtros',  // Selector del componente
  standalone: true,  // Componente independiente
  templateUrl: './gastos-filtros.component.html',  // Ruta del HTML
  styleUrls: ['./gastos-filtros.component.css'],  // Ruta del CSS
  imports: [FormsModule, NgIf, NgForOf]  // Importamos FormsModule, NgIf y NgForOf
})
export class GastosFiltrosComponent {

  // Evento que emite los filtros al componente padre
  @Output() filtrosAplicados = new EventEmitter<any>();

  // Variables para los filtros
  categoriaSeleccionada: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  busqueda: string = '';

  // Método para aplicar los filtros. Emite los filtros al componente padre.
   
  aplicarFiltros(): void {
    console.log('Filtros aplicados:', {
      categoria: this.categoriaSeleccionada,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      busqueda: this.busqueda
    });

    this.filtrosAplicados.emit({
      categoria: this.categoriaSeleccionada,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      busqueda: this.busqueda
    });
  }
}

