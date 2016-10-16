var React = require('react');
var Sidebar = require('./blocks/Sidebar');
var Footer = require('./blocks/Footer');

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

                <div id="content" className="content">
                    {this.props.children}
                </div>

                <Footer />
            </div>
        );
    }
});

module.exports = App;