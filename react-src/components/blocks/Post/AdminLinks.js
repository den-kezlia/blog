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
            //TODO Add 'logout' router
            AdminLinks = (
                <Link to={`/post/edit/${this.props.id}`}>Edit</Link>
            );
        }

        return (<div>{AdminLinks}</div>);
    }
});

module.exports = AdminLinks;