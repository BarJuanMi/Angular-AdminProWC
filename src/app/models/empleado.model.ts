import { Usuario } from './usuario.model';
import { environment } from '../../environments/environment';
import { TipoEmpleado } from './tipoempleado.model';
import { Pais } from './pais.util.model';
import { Ciudad } from './ciudad.util.model';

const base_url = environment.base_url;

export class Empleado {
    
    constructor(
        public _id: string,
        public documento: string,
        public tipoDocumento: string,
        public genero: string,
        public nombres: string,
        public apellidos: string,
        public nombApellConca: string,
        public tipoEmpleado: TipoEmpleado,
        public fechaNac: Date,
        public direccion: string,
        public emailCorporativo: string,
        public telCelular: string,
        public rh: string,
        public nomContEmer: string,
        public telContEmer: string,
        public fechaIngreso: Date,
        public estado: boolean,
        public numHijos: string,
        public fechaCreacionApp: Date,
        public nacionalidad: Pais,
        public ciudadResidencia: Ciudad,
        public epsSalud: string,
        public arlTrabajo: string,
        public usuarioCreacion?: Usuario,
        public numHuellero?: string,
        public fechaInactivacion?: Date,
        public img?: string
    ){}

    //Es como un metodo getter en java o un metodo normal, 
    //pero se marca con eso get para acceder al mismo sin usar las ()
    get imagenUrl() {

        if( !this.img ) {
            return `${ base_url }/files/uploads/obtener/empleados/No_Image_Available`;
        } else if( this.img ) {
            return `${ base_url }/files/uploads/obtener/empleados/${ this.img }`;
        } else { 
            return `${ base_url }/files/uploads/obtener/empleados/No_Image_Available`;
        }
        
    }
}