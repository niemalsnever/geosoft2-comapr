/**
 * Created by Sven O. Pagel on 1/19/17.
 */

var db = require('./db_connect').db;

module.exports = {
    getUser : function (id, callback) {
        db.serialize(function () {
            db.get('SELECT id, name, email, city, country FROM Users WHERE id = ?;', id, function(err, row) {
                callback(err, row);
            });
        })
    }
};