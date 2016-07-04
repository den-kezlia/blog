var Profile = require('./../models/profile');

module.exports = function (app, passport) {
    app.get('/login', function(req, res, next) {
        res.render('user/login', {message: req.flash('loginMessage')});
    });
    app.post('/login', passport.authenticate('login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureMessage: true
    }));
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/signup', function(req, res, next) {
        res.render('user/signup');
    });
    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile', isLoggedIn, function (req, res, next) {
        res.render('user/profile', {
            user: req.user
        });
    });
    app.get('/profile/edit', isLoggedIn, function (req, res, next) {
        res.render('user/edit', {
            user: req.user
        });
    });
    app.post('/profile/edit', function(req, res, next) {
        Profile.edit(req, res);
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}