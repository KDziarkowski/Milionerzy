const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser')

const database = require('./database')
require('dotenv').config();
const path = require('path');
var cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken');
const publicDirectory = path.join(__dirname,'./public');

var app = express();
app.use(cookieParser());
const ejs = require('ejs');

app.set('view engine', 'hbs');
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(publicDirectory));



app.use('/', require('./routes/pages'));
app.use('/authorization', require('./routes/authorization'));
app.use('/support', require('./routes/support'));



app.listen(3000, function(){
    console.log('App listening on port 3000');
})


