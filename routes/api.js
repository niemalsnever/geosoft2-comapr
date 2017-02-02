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

var formidable = require('formidable');

/*
var multer = require('multer');



var upload = multer({
    dest: 'uploads/'
});

var uploadedFile = upload.fields([{
    name: 'file-upload',
    maxCount: 1
}]);
*/



// var storage =   multer.diskStorage({
//      destination: function (req, file, callback) {
//          callback(null, '/uploads');
//      },
//      filename: function (req, file, callback) {
//          callback(null, file.fieldname);
//      }
//  });
//
// var uploadedFile = multer( { storage : storage } ).single();


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
    fs.mkdir('./data/'+req.body.projectname, 0777, function(err){
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
    fs.writeFile(newname, usercode, function(err) {
        if (err) {
            res.send('Something when wrong');
        } else {
            res.send('Saved!');
        }
    })
});

router.post('/fileUpload', function (req, res) {
    var form = new formidable.IncomingForm();

    form.multiples = false;

    form.uploadDir = path.join(__dirname, '../data/projects');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
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
})


/*
//FIXME: This is not working at all!
router.post('/fileUpload', uploadedFile, function (req, res) {
    res.send('meh');
});
*/


module.exports = router;