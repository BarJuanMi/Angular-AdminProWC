import { Usuario } from './usuario.model';
export class Retiro {

    constructor(
        public _id: string,
        public modelo: string,
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
        public estadoCargoPDF?: boolean
    ) {}
}