import { Sede } from "./sede.util.model";
import { Usuario } from "./usuario.model";
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Servlavanderia {
    constructor(
        public _id: string,
        public cantidadColchas: string,
        public sede: Sede,
        public estado: string,
        public usuarioRegistro: Usuario,
        public fechaRegistro: Date,
        public fechaSalidaColchas: Date,
        public fechaRecibeColchas?: Date,
        public obsSalidaColchas?: string,
        public obsRecibeColchas?: string,
        public recibeSatisfaccion?: boolean,
        public usuarioRecibeColchas?: Usuario,
        public idCorto?: string,
        public img?: string
    ){}

    //Es como un metodo getter en java o un metodo normal, 
    //pero se marca con eso get para acceder al mismo sin usar las ()
    get imagenUrl() {

        if( !this.img ) {
            return `${ base_url }/files/uploads/obtener/servlavanderia/No_Image_Available`;
        } else if( this.img.includes('https') ) {
            return this.img;
        } else if( this.img ) {
            return `${ base_url }/files/uploads/obtener/servlavanderia/${ this.img }`;
        } else { 
            return `${ base_url }/files/uploads/obtener/servlavanderia/No_Image_Available`;
        }
        
    }
}