/**
 * Created by Sven O. Pagel on 1/19/17.
 */

var db = require('./db_connect').db;
var helper = require('./helper_functions.js');

module.exports = {
    getUser : function (id, callback) {
        db.serialize(function () {
            db.get('SELECT id, name, email, city, country FROM Users WHERE id = ?;', id, function(err, row) {
                callback(err, row);
            });
        })
    },

    getUserProjects : function(id, callback){
        db.serialize(function() {
            console.log("I'm hit");
            db.all('SELECT Projects.id AS projectid, Projects.name AS projectname, Projects.hashProject as projecthash FROM Projects LEFT OUTER JOIN Permissions ON Projects.id = Permissions.projectid WHERE Permissions.userid = ? OR Projects.ownerid = ?;', id, id, function(err, rows)
            {
                callback(err, rows);
            });
        });
    },

    getProjectByHash : function(hashProject, callback){
        db.serialize(function(){
            db.get('SELECT * FROM Projects WHERE hashProject = ?;', hashProject, function(err, row){
                callback(err, row);
            });
        })
    },

    registerUser: function (name, email, city, country, hash, salt, callback) {

        try {
            db.run("INSERT INTO Users VALUES (null, ?, ?, ?, ?, ?, ?);", name, email, city, country, hash, salt, function (err) {
                callback(err);
            });
        } catch(e) {
            callback(e);
        }
    },

    newProject: function (name, ownerid, projectHash, callback) {
        try{
            db.run("INSERT INTO Projects VALUES (null, ?, ?, ?);", name, projectHash, ownerid, function (err) {
                callback(err);
            });
        }
        catch(e){
            console.error(e);
            callback(e);
        }
    },

    deleteProject: function(projectid, userid, callback) {
        console.log(userid);
        db.serialize(function () {
            try {
                db.run('DELETE FROM Permissions WHERE Permissions.projectid = ? ', projectid);
                db.run("DELETE FROM Projects WHERE Projects.id = ? AND Projects.ownerid = ?;", projectid, userid);
            } catch (e) {
                console.error(e);
                callback(e);
            }
        });
    },

    deleteUser: function(id, callback){
        db.run('delete from Users where Users.id = ?', id ,function(err, result)
        {
            callback (err, result);
        });
    },

    editUser: function(name, email, city, country, id, callback) {
        db.serialize(function () {
            db.run("UPDATE Users Set name=?, email=?, city=?, country=?  WHERE id=?;", name, email, city, country, id, function (err, result) {
                callback(err, result);
            });
        })
    }
};