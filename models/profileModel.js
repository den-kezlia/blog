var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var User     = require('./user');

var Profile = {
    edit: function(req, res) {
        User.findOne({'_id': req.user._id}, function(err, user) {
            if (err)
                return;

            if (!user)
                return;

            user.login = req.body.login;
            user.name = req.body.name;

            user.save(function(err) {
                if (err)
                    throw err;

                res.redirect('/profile');
            });
        });
    }
};

module.exports = Profile;

