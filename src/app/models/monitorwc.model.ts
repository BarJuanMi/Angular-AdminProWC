import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class MonitorWC {
    constructor (
        public _id: string,
        public documento: string,
        public tipoDocumento: string,
        public genero: string,
        public nombres: string,
        public apellidos: string,
        public fechaNac: string,
        public direccion: string,
        public emailCorporativo: string,
        public telCelular: string,
        public rh: string,
        public nomContEmer: string,
        public telContEmer: string,
        public fechaIngreso: string,
        public estado: boolean,
        public recomendado: boolean,
        public numHijos: string,
        public fechaCreacionApp: string,
        public numHuellero?: string,
        public entidadBanco?: string,
        public numCuentaBanco?: string,
        public fechaInactivacion?: string,
        public img?: string,
    ) {}

    //Es como un metodo getter en java o un metodo normal, 
    //pero se marca con eso get para acceder al mismo sin usar las ()
    get imagenUrl() {

        if( !this.img ) {
            return `${ base_url }/files/uploads/obtener/monitores/No_Image_Available`;
        } else if( this.img ) {
            return `${ base_url }/files/uploads/obtener/monitores/${ this.img }`;
        } else { 
            return `${ base_url }/files/uploads/obtener/monitores/No_Image_Available`;
        }
        
    }
}