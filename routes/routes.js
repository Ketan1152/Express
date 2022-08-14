const express = require("express");
const path = require('path');
const {con, insrcd, delrcd, getrcds, updrcd} = require('../mysql');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render("index");
});
router.post('/',(req,res)=>{
    insrcd(req.body.name);
    res.render("index");
});
router.get('/about',(req,res)=>{
    getrcds((result)=>{
        result.forEach((elem) => {
            elem.keys = Object.keys(elem);
            console.log(elem.keys);
        });
        res.render('names',{rcds: result});
    })
});
router.post('/about',(req,res)=>{
    updrcd(req.body.prevname,req.body.name);
    getrcds((result)=>{
        res.render('names',{rcds: result});
    })
});
router.post('/del/:ID',(req,res)=>{
    delrcd(req.params.ID);
    console.log(req.params.ID);
    res.redirect('/about');
})

router.get('/about/:ID',(req,res)=>{
    con.query(`SELECT * FROM ketantable WHERE ID = ${req.params.ID}`,(err,result)=>{
        res.render('edit',{obj: result});
    })
})

router.use('/databases', require(path.join(__dirname, 'dbs')));

module.exports = router;