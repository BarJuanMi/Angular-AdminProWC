import { Usuario } from './usuario.model';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Vacunado {

    constructor(
        public _id: string,
        public farmaceutica: string,
        public fechaPriDosis: string,
        public fechaSegDosis: string,
        public fechaTerDosis: string,
        public fechaCuarDosis: string,
        public modelo: string,
        public regulador: string,
        public estado: string,
        public usuario: Usuario,
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