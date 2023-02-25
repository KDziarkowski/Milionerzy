const express = require('express');
const authController = require('../controllers/authorizationController');
const router = express.Router();
var mysql = require("mysql");
const jwt = require("jsonwebtoken");

var connection = require('../database.js');

router.post('/login',(req, res) => {

    const {mail, password} = req.body;
    connection.query('SELECT * FROM uzytkownicy Where login = ?', [mail], async (error, result) => {
        console.log("jestem w connection query")
        if(error) console.log(error);
        if(result.length == 0) {
            return res.render('../views/login', {
                message: "Niepoprawny adres email"
            })
         }
        else {
            console.log(result);
            if(result[0].haslo != password) {
                return res.render('../views/login', {
                    message: "Niepoprawne hasło"
                })
            }     
        }

        jwt.sign({id:result[0].id}, process.env.JWT_KEY, (err,token) =>{
            res.cookie('SesionCookie',token, {httpOnly:false})
        });
        let sql = 'SELECT * FROM pytania'
        connection.query(sql, function(err, results){
        let question_nr = Math.floor(Math.random() * (results.length + 1));
        if(err){
            throw err
        }

               res.render('../views/instruction', { data: results[question_nr], message: ""});
     })
    }); 
});
router.post('/register', (req, res) =>{
    const {login, password, repeatedPassword} = req.body;
    if(password != repeatedPassword) {
        return res.render('../views/registration', {
            message: "Hasła się różnią"
        })
    }
        connection.query('INSERT INTO uzytkownicy SET ?', {login :login, haslo:password}, (error, result) => {
            if(error) {
                console.log(error);
            }
            else {
                res.render('../views/login');
            }
        })
});


module.exports = router;
