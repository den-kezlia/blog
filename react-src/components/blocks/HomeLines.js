var React = require('react');

var HomeLines = module.exports = React.createClass({
    render: function () {
        return (
            <div className="posts__lines">
                <div className="posts__lines-item posts__lines-item-left"></div>
                <div className="posts__lines-item posts__lines-item-middle"></div>
                <div className="posts__lines-item posts__lines-item-right"></div>
            </div>
        );
    }
});