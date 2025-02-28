import { Empleado } from './empleado.model';
import { EntBancaria } from './entbancaria.model';
import { TipoCuentaBanca } from './tipocuentabanca.model';
import { Usuario } from './usuario.model';

export class CertificacionBancaria {
    constructor(
        public _id: string,
        public numCuentaBanco: string,
        public emisorCuentaBanco: EntBancaria,
        public empleado: Empleado,
        public emplNomApel: string,
        public usuarioRegistro: Usuario,
        public fechaRegistro: Date,
        public tipoCuentaBanco: TipoCuentaBanca,
        public fechaCargoPDF ? : Date,
        public usuarioCargoPDF ? : Usuario,
        public pathPDF ? : string,
        public estadoCargoPDF ? : boolean,
        public rutaCargueCompletaPDF ? : string,
        public pathPDFNoExt ? : string,
    ) {}
}