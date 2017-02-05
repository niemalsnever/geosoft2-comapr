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
                console.log('db.serialize started');
                db.run('DELETE FROM Permissions WHERE Permissions.projectid = ? ', projectid);
                db.run("DELETE FROM Projects WHERE Projects.id = ? AND Projects.ownerid = ?;", projectid, userid);
            } catch (e) {
                console.error(e);
                return callback(e);
            } finally {
                callback();
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
    },

    shareProject : function(projectHash, sharedBy, shareWithEmail,read, write, share, callback){
        db.serialize(function(){
            try{
                db.get('SELECT id FROM Projects WHERE hashProject = ?;', projectHash, function (err, row) {
                    var projectid = row.id;
                    db.get('SELECT COUNT(*) AS c FROM Projects LEFT OUTER JOIN Permissions ON Projects.id = Permissions.projectid WHERE ((Permissions.userid = ? AND Permissions.share = "true") OR Projects.ownerid = ?) AND Projects.id = ?;', sharedBy, sharedBy, projectid, function (err, row) {
                        var canShare = row.c;
                        db.get('SELECT id FROM Users WHERE email = ?;', shareWithEmail, function (err, row) {
                            var sharedWith = row.id;

                            if (canShare > 0) {
                                console.log('treffer');
                                db.run('INSERT INTO Permissions VALUES (null , ? , ? , ? , ? , ?);', sharedWith, projectid, read, write, share, function (err) {
                                    callback(err);
                                });
                            }
                        });
                    });
                });
            } catch(e) {
                console.error(e);
                callback(e);
            }
        });
    },
};