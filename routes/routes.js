const express = require("express");
const path = require('path');
const fs = require('fs');
const {con, insrcd, showrcd, delrcd, getrcds} = require('../mysql');
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
        res.render('names',{rcds: result});
    })
});

module.exports = router;