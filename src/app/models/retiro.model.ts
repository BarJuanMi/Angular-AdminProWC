import { Empleado } from './empleado.model';

export class Retiro {
    constructor(
        public _id: string,
        public empleado: Empleado,
        public usuarioCreacion: string,
        public fechaRenuncia: Date,
        public fechaRegistro: Date,
        public estado: string,
        public motivoRetiro: string,
        public entrevista: boolean,
        public encuesta: boolean,
        public fechaFirma?: Date,
        public fechaCargoPDF?: Date,
        public usuarioCargoPDF?: string,
        public pathPDF?: string,
        public estadoCargoPDF?: boolean,
        public rutaCargueCompletaPDF?: string,
        public pathPDFNoExt?: string
    ) {}
}