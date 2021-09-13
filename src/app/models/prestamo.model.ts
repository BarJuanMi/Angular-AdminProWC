import { Usuario } from './usuario.model';
export class Prestamo {

    constructor(
        public _id: string,
        public monto: string,
        public modelo: string,
        public usuario: string,
        public fechaCreacion: Date,
        public estado: string,
        public observaciones?: string,
        public fechaActualizacion?: Date,
        public usuarioActualizacion?: Usuario,
        public usuarioActNombre?: string
    ) {}
}