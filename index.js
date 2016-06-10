var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// Routers
var blog = require('./routes/blog');
var user = require('./routes/user');

var publicFolder = __dirname + '/public';
app.use(express.static(publicFolder));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', blog);
app.get('/post/:id', blog);
app.get('/login', user);
app.post('/login', user);

app.listen(3000);