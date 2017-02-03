var express = require('express');
var router = express.Router();
var fs = require('fs');

var helper = require('../bin/etc/helper_functions');
var pp = require('../bin/etc/passport_setup');
var db_functions = require('../bin/etc/db_functions');

pp.passport_setup();

router.use(pp.pass.initialize());
router.use(pp.pass.session());

/* GET home page. */
router.get('/', function (req, res) {
    if(!req.user) {
        res.render('index', { title: 'Login' });
    } else {
        res.redirect('/my-projects');
    }
});
router.get('/sign-up', function (req, res) {
        res.render('index', { title: 'Login' });
});
router.get('/my-projects', function (req, res) {
    if(req.user) {
        //console.log(req.user.id);
        db_functions.getUserProjects(req.user.id, function (err, rows) {
            projects = rows;
            console.log(rows);
            res.render('my-projects', { rows: projects , user: req.user });
        });
    }
    else {
        res.status(403).render('error', {
            error: {
                status: 403,
                msg: 'Sorry, you are not logged in. Please click here to get back to the <a href="/">Login page</a>'
            },
            rto: '/my-projects'
        });
    }
});

router.get('/my-account', function (req, res) {
    if(req.user) {
        //console.log(req.user.id);
        var user;
        db_functions.getUser(req.user.id, function (err, row) {
            user = row;
            res.render('my-account', { title: 'My Account - ' + user.name + ' (' + user.email + ')', user: user });
        });
    }
    else {
        res.status(403).render('error', {
            error: {
                status: 403,
                msg: 'Sorry, you are not logged in. Please click here to get back to the <a href="/">Login page</a>'
            },
            rto: '/my-account'
        });
    }
});

router.get('/edit', function (req, res) {
    if(req.user) {
        //console.log(req.user.id);
        var user;
        db_functions.getUser(req.user.id, function (err, row) {
            user = row;
            res.render('edit', { title: 'My Account - ' + user.name + ' (' + user.email + ')', user: user });
        });
    }
    else {
        //res.status(403).send();
        res.status(403).render('error',  { error: {
            status: 403,
            msg: 'Sorry, you are not logged in. Please click here to get back to the <a href="/">Login page</a>'
        } })
    }
});

router.get('/map-view', function (req, res) {
    if(req.user) {
        //console.log(req.user);
        res.render('map-view', { title: 'Map View', user: req.user });
    }
    else {
        res.status(403).render('error',  {
            error: {
                status: 403,
                msg: 'Sorry, you are not logged in. Please click here to get back to the <a href="/">Login page</a>'
            },
            rto: '/map-view'
        })
    }
});

// router.post('/login', pp.pass.authenticate('local', {
//      successRedirect: /good-login,
//      failureRedirect: '/bad-login' }));

router.post('/login', function(req, res, next) {
    //console.log(req.body);
    //noinspection JSUnusedLocalSymbols
    pp.pass.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/');
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect(req.body.rto || '/');
        });
    })(req, res, next);
});

router.get('/good-login', function (req, res) {
    //console.log(req);
    if(req.user && (req.body.rto != '' && req.body.rto)) {
        res.redirect(req.body.rto);
    } else if(req.user) {
        res.redirect('/my-projects');
    } else {
        res.status(403).render('error',  {error: {
            status: 403,
            msg: 'Sorry, you are not logged in. Please click here to get back to the <a href="/">Login page</a>'
        } })
    }
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/sign-up');
});

router.post('/register', function (req, res) {
    //console.log(req.body);
    helper.registerUser(req.body.regName, req.body.regEmail, req.body.regCity, req.body.regCountry, req.body.regPassword);
    res.send("Registered User " + req.body.regName + " (" + req.body.regEmail + ") <br> <a href='/'>Back to login page</a>");
});


router.post('/newProject', function (req, res) {
    console.log(req.body);
    helper.newProject(req.body.projectname, req.user.id);
    res.redirect("/");
});

router.post('/deleteProject', function(req, res){
    helper.deleteProject(req.body.projectid);
    try{
    helper.deleteFolderRecursive('./data/' + req.body.projectname);
        console.log("deleted directory");
    }
    catch(err) {
        console.log(err);
    }

    res.redirect("/");
});

/*router.post('/deleteDirectory', function(req,res){
    helper.deleteDirectory(req.body.projectname);
    fs.unlink('./data/'+req.body.projectname,function(err){
        if (err) throw err;
        console.log("deleted directory");
    });
});
*/
router.post('/deleteUser', function(req,res){
    req.body.rto="";
    req.logout();
    helper.deleteUser(req.body.userID);
    res.send("User successfully deleted");
    });

//FIXME
router.post('/editUser', function(req,res){
    helper.editUser(req.body.username, req.body.email, req.body.city, req.body.country, req.user.id);
    res.send("User successfully edited");
    res.send("/");
})
//id=? , name= ?, email=?, city=?, country=? WHERE id=
//SAVE from Textarea to R-File
router.post('/getcode', function(req, res){
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

 

module.exports = router;
