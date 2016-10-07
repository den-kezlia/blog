var React = require('react');
var moment = require('moment');
var Link = require('react-router').Link;
var PostStore = require('../stores/posts');
var Widget = require('./blocks/Widget');

var Post = module.exports = React.createClass({
    getInitialState: function() {
        var id = this.props.params.id;

        return {
            post: PostStore.get(id) || {}
        }
    },
    mixins: [PostStore.mixin()],
    render: function () {
        var post = this.state.post;
        return (
            <div>
                <section className="post">
                    <article className="item">
                        <input type="hidden" name="item-id" id="js-item__id" value={post._id} />

                        <h2 className="item__title">{post.title}</h2>
                        <div className="item__text" dangerouslySetInnerHTML={{__html: post.content}} />

                        <div className="item-info">
                            <div className="item-info__author">{post.author.name}</div>
                            <div className="item-info__date">{moment(post.date).fromNow()}</div>
                        </div>
                    </article>

                    <div className="back">
                        <Link to={`/`} >Назад</Link>
                    </div>
                </section>

                <Widget/>
            </div>
        );
    }
});