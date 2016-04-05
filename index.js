var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var blog = [{
        id: '1',
        name: 'Init title',
        author: 'Den Kezlia',
        date: '06.05.2015',
        content: 'Hey you'
    }, {
        id: '2',
        name: 'Processing title',
        author: 'Den Kezlia',
        date: '06.05.2015',
        content: 'Hey you!'
    }, {
        id: '3',
        name: 'Completed title',
        author: 'Den Kezlia',
        date: '06.05.2015',
        content: 'Good buy.'
    }];

app.get('/', function (req, res) {
    res.render('pages/index', {blog: blog});
});

app.listen(3000);