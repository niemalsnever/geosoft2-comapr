/**
 * Created by Sven O. Pagel on 1/20/17.
 * DO NOT EDIT THIS FILE!
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('view_template', { title: 'TEMPLATE' });
});

module.exports = router;