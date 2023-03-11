import { Empleado } from './empleado.model';
import { Usuario } from './usuario.model';

export class Memorando {
    constructor(
        public _id: string,
        public empleado: Empleado,
        public emplNomApel: string,
        public estado: string,
        public usuarioRegistro: Usuario,
        public fechaRegistro: Date,
        public descripcion: string,
        public normaInfringida: string,
        public posiblesConsecuencias: string,
        public fechaEvento: Date,
        public respuestaDeMemo: string,
        public fechaCargoPDF?: Date,
        public usuarioCargoPDF?: Usuario,
        public pathPDF?: string,
        public estadoCargoPDF?: boolean,
        public rutaCargueCompletaPDF?: string,
        public pathPDFNoExt?: string
    ) {}
}