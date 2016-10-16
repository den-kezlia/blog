var constants = require('../constants');
var actions = require('../actions');

var UserStore = require('./store').extend({
    init: function () {
        this.bind(constants.LOGGIN, this.login);
        this.bind(constants.LOGGINED, this.loggined);
    },
    login: function (data) {

    },
    loggined: function (data) {
        if (data[0]) {
            this.set(data);
        }
    }
});

module.exports = UserStore;