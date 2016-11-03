var React = require('react');
var Link = require('react-router').Link;
var UserStore = require('../../../stores/user');

var AdminLinks = React.createClass({
    getInitialState: function () {
        return {
            user: UserStore.all()[0] || false
        }
    },
    mixins: [UserStore.mixin()],
    render: function () {
        var AdminLinks = '';

        if (this.state.user) {
            AdminLinks = (<div className="item__admin-links">
                <Link to={`/post/edit/${this.props.id}`}>Редактировать</Link>
                {/*TODO implement article delete functionality*/}
                <Link to={`/post/remove/${this.props.id}`}>Удалить</Link>
            </div>);
        }

        return (<div>{AdminLinks}</div>);
    }
});

module.exports = AdminLinks;