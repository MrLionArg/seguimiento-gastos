import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgIf, CurrencyPipe } from '@angular/common';
import { GastosService, Gasto } from '../../core/services/gastos.service';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [NgIf, CurrencyPipe],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit, OnDestroy {
  gastos: Gasto[] = [];
  totalMensual: number = 0;
  gastoReciente: Gasto | null = null;
  promedioDiario: number = 0;

  private sub!: Subscription;

  constructor(private gastosService: GastosService) {}

  ngOnInit(): void {
    // Cálculo de lista de gastos para estadísticas
    this.sub = this.gastosService.gastos$.subscribe(lista => {
      this.gastos = lista;
      this.calcularEstadisticas();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private calcularEstadisticas(): void {
    if (this.gastos.length === 0) {
      this.totalMensual = 0;
      this.gastoReciente = null;
      this.promedioDiario = 0;
      return;
    }

    // Total del mes actual
    const mesActual = new Date().getMonth();
    const gastosDelMes = this.gastos.filter(g => new Date(g.fecha).getMonth() === mesActual);
    this.totalMensual = gastosDelMes.reduce((sum, g) => sum + g.importe, 0);

    // Gasto más reciente
    this.gastoReciente = this.gastos.reduce((latest, g) =>
      new Date(g.fecha) > new Date(latest.fecha) ? g : latest
    , this.gastos[0]);

    // Promedio diario (solo días con al menos un gasto)
    const diasConGasto = new Set(this.gastos.map(g => g.fecha)).size;
    this.promedioDiario = +(this.gastos.reduce((sum, g) => sum + g.importe, 0) / diasConGasto).toFixed(2);
  }
}