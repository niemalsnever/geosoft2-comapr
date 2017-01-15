/**
 * Created by Sven O. Pagel on 2016-12-19.
 */

var crypto = require('crypto');
var db = require('./db_setup').db;

module.exports.hashPassword = function hashPassword(password, salt) {
    var hash = crypto.createHash('sha256');
    hash.update(password);
    hash.update(salt);
    return hash.digest('hex');
};

module.exports.registerUser = function (name, email, password) {
    var now = Date.now().toString();
    var hash = this.hashPassword(password.toString(),now);
    db.run("INSERT INTO Users VALUES (null, '" + name + "', '" + email + "', '" + hash +"', '" + now.toString() +"');");
};