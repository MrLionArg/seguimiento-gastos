import { Component } from '@angular/core';
import { GastoFormComponent } from '../../components/gasto-form/gasto-form.component';
import { GastosListComponent } from '../../components/gastos-list/gastos-list.component';
import { EstadisticasComponent } from '../../components/estadisticas/estadisticas.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [GastoFormComponent, GastosListComponent, EstadisticasComponent]
})
export class HomeComponent {

  filtrosAplicados: any = {};

  /** Método que recibe los filtros aplicados desde el componente de filtros
   * @param filtros - Objeto con los filtros aplicados */
  aplicarFiltros(filtros: any): void {
    this.filtrosAplicados = filtros;
    console.log('Filtros Aplicados:', this.filtrosAplicados);
  }
}

