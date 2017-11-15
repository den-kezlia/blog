var React = require('react');
var UserStore = require('../stores/user');
var actions = require('../actions');

var Login = React.createClass({
    getInitialState: function () {
        return {
            login: '',
            password: '',
            user: UserStore.all()[0] || false
        };
    },
    mixins: [UserStore.mixin()],
    handleChange: function (event) {
        this.state[event.target.id] = event.target.value;
        this.state.error = '';
    },
    handleSubmit: function (event) {
        event.preventDefault();
        var login = this.state.login.trim();
        var password = this.state.password.trim();

        if (!login || !password) {
            return;
        }

        actions.login({
            login: login,
            password: password
        });
    },
    render: function () {
        var LoginForm = '';

        if (this.state.user) {
            LoginForm = (<div>
                User: {this.state.user.name}
            </div>);
        } else {
            LoginForm = (<div className="page__login">
                <h2>Войти</h2>

                <div className="form form-account">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form__row">
                            <input
                                type="text"
                                className="form__input-text"
                                name="login"
                                id="login"
                                placeholder="Login"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form__row">
                            <input
                                type="password"
                                className="form__input-password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form__error">{this.state.error}</div>
                        <div className="form__row-button">
                            <button type="submit" className="form__button button">Войти</button>
                        </div>
                    </form>
                </div>
            </div>);
        }

        return (<div className="wrapper" id="wrapper">
            {LoginForm}
        </div>);
    }
});

module.exports = Login;