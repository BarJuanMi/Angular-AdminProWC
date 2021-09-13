import { Retiro } from '../models/retiro.model';

export interface CargarRetiro {
    total: number; 
    retiros: Retiro[];
}