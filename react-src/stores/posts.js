var constants = require('../constants');

var PostStore = module.exports = require('./store').extend({
    init: function () {
        this.bind(constants.GOT_POSTS, this.set);
        this.bind(constants.EDITED_POST, this.update);
        this.bind(constants.CREATED_POST, this.add);
    }
});