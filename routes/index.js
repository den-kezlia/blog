module.exports = function (app, passport) {
    require('./blog')(app);
    require('./user')(app, passport);
    require('./widget')(app);
    require('./api')(app);

    app.get('*', function (req, res) {
        res.render('layout-api');
    })
};