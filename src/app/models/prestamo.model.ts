import { Usuario } from './usuario.model';
import { Empleado } from './empleado.model';

export class Prestamo {
    constructor(
        public _id: string,
        public monto: string,
        public empleado: Empleado,
        public usuario: string,
        public fechaCreacion: Date,
        public estado: string,
        public observaciones?: string,
        public fechaActualizacion?: Date,
        public usuarioActualizacion?: Usuario,
        public usuarioActNombre?: string
    ) {}
}