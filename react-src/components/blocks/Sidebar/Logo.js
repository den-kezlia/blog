var React = require('react');
var Link = require('react-router').Link;

var Logo = React.createClass({
    render: function () {
        return (
            <div>
                <Link to='/' className="logo js-link" title='Arche Blog'>
                    <img className="hidden-element" src="/images/logo.png" alt="Arche Block"/>
                    <span id="home" className="home">
                        <span className="line"></span>
                        <span className="main-cycle cycle"></span>
                        <span className="left-cycle cycle nav-cycle"></span>
                        <span className="right-cycle cycle nav-cycle"></span>
                        <span className="inner-cycle cycle">
                            <span className="cycle-home">Blog</span>
                        </span>
                    </span>
                </Link>
            </div>
        );
    }
});

module.exports = Logo;