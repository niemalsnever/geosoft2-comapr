/**
 * Created by Sven O. Pagel on 2/5/17.
 */

var fs = require('fs');
var path = require('path');

var helper = require('./helper_functions.js');
var dbFunctions = require('./db_functions.js');

module.exports = {
    newProject: function (name, ownerid, callback) {
        console.log(name + "\n" + ownerid);
        permalink = helper.hashProject(name.toString(),ownerid.toString());

        projectDirPath = path.join(__dirname, '../../data/projects/' + name);

        dbFunctions.newProject(name, ownerid, permalink, function (err) {
            if(!err) {
                try {
                    //noinspection OctalIntegerJS
                    console.log('mööp');
                    fs.mkdir(projectDirPath, 0755);
                    callback();
                } catch(e) {
                    callback(e);
                }
            } else {
                callback(err);
            }
        })
    },

    deleteProject: function (projectid, projectname, userid, callback) {
        dbFunctions.deleteProject(projectid, userid, function (err) {
            projectDirPath = path.join(__dirname, '../../data/projects/' + projectname);
            if(!err) {
                helper.deleteFolderRecursive(projectDirPath, function (err) {
                    callback(err)
                })
            } else {
                callback(err);
            }
        })
    },

    registerUser: function (name, email, city, country, password, callback) {
        var now = Date.now().toString();
        var hash = helper.hashPassword(password.toString(), now);
        dbFunctions.registerUser(name, email, city, country, hash, now, function (err) {
            callback(err);
        })
    },
};