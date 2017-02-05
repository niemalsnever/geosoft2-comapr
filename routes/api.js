/**
 * Created by Sven O. Pagel on 1/20/17.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

var dbFunctions = require('../bin/etc/db_functions');
var apiFunctions = require('../bin/etc/api_functions');

var dirTree = require('bootstrap-treeview-node');

var util = require('util');
var exec = require('child_process').exec;
var formidable = require('formidable');


router.post('/registerUser', function (req, res) {
    apiFunctions.registerUser(req.body.regName, req.body.regEmail, req.body.regCity, req.body.regCountry, req.body.regPassword, function (err) {
        if(!err) {
            res.send("Registered User " + req.body.regName + " (" + req.body.regEmail + ")");
        } else {
            console.error('Registration failed: ' + err);
            res.status(400);
            res.send("Registration failed.");
        }
    });
});

router.post('/newProject', function (req, res) {
    apiFunctions.newProject(req.body.projectname, req.user.id, function (err) {
        if(!err) {
            res.send("Created Project '" + req.body.projectname + "'");
        } else {
            console.error("Failed to create project: " + err);
            res.send("Failed to create project");
        }
    });
});

router.post('/deleteProject', function(req, res){
    console.log(req.body);
    apiFunctions.deleteProject(req.body.projectid, req.body.projectname, req.user.id, function (err) {
        if(!err) {
            res.send("Project was deleted");
        } else {
            console.error(err);
            res.send("Failed to delete project, are you the Owner?");
        }
    })
});

//TODO: Maybe enable Users to change Passwords
//FIXME: Check for Database Errors!
router.post('/editUser', function(req,res){
    dbFunctions.editUser(req.body.username, req.body.email, req.body.city, req.body.country, req.user.id, function (err, result) {
        if(!err) {
            res.send("User successfully edited");
        } else {
            console.error(err);
            res.status(400).send("User edit failed.")
        }
    });
});


router.post('/saveCode', function(req, res){
    var usercode = req.body.code;
    var newname = req.body.newname + '.r';
    fs.writeFileSync(newname, usercode, function(err) {
        if (err) {
            res.send('Something when wrong');
        } else {
            res.send('Saved!');
        }
    })
});

//TODO: This needs some polish
router.post('/fileUpload*', function (req, res) {
    try {
        var form = new formidable.IncomingForm();

        form.multiples = true;

        try {
            form.uploadDir = path.join(__dirname, '../data/projects/' + req.query.pn);
        } catch (e) {
            console.error(e);
        }

        // every time a file has been uploaded successfully,
        // rename it to it's orignal name
        try {
            form.on('file', function (field, file) {
                try {
                    fs.rename(file.path, path.join(form.uploadDir, file.name));
                } catch (e) {
                    console.error(e);
                }
            });
        } catch (e) {
            console.error(e);
        }
        // log any errors that occur
        form.on('error', function (err) {
            console.log('An error has occured: \n' + err);
        });
        // once all the files have been uploaded, send a response to the client
        form.on('end', function () {
            res.end('success');
        });
        // parse the incoming request containing the form data
        try {
            form.parse(req);
        } catch (e) {
            console.error(e);
        }
    } catch (e) {
        console.error(e);
    }
});

router.post('/runRScript', function (req,res) {
    code = req.body.code;
    now = Date.now();

    

    scidbConnectScript = fs.readFileSync(path.join(__dirname, '../data/system_files/scidb_connect.r'));

    fileName = path.join(__dirname, '../data/.tmp/' + now) + '.r';

    fs.writeFile(fileName, scidbConnectScript, function(err) {
        if (!err) {
            console.log('no Error writing static code');
            fs.appendFile(fileName, code, function (err) {
                console.log('append started');
                if(err) {
                    console.error('Something went wrong when appending the code ' + err);
                    res.send('Something went wrong when appending the code ');
                } else {
                    var cmd = 'Rscript ' + fileName;

                    try {
                        exec(cmd, function (error, stdout, stderr) {
                            if (error) {
                                console.error(error);
                                res.send('Execution failed: ' + error);
                            }
                            else {
                                console.log(stdout);
                                console.error(stderr);
                                res.send('Execution successful: ' + stdout + "\n" + stderr);
                            }
                        })
                    } catch (error) {
                        console.error(error);
                    } finally {
                        try {
                            fs.unlink(fileName);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
            })
        } else {
            console.error('Something went wrong when saving the temp file ' + err);
            res.send('Something went wrong when saving the temp file');
        }
    });
});

router.post('/getDataTree', function(req, res){
    var mytree = dirTree(path.join(__dirname, '../data/projects/' + req.body.projectName));
    console.log(mytree);
    res.json(mytree);

});

module.exports = router;