import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { BaseChartDirective }               from 'ng2-charts';
import {
  Chart,
  registerables,
  ChartType,
  ChartConfiguration
} from 'chart.js';
import { Subscription }                     from 'rxjs';
import { GastosService, Gasto }             from '../../core/services/gastos.service';

// registra todos los features de chart.js (controladores, elementoss, escalas, plugins, etc.)
Chart.register(...registerables);

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './graficos.component.html',
})
export class GraficosComponent implements OnInit, OnDestroy {
  private sub!: Subscription;
  gastos: Gasto[] = [];

  // gRáfico de torta XD (Aprendí a poner emojis) 🍰
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Gasto por categoría' }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };

  // gráfico de líneas por mes 📈
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Gasto mensual', fill: false }]
  };
  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };

  constructor(private gastosService: GastosService) {}

  ngOnInit(): void {
    // toma de gastos y edita los dos gráficos
    this.sub = this.gastosService.gastos$.subscribe(list => {
      this.gastos = list;
      this.updatePieData();
      this.updateLineData();
    });
    // carga inicial del servicio
    this.gastosService.loadGastos();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private updatePieData(): void {
    const totals = this.gastos.reduce((acc, g) => {
      acc[g.categoria] = (acc[g.categoria] || 0) + g.importe;
      return acc;
    }, {} as Record<string, number>);

    this.pieChartData = {
      labels: Object.keys(totals),
      datasets: [{ data: Object.values(totals), label: 'Gasto por categoría' }]
    };
  }

  private updateLineData(): void {
    const totals = this.gastos.reduce((acc, g) => {
      const m = g.fecha.slice(0, 7); // estilo de año y mes modelo “YYYY-MM”
      acc[m] = (acc[m] || 0) + g.importe;
      return acc;
    }, {} as Record<string, number>);

    const months = Object.keys(totals).sort();
    this.lineChartData = {
      labels: months,
      datasets: [{
        data: months.map(m => totals[m]),
        label: 'Gasto mensual',
        fill: false
      }]
    };
  }
}