var PORT = 3000;

// Express is a web framework for node.js
// that makes nontrivial applications easier to build
var express = require('express');
var http = require('http');
var path = require('path');
var hbs = require('hbs');
var handlebars = require('express3-handlebars')


var index = require('./routes/index');
var signup = require('./routes/signup');
var home = require('./routes/home');
var orgs = require('./routes/orgs');
var match_me = require('./routes/match_me');
var profile = require('./routes/profile');

// Create the server instance
var app = express();

// view engine setup
// app.set('view engine', 'html');
// app.engine('html', require('hbs').__express);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');


// Return all pages in the /static directory
// whenever they are requested at '/'
// e.g., http://localhost:3000/index.html
// maps to /static/index.html on this machine
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
var port = process.env.PORT || PORT; // 80 for web, 3000 for development
app.listen(port, function() {
	console.log("Node.js server running on port %s", port);
});

app.get('/', index.view);
app.get('/signup', signup.view);
app.get('/home', home.view);
app.get('/orgs', orgs.view);
app.get('/match_me', match_me.view);
app.get('/:id', orgs.clubInfo);
app.get('/profile', profile.view);
