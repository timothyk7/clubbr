var PORT = 3000;

// Express is a web framework for node.js
// that makes nontrivial applications easier to build
var express = require('express');
var path = require('path');
var hbs = require('hbs');


var index = require('./routes/index');
var orgs = require('./routes/orgs');
var match_me = require('./routes/match_me');

// Create the server instance
var app = express();

// view engine setup
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

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
app.get('/orgs', orgs.view);
app.get('/match_me', match_me.view);