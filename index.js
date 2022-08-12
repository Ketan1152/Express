const express = require("express");
const path = require("path");
const app = express();

const port = 1200;

// Middleware
app.use(express.static(path.join(__dirname, 'templates')));

app.get('/',(req,res)=>{
    // res.send(`Hello World!`);
    res.json({"name":"Ketan"});
});

app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,'templates/index.html'));
})

app.get('/about/:name',(req,res)=>{
    res.send('Hello '+req.params.name);
})

app.listen(port, ()=>{
    console.log(`Server started at http://localhost:${port}/ `);
});