const express = require("express");
const path = require("path");
const mysql = require('mysql2');
const app = express();

const port = 1200;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "Ketan114"
});

con.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log("Connected!");
});

function insrcd(name) {
    con.query('USE ketan;');
    con.query(`INSERT INTO ketantable(Name) VALUES ("${name}");`, function (err, result) {
        if (err) {
            return console.error('error: ' + err.message);
        }
    });
    con.query('SELECT * FROM ketantable;', (err, result) => {
        if (result[0].ID != 1) {
            con.query('ALTER TABLE ketantable AUTO_INCREMENT = 1;')
        }
        console.log("Result:" + JSON.stringify(result));
    });
}

// Middleware
// app.use(express.static(path.join(__dirname, 'templates')));
app.use('/', require('./routes/blog'));

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/ `);
});