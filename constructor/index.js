const connection = require('../config/connection');

class employeeDB {
  constructor(connection) {
    this.connection = connection;
  };
  viewAllEmployees() {
    return this.connection.promise().query(
    `SELECT employee.id, 
    employee.first_name, 
    employee.last_name,
    role.title, 
    department.name AS department, 
    role.salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`
    );
  };
  createEmployee(employee) {
    return this.connection.promise().query(
      `INSERT INTO employee SET ?`, employee
      );
  };
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.promise().query(
      `UPDATE employee SET role_id = ? WHERE id = ?`, [employeeId, roleId]
    );
  };
  viewAllRoles() {
    return this.connection.promise().query(
      `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id`
    );
  };
  createRole(role) {
    return this.connection.promise().query(
      `INSERT INTO role SET ?`, role
    );
  };
  viewAllDepartments() {
    return this.connection.promise().query(
      `SELECT department.id, department.name FROM department`
    );
  };
  createDepartment(department) {
    return this.connection.promise().query(
      `INSERT INTO department SET ?`, department
      );
  };
};

module.exports = new employeeDB(connection);