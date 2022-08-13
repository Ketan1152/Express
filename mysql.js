var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "Ketan",
  password: "12345678"
});

con.connect(function(err) {
//   if (err) throw err;
  console.log("Connected!");
});