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

        projectDirPath = path.join(__dirname, '../../data/projects/' + permalink);

        dbFunctions.newProject(name, ownerid, permalink, function (err) {
            if(!err) {
                try {
                    //noinspection OctalIntegerJS
                    console.log('mööp');
                    fs.mkdirSync(projectDirPath, 0755);
                    callback(err);
                } catch(e) {
                    callback(e);
                }
            } else {
                callback(err);
            }
        })
    },

    deleteProject: function (projectid, projectname, ownerid, callback) {
        dbFunctions.deleteProject(projectid, ownerid, function (err) {
            permalink = helper.hashProject(projectname.toString(),ownerid.toString());
            projectDirPath = path.join(__dirname, '../../data/projects/' + permalink);
            console.log(projectDirPath);
            if(!err) {
                console.log(projectDirPath);
                helper.deleteFolderRecursive(projectDirPath, function (err) {
                    callback(err)
                })
                callback();
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



    shareProject: function(projectHash, sharedBy,shareWithEmail,read, write, share, callback){
        dbFunctions.shareProject(projectHash, sharedBy, shareWithEmail,read, write, share, function(err){
            callback(err);
        })
    },


    getDirs: function(rootDir, cb) {
        console.log(rootDir);
        try {
            fs.readdir(rootDir, function(err, files) {
                var dirs = [];
                for (var index = 0; index < files.length; ++index) {
                    var file = files[index];
                    if (file[0] !== '.') {
                        var filePath = rootDir + '/' + file;
                        fs.stat(filePath, function(err, stat) {
                            if (stat.isDirectory()) {
                                dirs.push(this.file);
                            }
                            if (files.length === (this.index + 1)) {
                                return cb(dirs);
                            }
                        }.bind({index: index, file: file}));
                    }
                }
            });
        } catch(e) {
            cb(e);
        }

    }
};
