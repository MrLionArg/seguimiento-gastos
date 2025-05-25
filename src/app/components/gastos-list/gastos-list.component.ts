import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForOf, NgIf, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, Subscription, startWith } from 'rxjs';

import { GastosService, Gasto } from '../../core/services/gastos.service';

@Component({
  selector: 'app-gastos-list',
  standalone: true,
  imports: [NgForOf, NgIf, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './gastos-list.component.html',
})
export class GastosListComponent implements OnInit, OnDestroy {
  filterForm!: FormGroup;
  gastosFiltrados: Gasto[] = [];
  private sub!: Subscription;

  constructor(
    private gastosService: GastosService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // inicio el formulario reactivo con todos los filtros y la opción de orden
    this.filterForm = this.fb.group({
      busqueda: [''],
      categoria: [''],
      fechaInicio: [''],
      fechaFin: [''],
      importeMin: [''],
      importeMax: [''],
      sortBy: ['fecha']  // criterio de 'fecha' o 'importe'
    });

    // cargar la lista inicial desde el servidor
    this.gastosService.loadGastos();

    // para combinar el pipe de gastos con los cambios de filtros
    const filtros$ = this.filterForm.valueChanges.pipe(
      startWith(this.filterForm.value)
    );

    this.sub = combineLatest([
      this.gastosService.gastos$,
      filtros$
    ]).subscribe(([lista, filtros]) => {
      this.gastosFiltrados = this.aplicarFiltrosYOrdenar(lista, filtros);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  eliminarGasto(id: number): void {
    this.gastosService.deleteGasto(id).subscribe();
  }

  // aplico los filtros de descripción, categoría, fechas e importes, y luego ordeno
  private aplicarFiltrosYOrdenar(lista: Gasto[], f: any): Gasto[] {
    const {
      busqueda,
      categoria,
      fechaInicio,
      fechaFin,
      importeMin,
      importeMax,
      sortBy
    } = f;

    let resultado = lista.filter(g => {
      const okDesc = busqueda
        ? g.descripcion.toLowerCase().includes(busqueda.toLowerCase())
        : true;
      const okCat = categoria ? g.categoria === categoria : true;
      const okFechaIni = fechaInicio ? g.fecha >= fechaInicio : true;
      const okFechaFin = fechaFin ? g.fecha <= fechaFin : true;
      const okImpMin = importeMin ? g.importe >= +importeMin : true;
      const okImpMax = importeMax ? g.importe <= +importeMax : true;
      return okDesc && okCat && okFechaIni && okFechaFin && okImpMin && okImpMax;
    });

    // ordeno según selección
    resultado = resultado.sort((a, b) => {
      if (sortBy === 'importe') {
        return b.importe - a.importe;       // mayor primero
      } else {
        return new Date(b.fecha).getTime()  // más reciente primero
             - new Date(a.fecha).getTime();
      }
    });

    return resultado;
  }

  trackById(_: number, gasto: Gasto): number {
    return gasto.id;
  }
}