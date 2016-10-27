var React = require('react');
var Sidebar = require('./blocks/Sidebar');

var App = React.createClass({
    getInitialState: function () {
        return {
            user: USER
        }
    },
    render: function () {
        return (
            <div className="">
                <Sidebar user={this.state.user} />

				{this.props.children}
            </div>
        );
    }
});

module.exports = App;