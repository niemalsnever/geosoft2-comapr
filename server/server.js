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
    db.run("CREATE TABLE IF NOT EXISTS Users (userID varchar, username varchar, email varchar, password varchar, salt varchar)");

    db.run("INSERT INTO Users VALUES ('1', 'H" +
        "hans', 'han@stest.de', 'hallo', 'blub')");

    //var stmt = db.prepare("Select * FROM Users (?)");

    //stmt.finalize();

    db.each("SELECT rowid as id,* FROM Users", function(err, row) {
        console.log(row.id + ": " + row.name + "|" + row.email);
    });
});

db.close();


passport.use(new LocalStrategy(function(username, password, done) {
    db.get('SELECT salt FROM Users WHERE username = ?', username, function(err, row) {
        if(!row) {
            return done(null, false);
        }
        var hash = hashPassword(password, row.salt);
        db.get('SELECT username, id FROM users WHERE username = ? AND password = ?', username, hash, function (err, row){
            if(!row) {
                return done(null, row);
            }
        });
    });
}));

passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    db.get('SELECT id, username FROM users WHERE id = ?', id, function (err, row) {
        return done(null, row);
    });
});

app.use(express.static('web'));

app.post('/login', passport.authenticate('local', {
    successRedirect: '/good-login',
    failureRedirect: '/bad-login' }));

app.listen(port);
