import { CausalRetiro } from './causalesretiro.model';
import { Empleado } from './empleado.model';

export class Retiro {
    constructor(
        public _id: string,
        public empleado: Empleado,
        public emplNomApel: string,
        public usuarioRegistro: string,
        public fechaRenuncia: Date,
        public fechaRegistro: Date,
        public estado: string,
        public motivoRetiro: string,
        public entrevista: boolean,
        public encuesta: boolean,
        public causalRetiro: CausalRetiro,
        public fechaFirma?: Date,
        public fechaCargoPDF?: Date,
        public usuarioCargoPDF?: string,
        public pathPDF?: string,
        public estadoCargoPDF?: boolean,
        public rutaCargueCompletaPDF?: string,
        public pathPDFNoExt?: string
    ) {}
}