/**
 * Created by Sven O. Pagel on 2016-12-19.
 */
var fs = require('fs');
var crypto = require('crypto');

//noinspection JSUnusedGlobalSymbols
module.exports = {
    hashPassword: function hashPassword(password, salt) {
        var hash = crypto.createHash('sha256');
        hash.update(password);
        hash.update(salt);
        return hash.digest('hex');
    },

    hashProject: function(name, ownerid) {
        var hash = crypto.createHash('sha256');
        hash.update(name);
        hash.update(ownerid);
        return hash.digest('hex');
    },

    deleteFolderRecursive: function(path, callback){
        console.log(path);
        try {
            if (fs.existsSync(path)) {
                fs.readdirSync(path).forEach(function (file, index) {
                    var curPath = path + "/" + file;
                    if (fs.lstatSync(curPath).isDirectory()) {
                        deleteFolderRecursive(curPath);
                    } else {
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(path);
            }
        } catch (e) {
            callback(e);
        }
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