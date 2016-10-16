var React = require('react');
var Link = require('react-router').Link;
var UserStore = require('../../stores/user');

var Sidebar = module.exports = React.createClass({
    getInitialState: function () {
        return {
            user: UserStore.all()[0]
        }
    },
    mixins: [UserStore.mixin()],
    render: function () {
        var ProfileLinks = '';

        if (this.state.user) {
            //TODO Add 'logout' router
            ProfileLinks = (<li className="submenu-list__item">
                <Link to={`/profile`} className="submenu-list__item__link js-bgstyle js-bgstyle__small">Профиль</Link>
                <a href="/logout" className="submenu-list__item__link js-bgstyle js-bgstyle__small">Выйти</a>
            </li>);
        } else {
            ProfileLinks = (<li className="submenu-list__item">
                <Link to={`/login`} className="submenu-list__item__link js-bgstyle js-bgstyle__small">Вход</Link>
            </li>);
        }

        return (<div id="sidebar" className="sidebar">
            <div className="sidebar-inner">
                <Link to='/' className="logo" title='Arche Blog'>
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
                </Link>

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
                        <Link to={`/`} className="submenu-list__item__link js-bgstyle js-bgstyle__small">Blog</Link>
                    </li>
                </ul>

                <div className="submenu__title">User Panel</div>
                <ul className="submenu-list">
                    {ProfileLinks}
                </ul>
            </div>
        </div>);
    }
});