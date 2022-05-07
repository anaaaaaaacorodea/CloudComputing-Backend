// conectarea la baza de date

//aducem pachetele necesare
const mysql = require("mysql");
const dotenv = require("dotenv");

//acces la .env
dotenv.config();

//crearea conexiunii cu param din .env
const connection = mysql.createConnection({
  host: process.env.INSTANCE_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//testarea conexiunii
connection.connect(function (err) {
  if (!err) {
    console.log("Database is connected!");
  } else {
    console.log("Database is not connected... " + err);
  }
});

//export conexiune
module.exports = connection;