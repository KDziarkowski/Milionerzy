const mysql = require('mysql');
require('dotenv').config()

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'milionerzy'
});


connection.connect(function(err) {
    if (err) throw err;
     connection.query("CREATE DATABASE IF NOT EXISTS publicTransport", function (err, result) {
       if (err) throw err;
     });
    connection.query("CREATE TABLE IF NOT EXISTS `pytania` (`nr_pytania` INT NOT NULL AUTO_INCREMENT,`pytanie` VARCHAR(1000) NOT NULL,`odp1` VARCHAR(500) NOT NULL, `odp2` VARCHAR(500) NOT NULL, `odp3` VARCHAR(500) NOT NULL, `odp4` VARCHAR(500) NOT NULL,PRIMARY KEY (`nr_pytania`))", function (err, result) {
        if (err) throw err;
    });

    connection.query("CREATE TABLE IF NOT EXISTS `gra` (`nr_pytania` INT NOT NULL AUTO_INCREMENT,`pytanie` VARCHAR(1000) NOT NULL,`odp1` VARCHAR(500) NOT NULL, `odp2` VARCHAR(500) NOT NULL, `odp3` VARCHAR(500) NOT NULL, `odp4` VARCHAR(500) NOT NULL,PRIMARY KEY (`nr_pytania`))", function (err, result) {
        if (err) throw err;
    });

    connection.query("CREATE TABLE IF NOT EXISTS `uzytkownicy` (`id` INT NOT NULL AUTO_INCREMENT,`login` VARCHAR(100) NOT NULL,`haslo` VARCHAR(50) NOT NULL, `najlepszy_wynik` INT NOT NULL, `najlepszy_wynik_tura` INT NOT NULL,PRIMARY KEY (`id`))", function (err, result) {
        if (err) throw err;
    });

  });

module.exports = connection;

