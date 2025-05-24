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
  private apiUrl = 'http://localhost:3000/gastos';

  // Fuente de la verdad: BehaviorSubject que expone la lista de gastos
  private gastosSubject = new BehaviorSubject<Gasto[]>([]);
  public gastos$ = this.gastosSubject.asObservable();

  constructor(private http: HttpClient) {}

  // 1) Carga todos los gastos desde el servidor
  loadGastos(): void {
    this.http.get<Gasto[]>(this.apiUrl)
      .subscribe(lista => this.gastosSubject.next(lista));
  }

  // 2) Añade un gasto y recarga la lista
  addGasto(gasto: Omit<Gasto, 'id'>): Observable<Gasto> {
    return this.http.post<Gasto>(this.apiUrl, gasto)
      .pipe(
        tap(() => this.loadGastos())
      );
  }

  // 3) Elimina un gasto por ID y recarga la lista
  deleteGasto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => this.loadGastos())
      );
  }
}