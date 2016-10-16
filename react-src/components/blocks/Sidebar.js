var React = require('react');
var Link = require('react-router').Link;
var Logo = require('./Sidebar/Logo');
var MenuButton = require('./Sidebar/MenuButton');
var Version = require('./Sidebar/Version');
var GlobalLinks = require('./Sidebar/GlobalLinks');
var ProfileLinks = require('./Sidebar/ProfileLinks');

var Sidebar = module.exports = React.createClass({
    render: function () {
        return (<div id="sidebar" className="sidebar">
            <div className="sidebar-inner">
                <Logo />
                <MenuButton />
                <Version />
            </div>

            <div className="submenu" id="submenu">
                <GlobalLinks />
                <ProfileLinks />
            </div>
        </div>);
    }
});