var React = require('react');
var Link = require('react-router').Link;
var Util = require('../../utils/util');
var WidgetCount = require('./WidgetCount');

var Article = React.createClass({
    render: function () {
        var post = this.props.post;
        var iterator = Util.iterator(this.props.iterator + 1);
        var imageClass = 'no-image';
        var ImageBlock = '';

        if (post.image) {
            ImageBlock = (<img src={Util.getImageUrl(post.image)} />);
            imageClass = '';
        }

        return (
            <article className="item js-bgstyle">
                <div className="item-line"></div>
                <div className="item-inner">
                    <h2 className="item__title">
                        <Link to={`/post/${post.link}`}>{post.title}</Link>
                    </h2>
                    <Link className={`item__image ${imageClass}`} to={`/post/${post.link}`}>
                        {ImageBlock}
                    </Link>
                    <div className="item__text"
                         dangerouslySetInnerHTML={{__html: post.content.slice(0, 500) + ' ...'}}/>
                </div>
                <div className="item__iterator">{iterator}</div>
                <WidgetCount id={post._id}/>
            </article>
        );
    }
});

module.exports = Article;