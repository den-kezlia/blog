var dispatcher = require('./dispatcher');
var constants = require('./constants');

/*exports.gotPosts = function (data) {
    dispatcher.dispatch({
       actionType: constants.GOT_POSTS,
       data: data
   })
};

exports.getUser = function (data) {
    dispatcher.dispatch({
        actionType: constants.GET_USER,
        data: data
    })
};

exports.login = function (data) {
    dispatcher.dispatch({
        actionType: constants.LOGIN,
        data: data
    })
};

exports.apiLogin = function (data) {
    dispatcher.dispatch({
        actionType: constants.API_LOGIN,
        data: data
    })
};

exports.loggined = function (data) {
    dispatcher.dispatch({
        actionType: constants.LOGGINED,
        data: data
    })
};*/

Object.keys(constants).forEach(function (key) {
    var funcName = key.split('_').map(function (word, i) {
        if (i === 0) return word.toLowerCase();
        return word[0] + word.slice(1).toLocaleLowerCase();
    }).join('');

    exports[funcName] = function (data) {
        dispatcher.dispatch({
            actionType: constants[key],
            data: data
        })
    }
});
