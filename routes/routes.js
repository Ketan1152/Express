const express = require("express");
const path = require('path');
const fs = require('fs');
const {con, insrcd, showrcd, delrcd, getrcds, updrcd} = require('../mysql');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render("index",{current: "/"});
});
router.post('/',(req,res)=>{
    insrcd(req.body.name);
    res.render("index",{current: "/"});
});
router.get('/about',(req,res)=>{
    getrcds((result)=>{
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

module.exports = router;