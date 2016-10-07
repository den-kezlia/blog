var React = require('react');

var Footer = module.exports = React.createClass({
    render: function () {
        return (<footer className="footer">
            <div className="nav">
                <a href="#" className="nav-link js-bgstyle js-bgstyle__medium">Назад</a>
                <a href="#" className="nav-link js-bgstyle js-bgstyle__medium">Вперед</a>
            </div>
        </footer>);
    }
});