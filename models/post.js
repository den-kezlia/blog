var mongoose = require('mongoose');
var slug     = require('mongoose-slug-generator');
mongoose.plugin(slug);

var postSchema = mongoose.Schema({
    title: String,
    content: String,
    link: {
        type: String,
        slug: 'title',
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

postSchema.methods.editPost = function(req, res, next) {
    this.findOne({'_id': req.body.id}, function (err, post) {
        if (err) {
            res.redirect(req.get('referrer'));
        }

        if (!post) {
            res.redirect(req.get('referrer'));
        }

        post.title = req.body.title;
        post.content = req.body.content;
        post.author = req.user._id;
        post.link = req.body.link;

        post.save(function(err) {
            if (err)
                next();

            res.redirect('/post/' + post.link);
        })
    });
};

module.exports = mongoose.model('Post', postSchema);