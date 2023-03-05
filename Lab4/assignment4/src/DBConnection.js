const mysql = require("mysql"); //Creating an instance of mysql server and establishing a connection

function newConnection() {
  let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password!",
    database: "postOffice",
  });
  return conn;
}

module.exports = newConnection;
