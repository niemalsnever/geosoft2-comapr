/**
 * Created by Sven O. Pagel on 2016-12-19.
 */
var fs = require('fs');
var crypto = require('crypto');
var db = require('./db_setup').db;
var permalinks = require('permalinks');

//noinspection JSUnusedGlobalSymbols
module.exports = {
    hashPassword: function hashPassword(password, salt) {
        var hash = crypto.createHash('sha256');
        hash.update(password);
        hash.update(salt);
        return hash.digest('hex');
    },
    registerUser : function (name, email, city, country, password) {
        var now = Date.now().toString();
        var hash = this.hashPassword(password.toString(), now);
        db.run("INSERT INTO Users VALUES (null, ?, ?, ?, ?, ?, ?);", name, email, city, country, hash, now);
    },
    newProject: function (name, ownerid) {
        console.log(name + "\n" + ownerid);
        permalink = this.hashProject(name.toString(),ownerid.toString());
        try{
            db.run("INSERT INTO Projects VALUES (null, ?,?,?);", name , permalink , ownerid, function(err){
                fs.mkdir('./data/'+name,0777, function(err){
                    if(err){
                        return console.error(err);
                    }else{
                        console.log("directory created successfully!");
                    }
                })
            });
        } catch(err){
            console.log("there was an error: " + err);
        }
    },
        
    hashProject: function(name, ownerid){
        var permalink = null;
        var hash = crypto.createHash('sha256');
        hash.update(name);
        hash.update(ownerid);
        return permalink =  hash.digest('hex');
    },
    deleteProject: function(id){
        db.run("DELETE from Projects where id = ?;", id);
    },
    deleteDirectory: function(projectname){
        db.run("DELETE from Projects where id = ?;", id);
        db.run("DELETE from Projects where name = ?;", name);
    },
    
    deleteUser: function(id){
        db.run("DELETE from Users where id = ?;", id);
    },
    deleteFolderRecursive: function(path){
        console.log(path);
    if(fs.existsSync(path)){
        fs.readdirSync(path).forEach(function(file, index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()){
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
        
       }
        
    }
    ,

    //FIXME
    projectID: function(){
        db.run("SELECT Projects.id AS projectid FROM Projects WHERE id=?;", id);
    }
    ,
    //FIXME
    editUser : function (name, email, city, country) {
        var now = Date.now().toString();
        db.run("UPDATE Users Set name, email, city, country  VALUES (?, ?, ?, ? ) WHERE id=?;", name, email, city, country, id);
    }
    ,
    //FIXME
    editUser : function (name, email, city, country, id) {
        var now = Date.now().toString();
        db.run("UPDATE Users Set name=?, email=?, city=?, country=?  WHERE id=?;", name, email, city, country, id);
    }
    ,
    // TODO: This is not working and might be removed
    ensureAuthenticated: function (req, res, next) {
        req.session.returnTo = req.path;
        if (req.user) {
            return next();
        }
        res.status(403).render('error',  {
            error: {
                status: 403,
                msg: 'Sorry, you are not logged in. Please click here to get back to the <a href="/">Login page</a>'
            }
        });
    }
};