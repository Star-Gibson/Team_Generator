// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
//Require Employee
const Employee = require('./Employee');

//Sub Class - Manager
class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber
    }
    getRole(){
        return "Manager";
    }
    getOfficeNumber(){
        return this.officeNumber
    }
}

module.exports = Manager;