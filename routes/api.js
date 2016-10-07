var Posts = require('./../models/post');

module.exports = function (app) {
    app.get('/api/posts', function (req, res) {
        Posts.find().sort({date: -1}).populate('author').exec(function(err, items) {
            res.json(items);
        });
    })
};