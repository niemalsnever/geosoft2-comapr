/**
 * Created by Sven O. Pagel on 1/15/17.
 */

var db = require('./db_connect').db;
if(db) {
    db.serialize(function() {
        //Creates Users table
        db.run("CREATE TABLE IF NOT EXISTS Users (" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "name VARCHAR(100) NOT NULL, " +
            "email VARCHAR(250) NOT NULL, " +
            "city VARCHAR(250) NOT NULL, " +
            "country VARCHAR(250) NOT NULL, " +
            "password VARCHAR(250) NOT NULL, " +
            "salt VARCHAR(250) NOT NULL);");
        //Creates Projects table
        db.run("CREATE TABLE IF NOT EXISTS Projects (" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "name VARCHAR(250) NOT NULL, " +
            "ownerid INTEGER, " +
            "FOREIGN KEY(ownerid) REFERENCES Users(id));");
        //Creates Permissions table
        db.run("CREATE TABLE IF NOT EXISTS Permissions (" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "userid INTEGER, " +
            "projectid INTEGER, " +
            "read BOOL, " +
            "write BOOL, " +
            "share BOOL, " +
            "FOREIGN KEY(userid) REFERENCES Users(id), " +
            "FOREIGN KEY(projectid) REFERENCES Projects(id));");
    });
}

module.exports.db = db;