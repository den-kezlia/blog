var actions = require('./actions');
var dispatcher = require('./dispatcher');
var constants = require('./constants');

var API = {
    fetchPosts: function () {
        get('/api/posts').then(actions.gotPosts.bind(actions));
    }
};

function get(url) {
    return fetch(url, {
       credentials: 'same-origin'
    }).then(function (res) {
        return res.json();
    });
}

module.exports = API;