const mysql = require("mysql2");
const pool = mysql.createPool({
  connectionLimit: 5,
  //host: "10.101.94.217",
  host: "localhost",
  user: "1e",
  //password: "GtRe1320",
  password: "GtRe1320&", 
  database: "1e",

}).promise();

export {pool};