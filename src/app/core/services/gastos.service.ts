import { Injectable, signal } from '@angular/core';

// Interfaz que define la estructura de un gasto
export interface Gasto {
  id: number;
  descripcion: string;
  categoria: string;
  importe: number;
  fecha: string;
}

@Injectable({
  providedIn: 'root',
})
export class GastosService {

  // Signal para gestionar los gastos
  private gastos = signal<Gasto[]>([]);

  /**
   * Obtener todos los gastos
   */
  getGastos(): Gasto[] {
    return this.gastos();
  }

  /**
   * Añadir un gasto
   */
  addGasto(gasto: Gasto): void {
    const nuevosGastos = [...this.gastos(), gasto];
    this.gastos.set(nuevosGastos);
  }

  /**
   * Eliminar un gasto por ID
   */
  deleteGasto(id: number): void {
    const nuevosGastos = this.gastos().filter(gasto => gasto.id !== id);
    this.gastos.set(nuevosGastos);
  }
}