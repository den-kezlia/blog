var constants = require('../constants');

var PostStore = require('./store').extend({
    init: function () {
        this.bind(constants.GOT_POSTS, this.set);
        this.bind(constants.EDITED_POST, this.update);
        this.bind(constants.CREATED_POST, this.add);
    },
    getByLink: function (link) {
        return this._data.filter(function (item) {
            return item.link === link;
        })[0];
    },
    getNext: function (link) {
        var nextItemNumber = false;
        this._data.map(function (item, iterator) {
            if (item.link === link) {
                // '-1' because of sorting by date
                return nextItemNumber = iterator - 1;
            }
        });

        if (typeof this._data[nextItemNumber] === 'undefined') {
            return false;
        } else {
            return this._data[nextItemNumber];
        }
    },
    getPrev: function (link) {
        var nextItemNumber = false;
        this._data.map(function (item, iterator) {
            if (item.link === link) {
                // '+1' because of sorting by date
                return nextItemNumber = iterator + 1;
            }
        });

        if (typeof this._data[nextItemNumber] === 'undefined') {
            return false;
        } else {
            return this._data[nextItemNumber];
        }
    },
    getChild: function (id) {
        var post = this.get(id);
        var child = [];

        if (post) {
            this._data.forEach(function (item) {
                if (item.parentNode === id) {
                    child.push(item);
                }
            });
        }

        return child;
    }
});

module.exports = PostStore;