var React = require('react');
var PostStore = require('../../stores/posts');
var Link = require('react-router').Link;

var Footer = React.createClass({
    getInitialState: function () {
        return {
            link: this.props.link,
            nextPost: PostStore.getNext(this.props.link),
            prevPost: PostStore.getPrev(this.props.link)
        }
    },
    componentWillReceiveProps: function (prop) {
        if (this.state.link !== prop.link) {
            this.setState({
                link: prop.link,
                nextPost: PostStore.getNext(prop.link),
                prevPost: PostStore.getPrev(prop.link)
            });
        }
    },
    mixins: [PostStore.mixin()],
    render: function () {
        var prevLink = '';
        var nextLink = '';

        if (this.state.prevPost) {
            prevLink = (<Link to={`/post/${this.state.prevPost.link}`} className="nav-link nav-link-prev js-bgstyle js-bgstyle__medium">
                            {this.state.prevPost.title}
                        </Link>);
        }

        if (this.state.nextPost) {
            nextLink = (<Link to={`/post/${this.state.nextPost.link}`} className="nav-link nav-link-next js-bgstyle js-bgstyle__medium">
                            {this.state.nextPost.title}
                        </Link>);
        }

        return (<footer className="footer">
            <div className="nav">
                {prevLink}
                {nextLink}
            </div>
        </footer>);
    }
});

module.exports = Footer;