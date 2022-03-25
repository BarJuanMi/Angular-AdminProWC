import { PQRS } from '../models/pqrs.model';

export interface CargarPQRS {
    total: number; 
    pqrsi: PQRS[];
}