import { Prestamo } from '../models/prestamo.model';

export interface CargarPrestamo {
    total: number; 
    prestamos: Prestamo[];
}