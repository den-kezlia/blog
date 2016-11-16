var actions = require('./actions');
var dispatcher = require('./dispatcher');
var constants = require('./constants');
var utilUrl = require('./utils/url');
var axios = require('axios');

var API = {
    fetchPosts: function () {
        utilUrl.get('/api/posts').then(actions.gotPosts.bind(actions));
    },
    getUser: function () {
        utilUrl.get('/api/getUser').then(actions.loggined.bind(actions));
    },
    login: function (data) {
        var login = data.login;
        var password = data.password;

        utilUrl.post('/api/login', {login, password}).then(function (data) {
            if (typeof data.error !== 'undefined') {
                // TODO add error Action
                //_this.setState({error: data.error})
            }

            if (typeof data.user !== 'undefined') {
                actions.loggined([data.user]);
            }
        });
    },
    editPost: function (data) {
        utilUrl.post('/api/post/edit/' + data._id, data).then(function (data) {
            if (typeof data.error !== 'undefined') {
                // TODO add error Action
                //_this.setState({error: data.error})
            }

            if (typeof data.post !== 'undefined') {
                actions.editedPost(data.post);
            }
        });
    },
    createPost: function (data) {
        utilUrl.post('/api/post/create/', data).then(function (data) {
            if (typeof data.error !== 'undefined') {
                // TODO add error Action
                //_this.setState({error: data.error})
            }

            if (typeof data.post !== 'undefined') {
                actions.createdPost(data.post);
            }
        });
    }
};

dispatcher.register(function (action) {
    switch (action.actionType) {
        case constants.LOGIN:
            API.login(action.data);
            break;
        case constants.EDIT_POST:
            API.editPost(action.data);
            break;
        case constants.CREATE_POST:
            API.createPost(action.data);
            break;
    }
});

module.exports = API;