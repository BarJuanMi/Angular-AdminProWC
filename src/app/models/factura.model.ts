import { Empleado } from './empleado.model';
import { Sede } from './sede.util.model';
import { TipoCompraFactura } from './tipocomprafactura.model';
import { Usuario } from './usuario.model';

export class Factura {
    constructor(
        public _id: string,
        public fechaFactura: Date,
        public montoFactura: number,
        public grupoFacturas: boolean,
        public tipoCompraFactura: TipoCompraFactura,
        public vendedorFactura: string,
        public usuarioRegistro: Usuario,
        public sede: Sede,
        public fechaRegistro: Date,
        public observaciones ? : string,
        public retribuible ? : boolean,
        public usuarioRetribuible ? : Usuario,
        public fechaCargueDocsZIP ? : Date,
        public usuarioCargueDocsZIP ? : Usuario,
        public pathDocsZIP ? : string,
        public estadoCargueDocsZIP ? : boolean,
        public rutaCargueCompletaZIP ? : string,
        public pathZIPNoExt ? : string,
    ) {}
}