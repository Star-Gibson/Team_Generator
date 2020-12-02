//Constructors
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//Dependencies
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

//Arrays
let teamArray = [];

addMember();

function addMember() {
    inquirer.prompt([{
        type: 'list',
        message: "What is the employee's role within the company?",
        name: 'role',
        choices: ['Manager', 'Engineer', 'Intern']
    }]).then(function ({ role }) {
        if (role === 'Manager') { 
            addManager(); //Calls addManager
        };
        if (role === 'Engineer') {
            addEngineer(); //Calls addEngineer
        };
        if (role === 'Intern') {
            addIntern(); //Calls addIntern
        };
    })
};

//Manager Questionnaire/Function
function addManager() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the employee's name.",
            name: 'name'
        },
        {
            type: 'input',
            message: "Please enter the employee's company ID.",
            name: 'id'
        },
        {
            type: 'input',
            message: "Please enter the employee's email.",
            name: 'email'
        },
        {
            type: 'input',
            message: "What is the employee's office number?",
            name: 'officeNumber'
        },
        { type: 'list',
            message: "Would you like to add additional employees?",
            name: 'addition',
            choices: ['yes', 'no']
        }, 
    ]).then((manager) => {
        const newManager = new Manager(manager.name, manager.id, manager.email, manager.officeNumber)
        teamArray.push(newManager);//push to teamArray
        if(manager.addition === 'yes'){
            addMember();
        }
        else{
            renderTeam();
        }
        }
    )
}

//Engineer Questionnaire/Function
function addEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the employee's name.",
            name: 'name'
        },
        {
            type: 'input',
            message: "Please enter the employee's company ID.",
            name: 'id'
        },
        {
            type: 'input',
            message: "Please enter the employee's email.",
            name: 'email'
        },
        {
            type: 'input',
            message: "What is the employee's Github username?",
            name: 'github'
        },
        { type: 'list',
            message: "Would you like to add another employee?",
            name: 'addition',
            choices: ['yes', 'no']
        } 
    ]).then((engineer) => {
        const newEngineer = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github)
        teamArray.push(newEngineer);//Push to teamArray
        if(engineer.addition === 'yes'){
            addMember();
        }
        else{
            renderTeam();
        }
        }
    )
}

//Intern Questionnaire/Function
function addIntern() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the employee's name.",
            name: 'name'
        },
        {
            type: 'input',
            message: "Please enter the employee's company ID.",
            name: 'id'
        },
        {
            type: 'input',
            message: "Please enter the employee's email.",
            name: 'email'
        },
        {
            type: 'input',
            message: 'What University is the employee currently attending?',
            name: 'school'
        },
        { 
            type: 'list',
            message: "Would you like to add another employee?",
            name: 'addition',
            choices: ['yes', 'no']
        } 
    ]).then((intern) => {
        const newIntern = new Intern(intern.name, intern.id, intern.email, intern.school)
        teamArray.push(newIntern); //Push to teamArray
        if(intern.addition === 'yes'){
            addMember();
        }
        else{
            renderTeam();
        }
        
        }
    )
}
//Render Team Function
function renderTeam() {
    const fullTeam = render(teamArray);
    fs.writeFile(outputPath, fullTeam, (err) => 
    err ? console.log(err) : console.log("success!"))
 }

