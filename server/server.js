/**
 * Created by Sven O. Pagel on 2016-12-19.
 */

var express = require('express');
var app = express();
var port = process.env.COMAPR_PORT || 8080;
var crypto = require('crypto');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('comapr.db');

function hashPassword(password, salt) {
    var hash = crypto.createHash('sha256');
    hash.update(password);
    hash.update(salt);
    return hash.digest('hex');
}

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS Users (id varchar, username varchar, email varchar, password varchar, salt varchar)");

    //db.run("INSERT INTO Users VALUES ('1', 'Hans', 'hans@test.de', 'a68ad428fb4a4a85535014716074c0ebcf1543fc9fd801e831cd07d5c54ab8bc', 'blub')");

    //var stmt = db.prepare("Select * FROM Users (?)");

    //stmt.finalize();

});

passport.use('local', new LocalStrategy(function(username, password, done) {
    db.get('SELECT salt FROM Users WHERE username = ?', username, function(err, row) {
        if(!row) {
            return done(null, false);
        }
        var hash = hashPassword(password, row.salt);
        console.log(hash);
        db.get('SELECT username, id FROM users WHERE username = ? AND password = ?', username, hash, function (err, row){
            if(!row) {
                return done(null, false);
            }
            done(null, row);
        });
    });

    // if(username === 'Hans' && password === 'hallo') {
    //     done(null, {user: username} );
    // } else {
    //     done(null, false);
    // }
}));

passport.serializeUser(function (user, done) {
    console.log('s');
    return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    db.get('SELECT id, username FROM Users WHERE id = ?', id, function (err, row) {
        console.log('des');
        return done(null, row);
    });
});

app.use(express.static('web'));
//app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


app.post('/login', passport.authenticate('local', {
    successRedirect: '/good-login',
    failureRedirect: '/bad-login' }));

app.get('/good-login', function (req, res) {
   res.redirect('/main.html');
});

app.listen(port);