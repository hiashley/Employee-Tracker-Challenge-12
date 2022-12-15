const mysql = require('mysql2');
require('dotenv').config();

const mysql = mysql.createConnection(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_HOST
);

connection.connect(err => {
  if (err) throw err;
});

module.exports = connection;