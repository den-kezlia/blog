var React = require('react');
var moment = require('moment');
var Link = require('react-router').Link;
var PostStore = require('../stores/posts');
var Widget = require('./blocks/Widget');
var AdminLinks = require('./blocks/Post/AdminLinks');
var Footer = require('./blocks/Footer');

var Post = React.createClass({
    getInitialState: function() {
        var id = this.props.params.id;

        return {
            post: PostStore.get(id) || false
        }
    },
    mixins: [PostStore.mixin()],
    render: function () {
        var PostBlock = '';
        var post = this.state.post;

        if (post) {
            PostBlock = (<div>
                    <section className="post">
                        <article className="item">
                            <h2 className="item__title">{post.title}</h2>
                            <div className="item__text" dangerouslySetInnerHTML={{__html: post.content}} />

                            <div className="item-info">
                                <div className="item-info__author">{post.author.name}</div>
                                <div className="item-info__date">{moment(post.date).fromNow()}</div>
                            </div>

                            <AdminLinks id={post._id} />
                        </article>

                        <div className="back">
                            <Link to='/'>Назад</Link>
                        </div>
                    </section>

                    <Widget/>
                </div>);
        }

        return (
            <div>
				<div className="wrapper page__post" id="wrapper">{PostBlock}</div>
				<Footer />
			</div>
        );
    }
});

module.exports = Post;