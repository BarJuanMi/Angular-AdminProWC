import { Contrato } from '../models/contrato.model';

export interface CargarContrato {
    total: number; 
    contratos: Contrato[];
}