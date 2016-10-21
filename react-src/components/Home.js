var React = require('react');
var PostStore = require('../stores/posts');
var Article = require('./blocks/Article');
var HomeLines = require('./blocks/HomeLines');

var Home = React.createClass({
    getInitialState: function () {
        return {
            posts: PostStore.all()
        }
    },
    mixins: [PostStore.mixin()],
    render: function () {
        var items = this.state.posts.map(function (post, iterator) {
            return <Article post={post} key={post._id} iterator={iterator} />;
        });

        return (
            <section className="posts">
                <HomeLines />
                {items}
            </section>
        );
    }
});

module.exports = Home;