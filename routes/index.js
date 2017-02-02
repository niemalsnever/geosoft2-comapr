var express = require('express');
var router = express.Router();
var fs = require('fs');

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

/*
router.post('/login', pp.pass.authenticate('local', {
      successRedirect: '/good-login',
      failureRedirect: '/bad-login' }));
*/


router.post('/login', function(req, res, next) {
     //console.log(req.body);
     //noinspection JSUnusedLocalSymbols
     pp.pass.authenticate('local', function(err, user, info) {
         if (err) {
             return next(err);
         }
         if (!user) {
             return res.send('/');
         }
         req.logIn(user, function(err) {
             if (err) {
                 return next(err);
             }
             return res.send(req.body.rto || '/good-login');
         });
     })(req, res, next);
 });

router.get('/good-login', function (req, res) {
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

module.exports = router;