var React = require('react');
var Sidebar = require('./blocks/Sidebar');
var Footer = require('./blocks/Footer');

var App = React.createClass({
    render: function () {
        return (
            <div className="">
                <Sidebar />

                <div id="content" className="content">
                    {this.props.children}
                </div>

                <Footer />
            </div>
        );
    }
});

module.exports = App;