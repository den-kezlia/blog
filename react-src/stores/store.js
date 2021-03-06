var assign = require('object-assign');
var EventEmitterProto = require('events').EventEmitter.prototype;
var CHANGE_EVENT = 'CHANGE';

var storeMethods = {
    init: function () {
    },
    set: function (arr) {
        var currIds = this._data.map(function (m) {
            return m._id;
        });

        arr.filter(function (item) {
            return currIds.indexOf(item._id) === -1;
        }).forEach(this.add.bind(this));
    },
    add: function (item) {
        this._data.push(item);
        this.sort();
    },
    update: function (data) {
        var _this = this;
        this._data.forEach(function (item, i) {
            if (item._id === data._id) {
                _this._data[i] = data;
            }
        });
    },
    sort: function () {
        this._data.sort(function (a, b) {
            return +new Date(b.date) - new Date(a.date);
        });
    },
    all: function () {
        return this._data;
    },
    get: function (id) {
        return this._data.filter(function (item) {
            return item._id === id;
        })[0];
    },
    addChangeListener: function (fn) {
        this.on(CHANGE_EVENT, fn);
    },
    removeChangeListener: function (fn) {
        this.removeListener(CHANGE_EVENT, fn);
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    bind: function (actionType, actionFn) {
        if (this.actions[actionType]) {
            this.actions[actionType].push(actionFn);
        } else {
            this.actions[actionType] = [actionFn];
        }
    }
};

var num = 1;

exports.extend = function (methods) {
    var store = {
        _data: [],
        actions: {},
        mixin: function () {
            var n = num++;
            var obj = {
                componentDidMount: function () {
                    store.addChangeListener(this['onChange' + n]);
                },
                componentWillUnmount: function () {
                    store.removeChangeListener(this['onChange' + n]);
                }
            };

            obj['onChange' + n] = function () {
                this.setState(this.getInitialState());
            };

            return obj;
        }
    };

    assign(store, EventEmitterProto, storeMethods, methods);

    store.init();

    require('../dispatcher').register(function (action) {
        if (store.actions[action.actionType]) {
            store.actions[action.actionType].forEach(function (fn) {
                fn.call(store, action.data);
                store.emitChange();
            })
        }
    });

    return store;
};