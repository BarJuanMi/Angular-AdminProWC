import { Ciudad } from "./ciudad.util.model";
import { Localidad } from "./localidad.util.model";

export class Sede {
    constructor(
        public _id: string,
        public nombre: string,
        public telefonoPrinc: number,
        public telefonoSec: number,
        public direccion: string,
        public ciudad: Ciudad,
        public localidad: Localidad
    ){}
}