import { Customer, Admin } from "./users";


const bill = new Customer("Bill", "Smith", "bill@gamil.com", "bill");
const anna = new Admin("Anna", "Smith", "Anna@gamil.com", "Anna");

document.getElementById('content').innerHTML = `${bill.congratulation} and ${anna.congratulation}`;
document.getElementById('content1').innerHTML = `${bill.getCongratulation()} and ${anna.getCongratulation()}`;