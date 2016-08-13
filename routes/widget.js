var Posts       = require('./../models/post');

module.exports = function (app) {
    app.get('/widget/childnodes/:id', function (req, res, next) {
        Posts.find({'parentNode': req.params.id}).sort({date: -1}).populate('author').exec(function(err, items) {
            if (err)
                res.send({error: 'DB error'});

            if (items) {
                res.send(items);
            } else {
                res.send({message: 'no-data'});
            }
        });
    });
};