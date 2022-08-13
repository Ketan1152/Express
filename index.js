const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { engine } = require('express-handlebars')
const {con, insrcd, showrcd, delrcd, getrcds} = require('./mysql');
const app = express();

const port = 1200;

con.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log("Connected!");
    showrcd();
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use('/', require('./routes/routes'),(err,result)=>{
    if (err){
        throw err;
    }
    console.log(result);
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/ `);
});