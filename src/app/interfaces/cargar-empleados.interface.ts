import { Empleado } from '../models/empleado.model';

export interface CargarEmpleado {
    total: number; 
    empleados: Empleado[];
}