const mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "password",
    database: "ketan"
});

function insrcd(name) {
    con.query(`INSERT INTO ketantable(Name) VALUES ("${name}");`, function (err, result) {
        if (err) {
            return console.error('error: ' + err.message);
        }
        showrcd();
    });
}

function showrcd() {
    con.query('SELECT * FROM ketantable;', (err, result) => {
        console.log("Result:- \n" + JSON.stringify(result));
    });
}

function delrcd(ID){
    con.query(`DELETE FROM ketantable WHERE 'ID'='${ID}'`)
}

const getrcds = (code) =>{
    con.query('SELECT * FROM ketantable;',(err,result)=>{
        code(result);
    });
}

module.exports = {
    con: con,
    insrcd: insrcd,
    showrcd: showrcd,
    delrcd: delrcd,
    getrcds: getrcds
};