/**
 * Created by Sven O. Pagel on 2016-12-19.
 */

var crypto = require('crypto');

module.exports.hashPassword = function hashPassword(password, salt) {
    var hash = crypto.createHash('sha256');
    hash.update(password);
    hash.update(salt);
    return hash.digest('hex');
};