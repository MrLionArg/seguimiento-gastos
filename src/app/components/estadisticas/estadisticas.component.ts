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
  // acá se inicia un lote vacío para almacenar los gastos recibidos
  gastos: Gasto[] = [];
  // para guardar la suma de los gastos del mes actual
  totalMensual: number = 0;
  //  almacena el gasto con la fecha más reciente
  gastoReciente: Gasto | null = null;
  // esto sirve para calcular el promedio diario de gastos
  promedioDiario: number = 0;

  // Suscripción que escucha cambios en la lista de gastos
  private sub!: Subscription;

  constructor(private gastosService: GastosService) {
    // se inyecta el servicio para acceder a los datos de gastos
  }

  ngOnInit(): void {
    // Se suscribe al flujo de gastos para actualizar las estadísticas automáticamente
    this.sub = this.gastosService.gastos$.subscribe(lista => {
      this.gastos = lista;
      // acá llamo al cálculo de estadísticas cada vez que cambian los datos
      this.calcularEstadisticas();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // total mensual, gasto reciente y el promedio de gasto diario
  private calcularEstadisticas(): void {
    // aquí se verigicia si no hay gastos para inicializar todo a cero
    if (this.gastos.length === 0) {
      this.totalMensual = 0;
      this.gastoReciente = null;
      this.promedioDiario = 0;
      return;
    }

    // filtros de gastos correspondientes al mes actual
    const mesActual = new Date().getMonth();
    const gastosDelMes = this.gastos.filter(g =>
      new Date(g.fecha).getMonth() === mesActual
    );
    // Esto sirve para obtener la suma de importes de este mes
    this.totalMensual = gastosDelMes.reduce((sum, g) => sum + g.importe, 0);

    // Se busca el gasto más reciente comparando fechas
    this.gastoReciente = this.gastos.reduce((ultimo, g) =>
      new Date(g.fecha) > new Date(ultimo.fecha) ? g : ultimo,
      this.gastos[0]
    );

    // para saber cuántos días únicos tienen al menos un gasto
    const diasUnicos = new Set(this.gastos.map(g => g.fecha)).size;
    // calculo el promedio diario con formato de dos decimales
    this.promedioDiario = +(
      this.gastos.reduce((sum, g) => sum + g.importe, 0) / diasUnicos
    ).toFixed(2);
  }
}