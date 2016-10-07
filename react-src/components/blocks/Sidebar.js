var React = require('react');

var Sidebar = module.exports = React.createClass({
    render: function () {
        return (<div id="sidebar" className="sidebar">
            <div className="sidebar-inner">
                <a href="/" className="logo" title='Arche Blog'>
                    <span id="home" className="home">
                        <span className="line"></span>
                        <span className="main-cycle cycle"></span>
                        <span className="center-button blog"></span>
                        <span className="center-button version nav-cycle"></span>
                        <span className="left-cycle cycle nav-cycle"></span>
                        <span className="right-cycle cycle nav-cycle"></span>
                        <span className="inner-cycle cycle">
                            <span className="cycle-home">Blog</span>
                        </span>
                    </span>
                </a>

                <a href="#" className="menu" id="menu">
                    <span className="menu__line"></span>
                    <span className="menu__line"></span>
                    <span className="menu__line"></span>
                </a>

                <div className="version">ver 0.2.0</div>
            </div>

            <div className="submenu" id="submenu">
                <ul className="submenu-list">
                    <li className="submenu-list__item">
                        <a href="http://arche.sounex.com" className="submenu-list__item__link js-bgstyle js-bgstyle__small">Arche</a>
                    </li>
                    <li className="submenu-list__item">
                        <a href="http://blog.arche.sounex.com" className="submenu-list__item__link js-bgstyle js-bgstyle__small">Blog</a>
                    </li>
                </ul>

                <div className="submenu__title">Admin Panel</div>
                <ul className="submenu-list">
                    <li className="submenu-list__item">
                        <a href="/profile" className="submenu-list__item__link js-bgstyle js-bgstyle__small">Профиль</a>
                        <a href="/logout" className="submenu-list__item__link js-bgstyle js-bgstyle__small">Выйти</a>
                        <a href="/login" className="submenu-list__item__link js-bgstyle js-bgstyle__small">Вход</a>
                    </li>
                </ul>
            </div>
        </div>);
    }
});