/**
 * Created by Sven O. Pagel on 1/15/17.
 */

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('comapr.db','', function () {
    console.log("Connected to database");
});

module.exports = {
    db: db
};