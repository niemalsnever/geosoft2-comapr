/**
 * Created by Sven O. Pagel on 1/20/17.
 */

var fs = require('fs');
var express = require('express');
var router = express.Router();
var bodyParser =    require("body-parser");
router.use(bodyParser.json());
var multer  =   require('multer');
var helper = require('../bin/etc/db_functions.js');



var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname);
    }
});
var upload = multer( { storage : storage } ).array('files',5);

router.post('/registerUser', function (req, res) {
    //console.log(req.body);
    helper.registerUser(req.body.regName, req.body.regEmail, req.body.regCity, req.body.regCountry, req.body.regPassword);
    res.send("Registered User " + req.body.regName + " (" + req.body.regEmail + ") <br> <a href='/'>Back to login page</a>");
});


router.post('/newProject', function (req, res) {
    //console.log(req.body);
    helper.newProject(req.body.projectname, req.user.id);
    res.redirect("/");
});
//FIXME
router.post('/deleteProject', function(req, res){
    helper.deleteProject(req.body.projectid);
    res.redirect("/");
});

//SAVE from Textarea to R-File
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
    console.log(req.body);
    console.log(req.files);
    upload(req, res, function (err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    })
});

module.exports = router;