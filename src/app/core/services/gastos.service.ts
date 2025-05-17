// Importamos los módulos necesarios de Angular
import { Injectable, signal } from '@angular/core';

/**
 * Interfaz para un Gasto
 */
export interface Gasto {
  id: number;
  descripcion: string;
  categoria: string;
  importe: number;
  fecha: string;
}

/**
 * Servicio de Gastos
 * - Gestiona la lista de gastos y permite añadir, eliminar y listar gastos.
 */
@Injectable({
  providedIn: 'root'
})
export class GastosService {

  // Lista de gastos utilizando signal para reactividad
  private gastos = signal<Gasto[]>([]);

  /**
   * Obtiene la lista completa de gastos
   */
  getGastos(): Gasto[] {
    return this.gastos();
  }

  /**
   * Añade un nuevo gasto a la lista
   * @param gasto - Objeto Gasto a añadir
   */
  addGasto(gasto: Partial<Gasto>): void {
    const nuevoGasto: Gasto = {
      id: Date.now(),
      descripcion: gasto.descripcion || '',
      categoria: gasto.categoria || '',
      importe: gasto.importe || 0,
      fecha: gasto.fecha || ''
    };

    console.log('Añadiendo gasto:', nuevoGasto);

    // Actualizamos la lista de gastos
    this.gastos.set([...this.gastos(), nuevoGasto]);
  }

  /**
   * Elimina un gasto por su ID
   * @param id - ID del gasto a eliminar
   */
  deleteGasto(id: number): void {
    console.log('Eliminando gasto con ID:', id);

    // Filtramos la lista de gastos eliminando el gasto con el ID especificado
    const gastosActualizados = this.gastos().filter(gasto => gasto.id !== id);
    this.gastos.set(gastosActualizados);
  }
}