var React = require('react');
var Link = require('react-router').Link;

var GlobalLinks = React.createClass({
    render: function () {
        return (
            <div>
                <ul className="submenu-list">
                    <li className="submenu-list__item">
                        {/* TODO use CONSTANTS for arche link */}
                        <a href="http://arche.sounex.com" className="submenu-list__item__link js-bgstyle js-bgstyle__small">Arche</a>
                    </li>
                    <li className="submenu-list__item">
                        <Link to={`/`} className="submenu-list__item__link js-bgstyle js-bgstyle__small">Blog</Link>
                    </li>
                </ul>
            </div>
        );
    }
});

module.exports = GlobalLinks;