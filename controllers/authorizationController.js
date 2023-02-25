const jwt = require("jsonwebtoken");
var mysql = require("mysql");

var connection = require('../database.js');

exports.login = (req, res) => {
    
    console.log(req.body);
    const {mail, password} = req.body;
    

    connection.query('SELECT * FROM uzytkownicy Where login = ?', [mail], async (error, result) => {
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
        jwt.sign({user_id:result[0].user_id}, process.env.JWT_KEY, (err,token) =>{
            res.cookie('SesionCookie',token, {httpOnly:false})
        });
        return res.render('../views/instruction');
    }); 
};