var Post = require('./post');

var postCreate = {
    create: function (req, res, next) {
        var post = new Post();

        post.title = req.body.title;
        post.content = req.body.content;
        post.author = req.user._id;
        if (req.body.date) {
            post.date = new Date(req.body.date);
        }

        post.save(function(err) {
            if (err)
                next();

            res.redirect('/profile');
        })
    },

    edit: function (req, res, next) {
        Post.findOne({'_id': req.body.id}, function (err, post) {
            if (err) {
                res.redirect(req.get('referrer'));
            }

            if (!post) {
                res.redirect(req.get('referrer'));
            }

            post.title = req.body.title;
            post.content = req.body.content;
            post.author = req.user._id;
            post.date = new Date(req.body.date);
            post.link = req.body.link;

            post.save(function(err) {
                if (err)
                    next();

                res.redirect('/post/' + post.link);
            })
        });
    },

    remove: function (req, res, next) {
        Post.findOne({'link': req.params.link}, function (err, post) {
            if (err) {
                res.redirect(req.get('referrer'));
            }

            if (!post) {
                res.redirect(req.get('referrer'));
            }

            post.remove(function() {
                res.redirect('/');
            });
        });
    }
};

module.exports = postCreate;