/**
 * Created by niems on 2016-12-19.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('comapr.db');


var helper = require("./helper_functions.js");

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS Users (id varchar, username varchar, email varchar, password varchar, salt varchar)");

    //db.run("INSERT INTO Users VALUES ('1', 'Hans', 'hans@test.de', 'a68ad428fb4a4a85535014716074c0ebcf1543fc9fd801e831cd07d5c54ab8bc', 'blub')");

    //var stmt = db.prepare("Select * FROM Users (?)");

    //stmt.finalize();

});

module.exports = {
    passport_setup: function () {
        passport.use('local', new LocalStrategy(function (username, password, done) {
            db.get('SELECT salt FROM Users WHERE username = ?', username, function (err, row) {
                if (!row) {
                    return done(null, false);
                }
                var hash = helper.hashPassword(password, row.salt);
                db.get('SELECT username, id FROM users WHERE username = ? AND password = ?', username, hash, function (err, row) {
                    if (!row) {
                        return done(null, false);
                    }
                    done(null, row);
                });
            });
        }));

        passport.serializeUser(function (user, done) {
            return done(null, user.id);
        });

        passport.deserializeUser(function (id, done) {
            db.get('SELECT id, username FROM Users WHERE id = ?', id, function (err, row) {
                return done(null, row);
            });
        });
    },

    pass: passport
};