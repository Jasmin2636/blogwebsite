var express = require("express");
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require('mongoose');
var session = require('express-session');

app.use(session({secret: "Shh, its a secret!"}));

app.set("view engine", "ejs")
app.set('views','./views');
 
var register= require('./register.js');
app.use('/',register);

var adminlogin= require('./adminlogin.js');
app.use('/',adminlogin);


var readarticle= require('./readarticle.js');
app.use('/',readarticle);

var login= require('./login.js');
app.use('/',login);

var art= require('./art.js');
app.use('/',art);

var managerlogin= require('./managerlogin.js');
app.use('/',managerlogin);

var comments= require('./comments.js');
app.use('/',comments);



app.use(express.static('images'));
app.use(express.static('css'));
app.use(express.static('public'))
app.listen(3000);