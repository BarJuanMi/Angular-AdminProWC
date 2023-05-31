import { Empleado } from './empleado.model';
import { TipoContrato } from './tipocontrato.model';
import { Usuario } from './usuario.model';

export class Contrato {
    constructor(
        public _id: string,
        public empleado: Empleado,
        public emplNomApel: string,
        public estado: string,
        public usuarioRegistro: Usuario,
        public fechaRegistro: Date,
        public tipoContrato: TipoContrato,
        public fechaInicioContrato: Date,
        public fechaFinContrato ? : Date,
        public observaciones ? : string,
        public fechaCargoPDF ? : Date,
        public usuarioCargoPDF ? : Usuario,
        public pathPDF ? : string,
        public estadoCargoPDF ? : boolean,
        public rutaCargueCompletaPDF ? : string,
        public pathPDFNoExt ? : string,
        public fechaCargueDocsZIP ? : Date,
        public usuarioCargueDocsZIP ? : Usuario,
        public pathDocsZIP ? : string,
        public estadoCargueDocsZIP ? : boolean,
        public rutaCargueCompletaZIP ? : string,
        public pathZIPNoExt ? : string,
        public detallesCambioEstado ? : string,
    ) {}
}