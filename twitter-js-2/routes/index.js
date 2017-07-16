'use strict';
var express = require('express');
var router = express.Router();
// returns a new router instance, it's an app that can customize via a bunch of methods, ex. router.post

var tweetBank = require('../tweetBank');

router.get('/', function(req, res, next){
    var allTweets = tweetBank.list();
    res.render('index', { title: 'Twitter!', tweets: allTweets , showForm: true});
});

router.get('/users/:name', function(req, res, next){
    var tweetsForName = tweetBank.find({ name: req.params.name});
    res.render('index', { title: 'Twitter!', tweets: tweetsForName, showForm: true, name: req.params.name });

});

router.get('/tweets/:id', function(req, res, next){
    var tweetsWithThatId = tweetBank.find({ id: Number(req.params.id) });
    res.render('index', { title: 'Twitter!', tweets: tweetsWithThatId });
});

router.post('/tweets',  function(req, res, next){
    tweetBank.add(req.body.name, req.body.text);
    res.redirect('/');
});

// router.get('/stylesheets/style.css', function(req, res, next){
//     res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' } ); //careful with the .. syntax
// });

module.exports = router;