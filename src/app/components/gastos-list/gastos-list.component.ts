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
  styleUrls: ['./gastos-list.component.css']
})
export class GastosListComponent implements OnInit, OnDestroy {
  // Formulario reactivo de filtros
  filterForm!: FormGroup;

  // Lista resultante tras aplicar filtros
  gastosFiltrados: Gasto[] = [];
  private sub!: Subscription;

  constructor(
    private gastosService: GastosService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // 1) Definimos el formulario de filtros
    this.filterForm = this.fb.group({
      categoria: [''],
      busqueda: [''],
      fechaInicio: [''],
      fechaFin: ['']
    });

    // 2) Cargamos los datos iniciales
    this.gastosService.loadGastos();

    // 3) Combinamos el stream de gastos con el de cambios en los filtros
    const filtros$ = this.filterForm.valueChanges.pipe(
      startWith(this.filterForm.value)
    );

    this.sub = combineLatest([
      this.gastosService.gastos$,
      filtros$
    ]).subscribe(([gastos, filtros]) => {
      this.gastosFiltrados = this.aplicarFiltros(gastos, filtros);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  eliminarGasto(id: number): void {
    this.gastosService.deleteGasto(id).subscribe();
  }

  /** Aplica los criterios recibidos sobre la lista completa */
  private aplicarFiltros(lista: Gasto[], filtros: any): Gasto[] {
    return lista.filter(gasto => {
      const { categoria, busqueda, fechaInicio, fechaFin } = filtros;
      const coincideCategoria = categoria
        ? gasto.categoria === categoria
        : true;
      const coincideBusqueda = busqueda
        ? gasto.descripcion.toLowerCase()
            .includes(busqueda.toLowerCase())
        : true;
      const coincideFechaInicio = fechaInicio
        ? gasto.fecha >= fechaInicio
        : true;
      const coincideFechaFin = fechaFin
        ? gasto.fecha <= fechaFin
        : true;
      return (
        coincideCategoria &&
        coincideBusqueda &&
        coincideFechaInicio &&
        coincideFechaFin
      );
    });
  }

  trackById(index: number, gasto: Gasto): number {
    return gasto.id;
  }
}