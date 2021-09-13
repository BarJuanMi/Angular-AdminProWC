import { Usuario } from './usuario.model';
export class Retiro {

    constructor(
        public _id: string,
        public modelo: string,
        public usuarioCreacion: string,
        public fechaRenuncia: Date,
        public estado: string,
        public motivoRetiro: string,
        public entrevista: boolean,
        public encuesta: boolean,
        public fechaFirma?: Date
    ) {}
}