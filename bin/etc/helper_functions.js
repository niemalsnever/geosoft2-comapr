/**
 * Created by Sven O. Pagel on 2016-12-19.
 */

var crypto = require('crypto');
var db = require('./db_setup').db;

//noinspection JSUnusedGlobalSymbols
module.exports = {
    hashPassword: function hashPassword(password, salt) {
        var hash = crypto.createHash('sha256');
        hash.update(password);
        hash.update(salt);
        return hash.digest('hex');
    },
    registerUser : function (name, email, city, country, password) {
        var now = Date.now().toString();
        var hash = this.hashPassword(password.toString(), now);
        db.run("INSERT INTO Users VALUES (null, ?, ?, ?, ?, ?, ?);", name, email, city, country, hash, now);
    },
    newProject: function (name, ownerid) {
        db.run("INSERT INTO Projects VALUES (null, ?, ?);", name, ownerid);
    },
    deleteProject: function(id){
        db.run("DELETE from Projects where id = ?;", id);
        window.location.reload();
    },
    // TODO: This is not working and might be removed
    ensureAuthenticated: function (req, res, next) {
        req.session.returnTo = req.path;
        if (req.user) {
            return next();
        }
        res.status(403).render('error',  {
            error: {
                status: 403,
                msg: 'Sorry, you are not logged in. Please click here to get back to the <a href="/">Login page</a>'
            }
        });
    }
};