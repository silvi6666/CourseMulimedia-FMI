export interface Person{
    id: number;
    fName: string;
    lName: string;
    email: string;
    contact?: Contact;
}

export interface Contact{
    address: string;
    city?: string;    
    country?: string;
    phone?: string;
}

export interface User extends Person{
    password: string;
    roles: Role[]; 
    readonly congratulation: string;
    getCongratulation(): string;
}

export enum Role{
    CUSTOMER, ADMIN
}

let nextId = 0;
export class Customer implements User{
    // private static nextId = 0;
    public id = nextId++;

    constructor(
        public fName: string,
        public lName: string,
        public email: string,
        public password: string,
        public contacts?: Contact,
        public roles: Role[] = [ Role.CUSTOMER ]) {
        }
    
    public get congratulation(){
            return `${this.fName} ${this.lName}`;
        }

    public getCongratulation() {
        return `Congratulation Method ${this.fName} ${this.lName}
        in role ${Role[this.roles[0]]}`;
        }
       
}

export class Admin implements User{
    public id = nextId++;

    constructor(
        public fName: string,
        public lName: string,
        public email: string,
        public password: string,
        public contacts?: Contact,
        public roles: Role[] = [ Role.ADMIN ]) {
        }
    
    public get congratulation(){
            return `${this.fName} ${this.lName}`;
        }

    public getCongratulation() {
        return `Congratulation Method ${this.fName} ${this.lName}
        in role ${Role[this.roles[0]]}`;
        }
       
}

// class Person {
//     public restNames: string[];

//     constructor(public fName: string, ...restNames: string[]) {
//         this.restNames = restNames;
//     }

//     public get salutation() {
//         let salutation = this.fName;
//         for (let name of this.restNames) {
//             salutation += ' ' + name;
//         }
//         return salutation;
//     }
//    }

 //  console.log(new Person('Ivan', 'Donchev', 'Petrov').salutation);