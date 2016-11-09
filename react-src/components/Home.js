var React = require('react');
var PostStore = require('../stores/posts');
var Article = require('./blocks/Article');

var Home = React.createClass({
    getInitialState: function () {
        return {
            posts: PostStore.all()
        }
    },
    mixins: [PostStore.mixin()],
    render: function () {
        var items = this.state.posts.map(function (post, iterator) {
            return <Article post={post} key={post._id} iterator={iterator}/>;
        });

        return (
            <div>
                <div id="wrapper" className="wrapper">
                    <section className="posts">
                        {items}
                    </section>
                </div>
            </div>
        );
    }
});

module.exports = Home;