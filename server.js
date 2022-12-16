const db = require('./constructor/index');
const inquirer = require('inquirer');
require("console.table");

startPrompt();

async function startPrompt() {
  await inquirer.prompt ([
    {
      type: 'list',
      name: 'choice',
      message: 'Choose from the options',
      choices: [
        'View All Employees',
        'View All Roles',
        'Update Employee Role',
        'View All Departments',
        'Create New Employee',
        'Create New Role',
        'Create New Department'
      ]
  }
  ]).then( result => {
    switch (result.choice) {
      case 'View All Employees':
        AllEmployees();
        break;
      case 'View All Roles':
        AllRoles();
        break;
      case 'Update Employee Role':
        changeEmployeeRole();
        break;
      case 'View All Departments':
        AllDepartments();
        break;
      case 'Create New Employee':
        addEmployee();
        break;
      case 'Create New Role':
        addRole();
        break;
      case 'Create New Department':
        addDepartment();
        break;
    }
  })
};

function AllEmployees() {
  db.viewAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log('\n');
      console.table(employees);
    })
    .then(() => startPrompt());
};

function AllRoles() {
  db.viewAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log('\n');
      console.table(roles);
    })
    .then(() => startPrompt());
};

function changeEmployeeRole() {
  db.viewAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Whose role would you like to update?',
          choices: employeeChoices
        }
      ])
      .then(result => {
        let employeeId = result.employeeId;
        db.viewAllRoles()
          .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
              name: title,
              value: id
            }));

            inquirer.prompt([
              {
                type: 'list',
                name: 'roleId',
                message: 'Which role would you like to assign?',
                choices: roleChoices
              }
            ])
            .then (result => db.updateEmployeeRole(employeeId, result.roleId))
            .then(() => startPrompt());
          })
      })
    })
};

function AllDepartments() {
  db.viewAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log('\n');
      console.table(departments);
    })
    .then(() => startPrompt());
};

function addEmployee() {
  inquirer.prompt([
    {
      name: 'first_name',
      message: "First name of employee:"
    },
    {
      name: 'last_name',
      message: "Last name of employee:"
    }
  ])
    .then(result => {
      let firstName = result.first_name;
      let lastName = result.last_name;

      db.viewAllRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));

          inquirer.prompt(
            {
              type: 'list',
              name: 'roleId',
              message: "What is the employee's role?",
              choices: roleChoices
          })
            .then(result => {
              const roleId = result.roleId;

              db.viewAllEmployees()
              .then(([rows]) => {
                let employees = rows;
                const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }));

                inquirer.prompt(
                  {
                   type: 'list',
                   name: 'managerId',
                   message: "Who is the manager of this employee?",
                   choices: managerChoices 
                  })
                    .then(result => {
                      const employee = {
                        manager_id: result.managerId,
                        role_id: roleId,
                        first_name: firstName,
                        last_name: lastName
                      }

                      db.createEmployee(employee);
                    })
                    .then(() => startPrompt());
                })
            })
        })
    })
};

function addRole() {
  db.viewAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      inquirer.prompt([
        {
          name: 'title',
          message: "What is the role called?"
        },
        {
          name: 'salary',
          message: "What is the salary?"
        },
        {
          name: 'department_id',
          type: 'list',
          message: "What department is the role in?",
          choices: departmentChoices
        }
      ])
        .then(role => {
          db.createRole(role)
            .then(() => startPrompt());
        })
    })
};

function addDepartment() {
  inquirer.prompt([
    {
      name: 'name',
      message: "Name of department:"
    }
  ])
    .then(result => {
      const name = result;
      db.createDepartment(name)
        .then(() => startPrompt());
    })
};
