import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface Gasto {
  id: number;
  descripcion: string;
  categoria: string;
  importe: number;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private apiUrl = 'http://localhost:3000/gastos'; //url local para levantar gastos (Explicado en el txt)

  // la fuente de la verdad XD: BehaviorSubject muestra la lista de gastos
  private gastosSubject = new BehaviorSubject<Gasto[]>([]);
  public gastos$ = this.gastosSubject.asObservable();

  constructor(private http: HttpClient) {}

  // para cargar todos los gastos desde el servidor
  loadGastos(): void {
    this.http.get<Gasto[]>(this.apiUrl)
      .subscribe(lista => this.gastosSubject.next(lista));
  }

  // cuando añado un gasto y "Recargo" la lista
  addGasto(gasto: Omit<Gasto, 'id'>): Observable<Gasto> {
    return this.http.post<Gasto>(this.apiUrl, gasto)
      .pipe(
        tap(() => this.loadGastos())
      );
  }

  // elimino un gasto por ID y recarga la lista
  deleteGasto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => this.loadGastos())
      );
  }
}