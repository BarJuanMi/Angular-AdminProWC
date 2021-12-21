import { Usuario } from './usuario.model';
import { environment } from '../../environments/environment';
import { Empleado } from './empleado.model';

const base_url = environment.base_url;

export class Vacunado {

    constructor(
        public _id: string,
        public idRecortado: string,
        public farmaPriDosis: string,
        public farmaSecDosis: string,
        public farmaTerDosis: string,
        public farmaCuarDosis: string,
        public fechaPriDosis: Date,
        public fechaSecDosis: Date,
        public fechaTerDosis: Date,
        public fechaCuarDosis: Date,
        public empleado: Empleado,
        public regulador: string,
        public usuario: Usuario,
        public sintomatologia: boolean,
        public img?: string
    ) {}

    //Es como un metodo getter en java o un metodo normal, 
    //pero se marca con eso get para acceder al mismo sin usar las ()
    get imagenUrl() {
        if( !this.img ) {
            return `${ base_url }/files/uploads/obtener/vacunados/No_Image_Available`;
        } else if( this.img.includes('https') ) {
            return this.img;
        } else if( this.img ) {
            return `${ base_url }/files/uploads/obtener/vacunados/${ this.img }`;
        } else { 
            return `${ base_url }/files/uploads/obtener/vacunados/No_Image_Available`;
        }
        
    }
}