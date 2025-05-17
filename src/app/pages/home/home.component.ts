import { Component } from '@angular/core';
import { GastoFormComponent } from '../../components/gasto-form/gasto-form.component';
import { GastosListComponent } from '../../components/gastos-list/gastos-list.component';
import { EstadisticasComponent } from '../../components/estadisticas/estadisticas.component';
import { GastosFiltrosComponent } from '../../components/gastos-filtros/gastos-filtros.component';

/* Componente Principal - Home
                        - Muestra el formulario para añadir gastos
                        - Muestra las estadísticas de gastos
                        - Muestra los filtros y la lista de gastos
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
  // Objeto que almacenará los filtros aplicados
  filtrosAplicados: any = {};

  // Recibe los filtros aplicados y los almacena
  aplicarFiltros(filtros: any): void {
    this.filtrosAplicados = filtros;
  }
}