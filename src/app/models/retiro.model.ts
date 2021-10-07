import { Usuario } from './usuario.model';
import { ModeloWC } from './modelowc.model';
export class Retiro {

    constructor(
        public _id: string,
        public modelo: ModeloWC,
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