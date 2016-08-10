var Posts       = require('./../models/post');
var User       = require('./../models/user');
var PostModel = require('./../models/postModel');

module.exports = function (app) {
    app.get('/', function(req, res, next) {
        Posts.find().sort({date: -1}).populate('author').exec(function(err, items) {
            if (err)
                res.render('posts/all');

            var posts = JSON.stringify(items);
            res.render('posts/all', {posts: posts});
        });
    });

    app.get('/post/:id', function (req, res) {
        Posts.find({link: req.params.id}).populate('author').exec(function(err, item) {
            if (err)
                res.render('posts/all');

            var post = JSON.stringify(item);

            if (post) {
                res.render('posts/item', {post: post});
            } else {
                res.render('page-not-found');
            }
        });
    });

    app.get('/post/:link/edit', isLoggedIn, function (req, res) {
        Posts.find({link: req.params.link}).populate('author').exec(function(err, item) {
            if (err)
                res.render('posts/all');

            var post = JSON.stringify(item);

            if (post) {
                Posts.find().exec(function(err, items) {
                    var posts = JSON.stringify(items);

                    res.render('posts/edit', {
                        post: post,
                        posts: posts
                    });

                });
            } else {
                res.render('page-not-found');
            }
        });
    });
    app.post('/post/:link/edit', isLoggedIn, function(req, res, next) {
        PostModel.edit(req, res, next);
    });
    app.get('/post/:link/remove', isLoggedIn, function(req, res, next) {
        PostModel.remove(req, res, next);
    });

    app.get('/create', isLoggedIn, function (req, res, next) {
        Posts.find().exec(function(err, items) {
            if (err)
                res.render('posts/create');

            var posts = JSON.stringify(items);
            res.render('posts/create', {posts: posts});
        });
    });
    app.post('/create', isLoggedIn, function (req, res, next) {
        PostModel.create(req, res, next);
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}