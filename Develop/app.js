const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let employees = [];
const role = ["Manager", "Engineer", "Intern"]

function init(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the employees name that you want to add?",
            name: "name"
        },
        {
            type: "list",
            message: "what is their role?",
            name: "role",
            choices: role

        },
        {
            type: "input",
            message: "what is their id?",
            name: "id"
        },
        {
            type: "input",
            message: "what is their email address?",
            name: "email"
        },

    ]).then(function (data) {

        if (data.role === "Manager") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is your office number?",
                    name: "officeNumber"
                }
            ]).then(function (role) {

                const manager = new Manager(data.name, data.id, data.email, role.officeNumber,);
                employees.push(manager);
                repeat();
            })

        }
        else if (data.role === "Engineer") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is your Github account?",
                    name: "github"
                }
            ]).then(function (role) {
                const engineer = new Engineer(data.name, data.id, data.email, role.github)

                employees.push(engineer)

                repeat();
            })
        }
        else if (data.role === "Intern") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is your Schools name?",
                    name: "school"
                }
            ]).then(function (role) {
                const intern = new Intern(data.name, data.id, data.email, role.school)

                employees.push(intern);

                repeat();



            })
        }
    })
}


init();

function repeat() {
inquirer.prompt([
    {
        type: "list",
        message: "Do you want to add another employee details?",
        name: "yes",
        choices: ["yes", "No"]
    }
]).then(function (reply) {
    if (reply.yes === "yes") {
        init();
    }
    else {
        const html = render(employees);
        fs.writeFile("output/team.html", html, function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log("Succesfully created!")
        })

    }
})

}
