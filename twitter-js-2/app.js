var express = require('express');
var app = express();
var morgan = require('morgan');

var logger = morgan('dev');
app.use(logger);

// takes a middleware function, if no path, assumes '/'.
//every time middleware function is called, must call next() to let it know the middleware function is done
app.use(function(req, res, next){
    res.on('finish', function(){
        console.log('responded:', res.statusCode, req.method, req.path);     // subscribes to an event name!
    }); 
    next();
});

app.get('/', function(req, res){
    res.send('you go tthe root route');
});

app.get('/news', function(req, res){
    res.json({name: 'newsRoute', data: 12345});
    next();
});

app.use(function(req, res, next){
    console.log('response:', res.statusCode);
})

app.listen(1337, function(){
    console.log('listening on port 1337');
});