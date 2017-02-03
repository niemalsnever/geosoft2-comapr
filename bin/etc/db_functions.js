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
    ,
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
    },
    deleteDirectory : function(name, callback){
        db.run('delete from Projects where projects.name = ?', id, function(err,result){
            callback(err,result);
        });
    }
    ,
    deleteUser : function(id,  callback){
         db.run('delete from Projects WHERE Project.ownerid= ?' , id ,function(err, result)
              {
            callback (err, result);
        });
        db.run('delete from Users where Users.id = ?', id ,function(err, result)
              {
            callback (err, result);
        });
    }
    ,
    
    editUser: function(name, email, city, country, callback){
        db.serialize(function(){
            db.run('UPDATE Users Set name= ?, email=?, city=?, country=? WHERE id=? VALUES (?, ?, ?, ?, ?);', Username, email, city, country, id, function(err, result)
                  {
                callback(err, result);
            });
        })
    }
    ,

    
}