import { Component }             from '@angular/core';
import { CommonModule }          from '@angular/common';
import { GastoFormComponent }    from '../../components/gasto-form/gasto-form.component';
import { EstadisticasComponent } from '../../components/estadisticas/estadisticas.component';
import { GraficosComponent }     from '../../components/graficos/graficos.component';
import { GastosListComponent }   from '../../components/gastos-list/gastos-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    GastoFormComponent,
    EstadisticasComponent,
    GraficosComponent,
    GastosListComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}