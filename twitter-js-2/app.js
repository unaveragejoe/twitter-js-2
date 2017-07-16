var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');

var locals = {
    title: 'Some Tile',
    people: [
        { name: 'Gandalf' },
        { name: 'Hermione' }
    ]
};
// nunjucks.render(__dirname + '/views/index.html', locals, function(err, output){
//     if (err) return console.error(err);
//     console.log(output);
// });

nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// takes a middleware function, if no path, assumes '/'.
//every time middleware function is called, must call next() to let it know the middleware function is done

app.use(morgan('dev'));

app.get('/', function(req, res){
    res.render('index', locals);
});

app.get('/news', function(req, res, next){
    res.json({name: 'newsRoute', data: 12345});
});

app.listen(1337, function(){
    console.log('listening on port 1337');
});