/**
 * Created by Sven O. Pagel on 2016-12-19.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var db = require('./db_setup.js').db;
var helper = require("./helper_functions.js");



module.exports = {
    passport_setup: function () {
        passport.use('local', new LocalStrategy({usernameField: 'email'},function (email, password, done) {
            db.get('SELECT salt FROM Users WHERE email = ?', email, function (err, row) {
                if (!row) {
                    return done(null, false);
                }
                var hash = helper.hashPassword(password, row.salt);
                db.get('SELECT email, id FROM users WHERE email = ? AND password = ?', email, hash, function (err, row) {
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
            db.get('SELECT id, email, name FROM Users WHERE id = ?', id, function (err, row) {
            return done(null, row);
            });
        });
    },

    pass: passport
};