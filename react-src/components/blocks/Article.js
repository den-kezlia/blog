var React = require('react');
var Link = require('react-router').Link;

var Article = module.exports = React.createClass({
    render: function () {
        var post = this.props.post;

        return (
            <article className="item js-bgstyle" >
                <div className="item-inner">
                    <Link className="item__image" to={`/post/${post._id}`} />
                    <h2 className="item__title">
                        <Link to={`/post/${post._id}`}>{post.title}</Link>
                    </h2>
                    <div className="item__text" dangerouslySetInnerHTML={{__html: post.content.slice(0, 250)}} />
                </div>
                <div className="item__iterator">01</div>
            </article>
        );
    }
});