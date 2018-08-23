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
        if (this.state.posts) {
            var posts = this.state.posts,
                postsCount = posts.length;
            var items = posts.map(function (post, iterator) {
                var postNumber = postsCount - iterator;
                return <Article post={post} key={post._id} iterator={postNumber} />;
            });
        }

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