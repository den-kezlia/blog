var Utils = require('../utils/util');

module.exports = function (app, passport) {
    require('./blog')(app);
    require('./user')(app, passport);
    require('./widget')(app);
    require('./api')(app, passport);

    app.get('*', function (req, res) {
        var user = false;
        if (req.isAuthenticated()) {
            user =  Utils.makeUserSafe(req.user);
        }
        res.render('layout-api', {user: user});
    })
};