use employees_db;

INSERT INTO department(name)
VALUES
  ('Human Resources'),
  ('Accounting'),
  ('Sales'),
  ('Board of Directors');

INSERT INTO role(title, salary, department_id)
VALUES
  ('Training and Development', 20000, 1),
  ('Recruitment and Hiring', 19000, 1),
  ('Accountant', 80000, 2),
  ('Salesperson', 90000, 3),
  ('Chief Executive Officer', 1000000, 4),
  ('Chief Financial Officer', 900000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
  ('Ashley', 'Yu', 1, NULL),
  ('Eli', 'Plop', 2, NULL),
  ('Jennifer', 'Lee', 3, 1),
  ('Steve', 'Gomez', 4, 2),
  ('Walter', 'White', 5, 1),
  ('Jesse', 'Pinkman', 6, 1);