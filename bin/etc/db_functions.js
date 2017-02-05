/**
 * Created by Sven O. Pagel on 1/19/17.
 */

var db = require('./db_connect').db;
var helper = require('./helper_functions');

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
    }
    ,
    getProjectByHash : function(hashProject, callback){
        db.serialize(function(){
            db.get('SELECT * FROM Projects WHERE hashProject = ?;', hashProject, function(err, row){
                callback(err, row);
            });
        })
    },
    
    deleteProject : function(id, callback){
        db.run('delete from Projects where Projects.id = ?', id ,function(err, result)
              {
            callback (err, result);
        });
        })
    },

    registerUser: function (name, email, city, country, password) {
        var now = Date.now().toString();
        var hash = helper.hashPassword(password.toString(), now);
        db.run("INSERT INTO Users VALUES (null, ?, ?, ?, ?, ?, ?);", name, email, city, country, hash, now);
    },

    newProject: function (name, ownerid) {
        try{
            db.run("INSERT INTO Projects VALUES (null, ?, ?);", name, ownerid);
        }
        catch(err){
            console.error(err);
        }
    },

    deleteProject: function(projectid){
        db.serialize(function (projectid) {
            db.run('DELETE FROM Permissions WHERE Permissions.projectid = ?', projectid);
            db.run("DELETE FROM Projects WHERE Projects.id = ?;", projectid);
        });
    },

    deleteUser: function(id, callback){
        db.run('delete from Users where Users.id = ?', id ,function(err, result)
        {
            callback (err, result);
        });
    },

editUser: function(name, email, city, country, callback){
    db.serialize(function(){
        db.run('UPDATE Users Set name= ?, email=?, city=?, country=? WHERE id=? VALUES (?, ?, ?, ?, ?);', Username, email, city, country, id, function(err, result)
        {
            callback(err, result);
        });
    })
}