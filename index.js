var express         = require('express');
var app             = express();
var port            = 3000;
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var passport        = require('passport');
var flash           = require('connect-flash');
var session         = require('express-session');

// Configs
var publicFolder = __dirname + '/public';

app.use(express.static(publicFolder));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(session({
    secret: 'nodejablogsecret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routers
var blog = require('./routes/blog');
var user = require('./routes/user');

app.get('/', blog);
app.get('/post/:id', blog);
app.get('/login', user);
app.post('/login', user);

app.listen(port);