import { Servlavanderia } from '../models/servlavanderia.model';

export interface CargarLavanderia {
    total: number; 
    servlavanderias: Servlavanderia[];
}