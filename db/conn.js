const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password",
  database: "blog_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connect to my SQL");
});

module.exports = connection;
