export class ErrorFaltante {
    
    constructor(
        public value: string,
        public msg: string,
        public param: string,
        public location: string
    ){}
}