var React = require('react');

var MenuButton = React.createClass({
    render: function () {
        return (
            <div>
                <a href="#" className="menu" id="menu">
                    <span className="menu__line"></span>
                    <span className="menu__line"></span>
                    <span className="menu__line"></span>
                </a>
            </div>
        )
    }
});

module.exports = MenuButton;