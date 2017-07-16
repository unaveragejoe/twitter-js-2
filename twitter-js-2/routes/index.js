'use strict';
var express = require('express');
var router = express.Router();
// returns a new router instance, it's an app that can customize via a bunch of methods, ex. router.post

var tweetBank = require('../tweetBank');

router.get('/', function(req, res, next){
    var tweets = tweetBank.list();
    res.render('index', { title: 'Twitter!', tweets: tweets });
});

// router.get('/stylesheets/style.css', function(req, res, next){
//     res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' } ); //careful with the .. syntax
// });

module.exports = router;