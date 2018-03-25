import { User } from "./user";

export class Profiles extends User {
    constructor(
        public name:string,
        public login:string,
        public image:string,
        public location:string,
        public company:string,
        public email:string,
        public followers:User[]
    ) {
        super(name,login,image,location,company,email);
    }
}