import { Factura } from "../models/factura.model";


export interface CargarFactura {
    total: number; 
    facturas: Factura[];
}