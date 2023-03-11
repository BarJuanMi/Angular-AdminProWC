import { Empleado } from './empleado.model';
import { TipoAusentismo } from './tipoausentismo.model';
import { Usuario } from './usuario.model';

export class Ausentismo {
    constructor(
        public _id: string,
        public empleado: Empleado,
        public estado: string,
        public tipoAusentismo: TipoAusentismo,
        public fechaInicio: Date,
        public fechaFinalizacion: Date,
        public emplNomApel: string,
        public usuarioRegistro: Usuario,
        public fechaRegistro: Date,
        public obserAprobRecha?: string,
        public fechaAprobRecha?: Date,
        public usuarioAprobRecha?: Usuario,
        public fechaCargoPDF?: Date,
        public usuarioCargoPDF?: Usuario,
        public pathPDF?: string,
        public estadoCargoPDF?: boolean,
        public rutaCargueCompletaPDF?: string,
        public pathPDFNoExt?: string
    ) {}
}