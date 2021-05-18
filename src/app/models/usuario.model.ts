import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {
    constructor (
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string //Opcional
    ) {}

    //Es como un metodo getter en java o un metodo normal, 
    //pero se marca con eso get para acceder al mismo sin usar las ()
    get imagenUrl() {

        if( !this.img ) {
            return `${ base_url }/files/uploads/obtener/usuarios/No_Image_Available`;
        } else if( this.img.includes('https') ) {
            return this.img;
        } else if( this.img ) {
            return `${ base_url }/files/uploads/obtener/usuarios/${ this.img }`;
        } else { 
            return `${ base_url }/files/uploads/obtener/usuarios/No_Image_Available`;
        }
        
    }

}