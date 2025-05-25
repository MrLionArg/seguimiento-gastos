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

// Register all Chart.js features (controllers, elements, scales, plugins…)
Chart.register(...registerables);

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit, OnDestroy {
  private sub!: Subscription;
  gastos: Gasto[] = [];

  // 🍰 Pie chart config
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Gasto por categoría' }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };

  // 📈 Line chart config
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
    // Subscribe to gastos$ and recalc both charts on change
    this.sub = this.gastosService.gastos$.subscribe(list => {
      this.gastos = list;
      this.updatePieData();
      this.updateLineData();
    });
    // Initial load
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
      const m = g.fecha.slice(0, 7); // “YYYY-MM”
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