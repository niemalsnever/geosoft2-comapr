/**
 * Created by Sven O. Pagel on 1/20/17.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.json());
var dbFunctions = require('../bin/etc/db_functions.js');
var util = require('util');

var exec = require('child_process').exec;

var formidable = require('formidable');


//FIXME: Check for Database Errors!
router.post('/registerUser', function (req, res) {
    //console.log(req.body);
    dbFunctions.registerUser(req.body.regName, req.body.regEmail, req.body.regCity, req.body.regCountry, req.body.regPassword);
    res.send("Registered User " + req.body.regName + " (" + req.body.regEmail + ")");
});

//TODO: Check if Database entry for project was created before creating Project Directory
router.post('/newProject', function (req, res) {
    //console.log(req.body);
    dbFunctions.newProject(req.body.projectname, req.user.id);
    //noinspection OctalIntegerJS
    fs.mkdir('./data/' + req.body.projectname, 0777, function(err){
        if(err){
            res.send('Project ' + req.body.projectname + ' could not be created. Possibly a Project with the same name already exists.');
            return console.error(err);
        } else {
            res.send('Project "' + req.body.projectname + '" successfully created');
            return console.log("directory created successfully!");
        }
    });
});

//TODO: Check if Database Entry was successfully deleted before deleting the directory.
//TODO: Delete Content of directory recursively before deleting the directory.
//TODO: Check if User is Owner of the Project to be deleted.
router.post('/deleteProject', function(req, res){
    dbFunctions.deleteProject(req.body.projectid);
    try{
        fs.rmdir('./data/'+req.body.projectname,function(err) {
            if(err) {
                res.send('Project ' + req.body.projectname + ' could not be deleted. Are you the Owner?');
                return console.error(err);
            } else {
                res.send('Project "' + req.body.projectname + '" successfully deleted');
                return console.log("deleted directory");
            }
        });}
    catch(err) {
        console.log(err);
    }
});

//TODO: Maybe enable Users to change Passwords
//FIXME: Check for Database Errors!
router.post('/editUser', function(req,res){
    dbFunctions.editUser(req.body.username, req.body.email, req.body.city, req.body.country, req.user.id);
    res.send("User successfully edited");
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
router.post('/fileUpload', function (req, res) {
    //console.log(req);
    var form = new formidable.IncomingForm();

    form.multiples = false;

    form.uploadDir = path.join(__dirname, '../data/projects');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        console.log(file);
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);
});

router.post('/runCode', function (req,res) {
    console.log(req.body.code);
    code = req.body.code;
    //FIXME: THIS IS A HORRIBLE SECURITY RISK! DO NOT PUBLISH THIS CODE!!!
    exec(code, function (error, stdout, stderr) {
        if(error) {
            console.error(error);
            res.send('Execution failed: ' + error);
        }
        else {
            console.log(stdout);
            console.error(stderr);
            res.send('Execution successful: ' + stdout + "\n" + stderr);
        }
    });
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

module.exports = router;