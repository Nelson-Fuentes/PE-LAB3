export class Pacient{

    constructor(
        public last_name : string,
        public first_name: string,
        public date_birth: string,
        public stature: number,
        public address: string,
        public latitude: number,
        public altitude: number,
        public id?: number
    ){}
}