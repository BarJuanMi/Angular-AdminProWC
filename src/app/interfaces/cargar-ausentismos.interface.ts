import { Ausentismo } from '../models/ausentismo.model';

export interface CargarAusentismo {
    total: number; 
    ausentismos: Ausentismo[];
}