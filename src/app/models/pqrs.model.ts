import { Empleado } from './empleado.model';
import { Sede } from './sede.util.model';
import { TipoPQRS } from './tipopqrs.model';
import { Usuario } from './usuario.model';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class PQRS {
    constructor(
        public _id: string,
        public detallePrimario: string,
        public prioridad: string,
        public estado: string,
        public evidencia: boolean,
        public fechaOcurrencia: Date,
        public fechaRegistro: Date,
        public sede: Sede,
        public empleadoAsociado: Empleado,
        public tipo: TipoPQRS,
        public usuarioRegistro: Usuario,
        public usuarioAsignado: Usuario,
        public respuestaAsociadaOne?: string,
        public respuestaAsociadaTwo?: string,
        public img?: string
    ) {}

    //Es como un metodo getter en java o un metodo normal, 
    //pero se marca con eso get para acceder al mismo sin usar las ()
    get imagenUrl() {
        if( !this.img ) {
            return `${ base_url }/files/uploads/obtener/pqrs/No_Image_Available`;
        } else if( this.img.includes('https') ) {
            return this.img;
        } else if( this.img ) {
            return `${ base_url }/files/uploads/obtener/pqrs/${ this.img }`;
        } else { 
            return `${ base_url }/files/uploads/obtener/pqrs/No_Image_Available`;
        }
        
    }
}