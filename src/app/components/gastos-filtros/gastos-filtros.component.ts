// importación de los módulos necesarios de Angular
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Componente filtros de Gastos para giltrar por categoría, fecha y búsqueda
@Component({
  selector: 'app-gastos-filtros',
  standalone: true,
  templateUrl: './gastos-filtros.component.html',
  styleUrls: ['./gastos-filtros.component.css'],
  imports: [FormsModule]  // Eliminamos NgIf y NgForOf porque no se usan
})
export class GastosFiltrosComponent {

  // el evento que emite los filtros al componente padre
  @Output() filtrosAplicados = new EventEmitter<any>();

  // las variables para los filtros
  categoriaSeleccionada: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  busqueda: string = '';

  //Método para aplicar los filtros que "emite" los filtros al componente padre.
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