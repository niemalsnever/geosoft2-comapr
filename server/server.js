/**
 * Created by Sven O. Pagel on 2016-12-19.
 */

var express = require('express');
var app = express();
var port = process.env.COMAPR_PORT || 8080;
var pp = require('./etc/passport_setup');


app.use(express.static('web'));
//app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.

pp.passport_setup();

app.use(pp.pass.initialize());
app.use(pp.pass.session());


app.post('/login', pp.pass.authenticate('local', {
    successRedirect: '/good-login',
    failureRedirect: '/bad-login' }));

app.get('/good-login', function (req, res) {
   res.redirect('/main.html');
});

app.listen(port);