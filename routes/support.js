const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var jwt = require('jsonwebtoken');
var connection = require('../database.js');


router.get('/publicznosc',(req, res) => {
    var highlighted;
    var token = req.cookies.SesionCookie;
    var decotedInfo = jwt.verify(token,process.env.JWT_KEY);
    var id = decotedInfo.id;
    let sql = 'SELECT * FROM uzytkownicy WHERE id = ?';
    connection.query(sql,[id], function(error, result){
        highlighted = result[0].najlepszy_wynik_tura;

    })
    connection.query('SELECT * FROM gra', (error, result_gra) => {
        if(error){  throw error;}

        odp = ["a", "b", "c", "d"]
        let dobra = result_gra[result_gra.length-1].poprawna_odp-1;
        prawdopodobienstwa = [0,0,0,0];
        suma = 100;
        prawdopodobienstwa[dobra] = Math.floor(Math.random() * 56) + 35;
        suma = suma -prawdopodobienstwa[dobra];
        for(i=1; i<=2; i++){
            prawdopodobienstwa[(dobra+i)%4] = Math.floor(Math.random() * (suma + 1));
            suma = suma - prawdopodobienstwa[(dobra+i)%4];
        }
        prawdopodobienstwa[(dobra+3)%4] = suma;
        let message = odp[0] + "-" + prawdopodobienstwa[0] + "\n" + odp[1] + "-" + prawdopodobienstwa[1] + "\n" + odp[2] + "-" + prawdopodobienstwa[2] + "\n" + odp[3] + "-" + prawdopodobienstwa[3];

        row = result_gra[result_gra.length-1];
        res.render('../views/game.ejs', { data: row,highlighted: highlighted, message: message});
    })

    

});

router.get('/fiftyfifty',(req, res) => {
    var highlighted;
    var token = req.cookies.SesionCookie;
    var decotedInfo = jwt.verify(token,process.env.JWT_KEY);
    var id = decotedInfo.id;
    let sql = 'SELECT * FROM uzytkownicy WHERE id = ?';
    connection.query(sql,[id], function(error, result){
        highlighted = result[0].najlepszy_wynik_tura;

    })
    connection.query('SELECT * FROM gra', (error, result_gra) => {
        if(error){  throw error;}

        odp = ["a", "b", "c", "d"]
        let dobra = result_gra[result_gra.length-1].poprawna_odp-1;
        let odrzucone = [1,1,1,1]
        odrzucone[dobra] = 0;
        odrzucone[(dobra + Math.floor(Math.random() * 4))%4] = 0
        let message = "Niepoprawne odpowiedzi to: "
        for(let i = 0; i<4; i++){
            if(odrzucone[i] == 1){
                message += odp[i] + " i ";
            }
        }

        row = result_gra[result_gra.length-1];
        res.render('../views/game.ejs', { data: row, message: message, highlighted: highlighted});
    })

});

router.get('/przyjaciel',(req, res) => {
    var highlighted;
    var token = req.cookies.SesionCookie;
    var decotedInfo = jwt.verify(token,process.env.JWT_KEY);
    var id = decotedInfo.id;
    let sql = 'SELECT * FROM uzytkownicy WHERE id = ?';
    connection.query(sql,[id], function(error, result){
        highlighted = result[0].najlepszy_wynik_tura;

    })
    connection.query('SELECT * FROM gra', (error, result_gra) => {
        odp = ["a", "b", "c", "d"]
        let dobra = result_gra[result_gra.length-1].poprawna_odp-1;
        let message = "";
        if(Math.random()<0.7){
            message = "poprawna odpowiedź to "+odp[dobra];
        }
        else{
            let wynik = Math.floor(Math.random() * 4)
            if(wynik == dobra){
                wynik =(wynik + 1)%4
            }
            message = "poprawna odpowiedź to "+odp[wynik];
        }
        row = result_gra[result_gra.length-1];
        res.render('../views/game.ejs', { data: row,highlighted: highlighted, message: message});
    });
});

module.exports = router;
