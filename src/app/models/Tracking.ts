export class Tracking{
    constructor(
        public date: Date,
        public weigth : number,
        public temperature: number,
        public presion: number,
        public saturation: number,
        public id?: string
    ){}
}