var Posts = require('./../models/post');
var Utils = require('../utils/util');

module.exports = function (app, passport) {
    app.get('/api/posts', function (req, res) {
        Posts.find().sort({date: -1}).populate({path: 'author', select: '_id, name'}).exec(function(err, items) {
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
    });

    app.post('/api/post/edit/:id', isLoggedIn, function (req, res, next) {
        Posts.findOne({'_id': req.body._id}, function (err, post) {
            if (err) {
                /*TODO implement error message*/
                //res.redirect(req.get('referrer'));
            }

            if (!post) {
                /*TODO implement not founded post message*/
                //res.redirect(req.get('referrer'));
            }

            post.title = req.body.title;
            post.content = req.body.content;
            post.author = req.user._id;
            post.date = new Date(req.body.date);
            post.link = req.body.link;

            if (req.body.parentNode) {
                post.parentNode = req.body.parentNode;
            }

            post.save(function(err) {
                if (err)
                    next();

                res.json({post: post});
            })
        });
    });

    app.post('/api/post/create', isLoggedIn, function (req, res, next) {
        var post = new Posts();

        post.title = req.body.title;
        post.content = req.body.content;
        post.author = req.user._id;
        post.date = new Date(req.body.date);

        if (req.body.parentNode) {
            post.parentNode = req.body.parentNode;
        }

        post.save(function(err) {
            if (err)
                next();

            res.json({post: post});
        })
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.json({error: 'Not Auth'});
}