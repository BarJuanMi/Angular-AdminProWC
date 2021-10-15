import { Vacunado } from '../models/vacunado.model';

export interface CargarVacunado {
    total: number; 
    vacunados: Vacunado[];
}