import { CertificacionBancaria } from '../models/certbancaria.model';

export interface CargarCertBancaria {
    total: number; 
    certbancarias: CertificacionBancaria[];
}