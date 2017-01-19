/**
 * Created by niems on 2016-12-12.
 */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('comapr.db');

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS Users (userID varchar, name varchar, email varchar, password varchar)");

    db.run("INSERT INTO Users VALUES ('1', 'Hans', 'han@stest.de', 'hallo')");

    //var stmt = db.prepare("Select * FROM Users (?)");

    //stmt.finalize();

    db.each("SELECT rowid as id,* FROM Users", function(err, row) {
        console.log(row.id + ": " + row.name + "|" + row.email);
    });
});

db.close();
