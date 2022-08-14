const {con, insrcd, showrcd, delrcd, getrcds, updrcd, swdbs, getrcdsDB} = require('../mysql');
const express = require("express");
const router = express.Router();


router.get('/',(req,res)=>{
    swdbs((dbs)=>{
        res.render('databases',{ls: dbs});
    });
})

router.get('/:db',(req,res)=>{
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
                    result.forEach((elem)=>{
                        // elem.key = Object.keys(elem);
                        elem.value = Object.values(elem);
                    });
                    res.render('database',{dbname: req.params.db, tables: result })
                }
            });
        }
    })
});

router.get('/:db/:tb',(req,res)=>{
    con.query(`USE ${req.params.db};`,(err,result)=>{
        if (err){
            res.render("404");
            return console.error(err);
        }
        else{
            let value = [], keys;
            let elemno = [];
            getrcdsDB((result)=>{
                result.forEach((elem)=>{
                    keys = Object.keys(elem);
                    value = [...value,{value:  Object.values(elem)}];
                });
                res.render("tables",{tb: req.params.tb,records: result, values: value, keys: keys, elemno: elemno});
            },req.params.tb);
        }
    });
})

module.exports = router;