/**
 * Created by Sven O. Pagel on 1/15/17.
 */

var db = require('./db_setup').db;
var helper = require('./helper_functions');

db.serialize(function () {
    var now = Date.now().toString();
    var hash = helper.hashPassword('hallo',now);
    console.log(hash);
    console.log(now);
    //console.log("INSERT INTO Users VALUES (null, 'Hans', 'hans@test.de', '" + hash +"', '" + now +"');");
    db.run("INSERT INTO Users VALUES (null, 'Hans', 'hans@test.de','Münster','Deutschland', '" + hash +"', '" + now.toString() +"');");
});