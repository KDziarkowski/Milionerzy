const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var jwt = require('jsonwebtoken');
var connection = require('../database.js');


router.get('/instruction',(req, res) => {


    res.render('../views/instruction');
});

router.get('/ranking',(req, res) => {
    let sql = 'SELECT login, najlepszy_wynik FROM uzytkownicy ORDER BY najlepszy_wynik DESC';
    connection.query(sql, function(err, result){

        if(err){
            throw err;
        }
        res.render('../views/ranking.ejs', {data: result, message: ""});
    })
});

router.get('/',(req, res) => {
    res.render('../views/login');
});
router.get('/register',(req,res) => {
    res.render('../views/registration');
});


router.get('/game', (req, res) =>{
    var highlighted;
    var token = req.cookies.SesionCookie;
    var decotedInfo = jwt.verify(token,process.env.JWT_KEY);
    var id = decotedInfo.id;
    let sql = 'SELECT * FROM uzytkownicy WHERE id = ?';
    connection.query(sql,[id], function(error, result){
        highlighted = result[0].najlepszy_wynik_tura;

    })
    sql = 'SELECT * FROM pytania';
     connection.query(sql, function(err, results){
        let question_nr = Math.floor(Math.random() * (results.length + 1));
        let row = results[question_nr];
        connection.query('INSERT INTO gra SET ?', {pytanie:row.pytanie, odp1:row.odp1, odp2:row.odp2, odp3:row.odp3, odp4:row.odp4, poprawna_odp:row.poprawna_odp}, (error, result) => {

            if(err){
                throw err
            }
    
                   res.render('../views/game.ejs', { data: row,highlighted:highlighted, message: ""});
         })
        });

     
});

router.get('/check1', (req, res) =>{
    var highlighted;
    connection.query('SELECT * FROM gra', (error, result_gra) => {
        if(error){  throw error;}

        correct_answer = result_gra[result_gra.length-1].poprawna_odp;
        var token = req.cookies.SesionCookie;
        var decotedInfo = jwt.verify(token,process.env.JWT_KEY);
        var id = decotedInfo.id;
        if(correct_answer == 1){
            let sql = 'UPDATE uzytkownicy SET najlepszy_wynik_tura = najlepszy_wynik_tura + 1 WHERE id = ?'
            connection.query(sql,[id], function(err, results){

                if(err){throw err; }
            })
            sql = 'SELECT * FROM uzytkownicy WHERE id = ?';
            connection.query(sql,[id], function(error, result){
                console.log("kwota" + result[0].najlepszy_wynik_tura);
                highlighted = result[0].najlepszy_wynik_tura;
               // document.getElementById("kwota" + result[0].najlepszy_wynik_tura).style.backgroundColor = "green";
            })

        }else{
            let sql = 'UPDATE uzytkownicy SET najlepszy_wynik = IF(najlepszy_wynik_tura > najlepszy_wynik, najlepszy_wynik_tura, najlepszy_wynik) WHERE id = ?';
            connection.query(sql,[id], function(err, results){
                if(err){throw err; }
            })
            sql = 'UPDATE uzytkownicy SET najlepszy_wynik_tura = 0 WHERE id = ?';
            connection.query(sql,[id], function(err, results){
                if(err){throw err; }
            })
        }
        let sql = 'SELECT * FROM pytania'
        connection.query(sql, function(err, results){
           let question_nr = Math.floor(Math.random() * (results.length + 1));
   
           let row = results[question_nr];
           connection.query('INSERT INTO gra SET ?', {pytanie:row.pytanie, odp1:row.odp1, odp2:row.odp2, odp3:row.odp3, odp4:row.odp4, poprawna_odp:row.poprawna_odp}, (error, result) => {
               if(err){ throw err}
                res.render('../views/game.ejs', { data: row, highlighted: highlighted, message: ""});
            })
           });
    })


     
});
router.get('/check2', (req, res) =>{
    var highlighted;
    connection.query('SELECT * FROM gra', (error, result_gra) => {
        if(error){ throw error;}

        correct_answer = result_gra[result_gra.length-1].poprawna_odp;
        var token = req.cookies.SesionCookie;
        var decotedInfo = jwt.verify(token,process.env.JWT_KEY);
        var id = decotedInfo.id;

        if(correct_answer == 2){
            let sql = 'UPDATE uzytkownicy SET najlepszy_wynik_tura = najlepszy_wynik_tura + 1 WHERE id = ?'
            connection.query(sql,[id], function(err, results){
                if(err){throw err; }
            })
            sql = 'SELECT * FROM uzytkownicy WHERE id = ?';

            connection.query(sql,[id], function(error, result){
                console.log("kwota" + result[0].najlepszy_wynik_tura);
                highlighted = result[0].najlepszy_wynik_tura;
                //document.getElementById("kwota" + result[0].najlepszy_wynik_tura).style.backgroundColor = "green";
            })


            }else{
                let sql = 'UPDATE uzytkownicy SET najlepszy_wynik = IF(najlepszy_wynik_tura > najlepszy_wynik, najlepszy_wynik_tura, najlepszy_wynik) WHERE id = ?';
                connection.query(sql,[id], function(err, results){
                    if(err){throw err; }
                })
                sql = 'UPDATE uzytkownicy SET najlepszy_wynik_tura = 0 WHERE id = ?';
                connection.query(sql,[id], function(err, results){
                    if(err){throw err; }
                })
            }
            let sql = 'SELECT * FROM pytania'
            connection.query(sql, function(err, results){
               let question_nr = Math.floor(Math.random() * (results.length + 1));
       
               let row = results[question_nr];
               connection.query('INSERT INTO gra SET ?', {pytanie:row.pytanie, odp1:row.odp1, odp2:row.odp2, odp3:row.odp3, odp4:row.odp4, poprawna_odp:row.poprawna_odp}, (error, result) => {
                   if(err){ throw err}
                    res.render('../views/game.ejs', { data: row,highlighted: highlighted, message: ""});
                })
               });
    })   
});
router.get('/check3', (req, res) =>{
    var highlighted;
    connection.query('SELECT * FROM gra', (error, result_gra) => {

        if(error){
            throw error;
        }

        correct_answer = result_gra[result_gra.length-1].poprawna_odp;
        var token = req.cookies.SesionCookie;
        var decotedInfo = jwt.verify(token,process.env.JWT_KEY);
        var id = decotedInfo.id;

        if(correct_answer == 3){

            let sql = 'UPDATE uzytkownicy SET najlepszy_wynik_tura = najlepszy_wynik_tura + 1 WHERE id = ?'
            connection.query(sql,[id], function(err, results){
                if(err){throw err; }
            })
            sql = 'SELECT * FROM uzytkownicy WHERE id = ?';
            connection.query(sql,[id], function(error, result){
                console.log("kwota" + result[0].najlepszy_wynik_tura);
                highlighted = result[0].najlepszy_wynik_tura;
                //document.getElementById("kwota" + result[0].najlepszy_wynik_tura).style.backgroundColor = "green";
            })
            

        }else{
            let sql = 'UPDATE uzytkownicy SET najlepszy_wynik = IF(najlepszy_wynik_tura > najlepszy_wynik, najlepszy_wynik_tura, najlepszy_wynik) WHERE id = ?';
            connection.query(sql,[id], function(err, results){
                if(err){throw err; }
            })
            sql = 'UPDATE uzytkownicy SET najlepszy_wynik_tura = 0 WHERE id = ?';
            connection.query(sql,[id], function(err, results){
                if(err){throw err; }
            })
        }
        let sql = 'SELECT * FROM pytania'
        connection.query(sql, function(err, results){
           let question_nr = Math.floor(Math.random() * (results.length + 1));
   
           let row = results[question_nr];
           connection.query('INSERT INTO gra SET ?', {pytanie:row.pytanie, odp1:row.odp1, odp2:row.odp2, odp3:row.odp3, odp4:row.odp4, poprawna_odp:row.poprawna_odp}, (error, result) => {
               if(err){ throw err}
                res.render('../views/game.ejs', { data: row,highlighted: highlighted, message: ""});
            })
           });
    })
});

router.get('/check4', (req, res) =>{
    var highlighted;
    connection.query('SELECT * FROM gra', (error, result_gra) => {
        if(error){ throw error; }

        correct_answer = result_gra[result_gra.length-1].poprawna_odp;
        var token = req.cookies.SesionCookie;
        var decotedInfo = jwt.verify(token,process.env.JWT_KEY);
        var id = decotedInfo.id;
        if(correct_answer == 4){

            let sql = 'UPDATE uzytkownicy SET najlepszy_wynik_tura = najlepszy_wynik_tura + 1 WHERE id = ?';
            connection.query(sql,[id], function(err, results){

                if(err){throw err; }
            })
            sql = 'SELECT * FROM uzytkownicy WHERE id = ?';
            connection.query(sql,[id], function(error, result){
                console.log("kwota" + result[0].najlepszy_wynik_tura);
                highlighted = result[0].najlepszy_wynik_tura;
                //document.getElementById("kwota" + result[0].najlepszy_wynik_tura).style.backgroundColor = "green";
            })
        }else{
            let sql = 'UPDATE uzytkownicy SET najlepszy_wynik = IF(najlepszy_wynik_tura > najlepszy_wynik, najlepszy_wynik_tura, najlepszy_wynik) WHERE id = ?';
            connection.query(sql,[id], function(err, results){
                if(err){throw err; }
            })
            sql = 'UPDATE uzytkownicy SET najlepszy_wynik_tura = 0 WHERE id = ?';
            connection.query(sql,[id], function(err, results){
                if(err){throw err; }
            })
        }
        let sql = 'SELECT * FROM pytania'
        connection.query(sql, function(err, results){
           let question_nr = Math.floor(Math.random() * (results.length + 1));
   
           let row = results[question_nr];
           connection.query('INSERT INTO gra SET ?', {pytanie:row.pytanie, odp1:row.odp1, odp2:row.odp2, odp3:row.odp3, odp4:row.odp4, poprawna_odp:row.poprawna_odp}, (error, result) => {
               if(err){ throw err}
                res.render('../views/game.ejs', { data: row,highlighted: highlighted, message: ""});
            })
           });
    })


     
});

module.exports = router;