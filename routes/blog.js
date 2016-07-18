var Posts       = require('./../models/post');
var User       = require('./../models/user');
var PostModel = require('./../models/postModel');

module.exports = function (app) {
    /*var item = null;
    var posts = [{
        id: '4',
        title: 'Правила',
        author: 'Den Kezlia',
        date: '19.06.2016',
        content: '<h4>Правила созданы для того, чтобы их нарушать <small>Но перед тем как их нарушать, их надо знать.</small></h4>' +
        '<p>Именно такой концепции я придерживаюсь уже много лет, но у меня не получилась так красиво ее сформулировать. ' +
        'Именно также я веду себя за рулем, я нарушу правило дорожнего по двум приинам: если я его не знаю, и если знаю правило, ' +
        'знаю все нюансы, последствия и возможные результаты. И Вот тогда я нарушаю правило, если того требует ситуация. Ну а ситуации бывают разные :)</p>'
    },{
        id: '3',
        title: 'ToDo',
        author: 'Den Kezlia',
        date: '17.04.2016',
        content: '<p>Начал использовать Todoist для ежедневных задач. Удобно, просто и легкий дизайн. В бесплатной версии только не' +
        'хватает уведомлений. </p>' +
        '<p>Личные проекты веду в Trello. Подумываю использовать гитхабовские задачи. Хоть и есть интеграция Trello с Phpshtorm, ' +
        'но я всегда был приверженцем централизованной системы. Хочется, чтобы был некий комбайн, в котором будут все нужные сервисы.' +
        'И при этом легкий, понятный и красивый. Люблю красивый дизайн приложений.</p>'
    }, {
        id: '2',
        title: 'Блог',
        author: 'Den Kezlia',
        date: '01.04.2016',
        content: '<p>Еще не решил какую платформу буду использовать для блога. ' +
        'В будущем, обучаясь, хочу написать что-то свое. ' +
        'А пока либо установлю вордпрес, либо буду использовать какой-то сторонний сервис.</p>'
    }, {
        id: '1',
        title: 'Введение. Или подзадачи',
        author: 'Den Kezlia',
        date: '07.04.2016',
        content: '<p>Давно понимаю, что большие задачи нужно делить на подзадачи. Иначе есть шанс столкнуться с тем,' +
        'что можно так и не приступить к решению задачи, опосаясь объема и не понимания, с какой же стороны к ней подойти.' +
        'И часто так бывает, что в результате ничего и не делается. </p>' +
        '<p>Возникали моменты, когда начинаешь сам с собой или с третьей субличностью филосовстовать на тему, на сколько же ' +
        'должна быть маленькая задача, молв ее можно до бесконечности делить. И снова попасть в ловушку размышлений,' +
        ' так ничего и не сделав. </p>' +
        '<p>Создание блога тоже своего рода большая задача. И я уже говорил, что платформу хочется написать самому в качестве обучения.' +
        'И вот снова ловушка - мысли для постов могут появляться, а функционала еще нет. И одна из моих подзадач была вывести Hello World на Node js.' +
        'Так а почему "Hello World" не переделать в первые два поста блога?</p>'
    }];*/



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
                res.render('posts/edit', {post: post});
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
        res.render('posts/create');
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

