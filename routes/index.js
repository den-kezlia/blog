module.exports = function (app, passport) {
    require('./blog')(app);
    require('./user')(app, passport);
};