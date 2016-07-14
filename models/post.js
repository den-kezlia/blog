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

module.exports = mongoose.model('Post', postSchema);