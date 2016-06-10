var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
    res.render('user/login');
});

router.post('/login', function(req, res, next) {
    res.render('user/login', {user: req.body.login});
});

module.exports = router;
