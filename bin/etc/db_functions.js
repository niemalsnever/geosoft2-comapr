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
            db.all('select * from Projects inner join Permissions on Projects.id = Permissions.projectid where Permissions.userid = ? OR Projects.ownerid = ?', id, id, function(err, rows)
                  {
                callback(err, rows);
            });
        })
    }
    ,
    // FIXME
    
    deleteProject : function(id, callback){
        db.run('delete from Projects where Projects.id = ?', id ,function(err, result)
              {
            callback (err, row);
        });
    }
};