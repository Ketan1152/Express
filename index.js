const express = require("express");
const path = require("path");
const app = express();

const port = 1200;

// Middleware
// app.use(express.static(path.join(__dirname, 'templates')));
app.use('/',require('./routes/blog'));

app.listen(port, ()=>{
    console.log(`Server started at http://localhost:${port}/ `);
});