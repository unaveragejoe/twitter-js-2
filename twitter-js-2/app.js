var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var routes = require('./routes'); // looking for an index.js file
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var bodyParser = require('body-parser');

var locals = {
    title: 'Some Tile',
    people: [
        { name: 'Gandalf' },
        { name: 'Hermione' }
    ]
};


nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// takes a middleware function, if no path, assumes '/'.
//every time middleware function is called, must call next() to let it know the middleware function is done

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ entended: true})); // for standard HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

// app.use(function(req, res, next){
//     var mimeType = mime.lookup(req.path);
//     fs.readFile('./public' + req.path, function(err, fileBuffer){
//         if (err) return next();
//         res.header('Content-Type', mimeType);
//         res.send(fileBuffer);
//     });
// });

app.use('/', routes); // '/' not necessary, but there for specificity

app.listen(1337, function(){
    console.log('listening on port 1337');
});