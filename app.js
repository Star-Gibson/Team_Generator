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

//Manager Questionnaire
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
        console.log(newManager); //Works
        teamArray.push(newManager);//push to teamArray
        console.log(teamArray);

        if(manager.addition === 'yes'){
            addMember();
        }
        else{
            renderTeam();
        }
        
        }
    )
}

//Engineer Questionnaire
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
        console.log(newEngineer); // Works
        teamArray.push(newEngineer);//Push to teamArray
        console.log(teamArray);
        if(engineer.addition === 'yes'){
            addMember();
        }
        else{
            renderTeam();
        }
    
        }
    )
}

//Intern Questionnaire
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
        console.log(newIntern); //Works
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


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
