const express = require("express");
const path = require('path');
const fs = require('fs');
const {con, insrcd, showrcd, delrcd, getrcds, updrcd, swdbs} = require('../mysql');
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

router.get('/databases',(req,res)=>{
    swdbs((dbs)=>{
        res.render('database',{ls: dbs});
    });
})
router.get('/databases/:db',(req,res)=>{
    con.query(`USE ${req.params.db};`,(err,result)=>{
        if (err){
            res.render("404");
            return console.error(err);
        }
        else{
            con.query("SHOW TABLES;",(err,result)=>{
                if (err){
                    res.render("404");
                    return console.error(err);
                }
                else{
                    res.render('tables',{db: req.params.db, tables: result})
                }
            });
        }
    })
})

module.exports = router;