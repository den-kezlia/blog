var Util = {
    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/');
    },

    makeUserSafe: function (user) {
        var safeUser = {};
        var safeKeys = ['_id', 'name', 'login'];

        safeKeys.forEach(function (key) {
            safeUser[key] = user[key];
        });

        return safeUser;
    }
};

module.exports = Util;