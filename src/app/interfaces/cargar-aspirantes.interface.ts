import { Aspirante } from '../models/aspirante.model';

export interface CargarAspirante {
    total: number; 
    aspirantes: Aspirante[];
}