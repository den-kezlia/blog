var express         = require('express');
var app             = express();
var port            = 3000;
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var passport        = require('passport');
var flash           = require('connect-flash');
var session         = require('express-session');
var morgan          = require('morgan');

// Configs
var publicFolder = __dirname + '/public';
var configDB = require('./config/database');
mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(express.static(publicFolder));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(session({
    secret: 'nodejablogsecret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.isLoggedIn = function() {
        return req.user != null;
    };

    next();
});
// Routers
require('./routes/index')(app, passport);

app.listen(port);