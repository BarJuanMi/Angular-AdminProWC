import { CargoAspirante } from './cargoaspirante.model';
import { Usuario } from './usuario.model';
import { Localidad } from './localidad.util.model';

export class Aspirante {
    constructor(
        public _id: string,
        public documento: string,
        public tipoDocumento: string,
        public nombres: string,
        public apellidos: string,
        public nombApellAspConcat: string,
        public edad: string,
        public email: string,
        public numCelular: string,
        public usuarioCreacion: Usuario,
        public cargoAspirante: CargoAspirante,
        public estado: string,
        public notasEntrevistador: string,
        public direccion: string,
        public localidad: Localidad,
        public experienciaPrevia: boolean,
        public fechaRegistro: Date,
        public fechaEntrevista?: Date,
        public pathResultadoPDF?: string,
        public estadoResCargoPDF?: boolean,
        public pathHojaVidaPDF?: string,
        public estadoHVCargoPDF?: boolean,
        public rutaCargueComplHVPDF?: string,
        public rutaCargueComplResPDF?: string
    ) {}
}