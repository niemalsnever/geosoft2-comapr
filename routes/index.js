var express = require('express');
var router = express.Router();

var helper = require('../bin/etc/helper_functions');
var pp = require('../bin/etc/passport_setup');
pp.passport_setup();

router.use(pp.pass.initialize());
router.use(pp.pass.session());

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'CoMapR - Login' });
});

router.get('/my-projects', function (req, res, next) {
    res.redirect('/map-view');
});

router.get('/map-view', function(req, res, next) {
    if(req.user) {
        console.log(req.user);
        res.render('mapview', { title: 'CoMapR', user: req.user.name + ' (' + req.user.email + ')' });
    }
    else {
        res.status(403).send('Sorry, you are not logged in. Please click here to get back to the <a href="/">Login page</a>');
    }
});

router.post('/login', pp.pass.authenticate('local', {
    successRedirect: '/good-login',
    failureRedirect: '/bad-login' }));

router.get('/good-login', function (req, res) {
    if(req.user) {
        res.redirect('/my-projects');
        console.log(req.user);
    }
    else {
        res.send('nope');
    }
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.post('/register', function (req, res) {
    //console.log(req);
    helper.registerUser(req.body.regName,req.body.regEmail,req.body.regPassword);
    res.send("Registered User " + req.body.regName + " (" + req.body.regEmail + ") <br> <a href='/'>Back to login page</a>");
});

module.exports = router;
