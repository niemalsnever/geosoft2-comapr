var express = require('express');
var router = express.Router();

var helper = require('../bin/etc/helper_functions');
var pp = require('../bin/etc/passport_setup');
var db_functions = require('../bin/etc/db_functions');
pp.passport_setup();

router.use(pp.pass.initialize());
router.use(pp.pass.session());

/* GET home page. */
router.get('/', function (req, res) {
    if(!req.user) {
        res.render('index', { title: 'CoMapR - Login' });
    } else {
        res.redirect('/my-account');
    }
});

router.get('/my-projects', function (req, res) {
    res.redirect('/map-view');
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
        res.status(403).send("Sorry, you are not logged in. Please click here to get back to the <a href='/'>Login page</a>");
    }
});

router.get('/map-view', function (req, res) {
    if(req.user) {
        //console.log(req.user);
        res.render('map-view', { title: 'CoMapR', user: req.user });
    }
    else {
        res.status(403).send("Sorry, you are not logged in. Please click here to get back to the <a href='/'>Login page</a>");
    }
});

router.post('/login', pp.pass.authenticate('local', {
    successRedirect: '/good-login',
    failureRedirect: '/bad-login' }));

router.get('/good-login', function (req, res) {
    if(req.user) {
        res.redirect('/my-account');
    }
    else {
        res.status(403).send("Sorry, you are not logged in. Please click here to get back to the <a href='/'>Login page</a>");
    }
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.post('/register', function (req, res) {
    //console.log(req.body);
    helper.registerUser(req.body.regName, req.body.regEmail, req.body.regCity, req.body.regCountry, req.body.regPassword);
    res.send("Registered User " + req.body.regName + " (" + req.body.regEmail + ") <br> <a href='/'>Back to login page</a>");
});

module.exports = router;
