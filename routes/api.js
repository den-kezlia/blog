var Posts = require('./../models/post');
var Utils = require('../utils/util');

module.exports = function (app, passport) {
    app.get('/api/posts', function (req, res) {
        Posts.find().sort({date: -1}).populate('author').exec(function(err, items) {
            res.json(items);
        });
    });

    app.post('/api/login', function (req, res, next) {
        passport.authenticate('login', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.json({error: 'user not found'});
            }

            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }

                res.json({user: Utils.makeUserSafe(user)});
            });
        })(req, res, next);
    });

    app.get('/api/getUser', function (req, res, next) {
        var user = req.user;
        if (user) {
            user =  Utils.makeUserSafe(user);
        }
        res.json([user]);
    })
};