import { Component } from '@angular/core';
import { GastoFormComponent } from '../../components/gasto-form/gasto-form.component';
import { GastosListComponent } from '../../components/gastos-list/gastos-list.component';
import { EstadisticasComponent } from '../../components/estadisticas/estadisticas.component';
import { GastosFiltrosComponent } from '../../components/gastos-filtros/gastos-filtros.component';

/**
 * Componente Home
 * - Componente principal de la aplicación.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    GastoFormComponent,
    GastosListComponent,
    EstadisticasComponent,
    GastosFiltrosComponent
  ]
})
export class HomeComponent {

  // Objeto que almacena los filtros aplicados
  filtrosAplicados: any = {};

  /**
   * Método para recibir los filtros aplicados
   * @param filtros - Objeto con los filtros
   */
  aplicarFiltros(filtros: any): void {
    console.log('Filtros recibidos en HomeComponent:', filtros);
    this.filtrosAplicados = filtros;
  }
}