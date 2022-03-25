import { Usuario } from './usuario.model';
export class TipoPQRS {
    constructor (
        public _id: string,
        public tipopqrsId: string,
        public tipopqrsDesc: string,
        public usuarioAsig: Usuario,
    ) {}


    get tipoUsuConcat() {
        return this._id+'-'+this.usuarioAsig.uid;
    }
}