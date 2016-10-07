var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var ReactDom = require('react-dom');
var API = require('./api');

var routes = (<Route component={require('./components/App')}>
    <Route path="/" component={require('./components/Home')} />
    <Route path="post/:id" component={require('./components/Post')} />
</Route>);

API.fetchPosts();

ReactDom.render(<Router history={ReactRouter.browserHistory}>{routes}</Router>, document.getElementById('main'));