var Post = require('./post');

var postCreate = {
    create: function (req, res, next) {
        var post = new Post();

        post.title = req.body.title;
        post.content = req.body.content;
        post.author = req.user._id;

        post.save(function(err) {
            if (err)
                next();

            res.redirect('/profile');
        })
    }
};

module.exports = postCreate;