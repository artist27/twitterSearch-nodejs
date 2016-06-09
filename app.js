var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var functions = require('./modular_functions');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', homepage);
app.get('/tweets', get_tweets);
app.get('/display', display_tweets);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
		
		console.log('dinlenen port ' + server.address().port);
});



module.exports = app;
