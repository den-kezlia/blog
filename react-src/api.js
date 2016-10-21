var actions = require('./actions');
var dispatcher = require('./dispatcher');
var constants = require('./constants');
var utilUrl = require('./utils/url');

var API = {
    fetchPosts: function () {
        get('/api/posts').then(actions.gotPosts.bind(actions));
    },
    getUser: function () {
        get('/api/getUser').then(actions.loggined.bind(actions));
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
    }
};

function get(url) {
    return fetch(url, {
       credentials: 'same-origin'
    }).then(function (res) {
        return res.json();
    });
}

dispatcher.register(function (action) {
    switch (action.actionType) {
        case constants.LOGIN:
            API.login(action.data);
            break;
        case constants.EDIT_POST:
            API.editPost(action.data);
    }
});

module.exports = API;