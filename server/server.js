/**
 * Created by Sven O. Pagel on 2016-12-19.
 */

var express = require('express');
var app = express();
var port = process.env.COMAPR_PORT || 8080;
var pp = require('./etc/passport_setup');
var helper = require('./etc/helper_functions');
bodyParser = require('body-parser');


app.use(express.static('web'));
//app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.

pp.passport_setup();

app.use(pp.pass.initialize());
app.use(pp.pass.session());

app.use(bodyParser.json());

app.post('/login', pp.pass.authenticate('local', {
    successRedirect: '/good-login',
    failureRedirect: '/bad-login' }));

app.get('/good-login', function (req, res) {
    if(req.user) {
        res.redirect('/main.html');
    }
    else {
        res.send('nope');
    }
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.post('/register', function (req, res) {
    //console.log(req);
    helper.registerUser(req.body.regName,req.body.regEmail,req.body.regPassword);
    res.send("Registered User " + req.body.regName + " (" + req.body.regEmail + ")");
});

app.listen(port);
console.log("Server listening on port " + port);