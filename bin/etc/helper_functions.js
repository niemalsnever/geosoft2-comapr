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