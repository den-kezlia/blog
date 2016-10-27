var React = require('react');
var PostStore = require('../../stores/posts');
var Link = require('react-router').Link;

var Footer = React.createClass({
	getInitialState: function() {
		return {
			id: this.props.id,
			nextPost: PostStore.getNext(this.props.id),
			prevPost: PostStore.getPrev(this.props.id)
		}
	},
	componentWillReceiveProps: function (prop) {
		if (this.state.id !== prop.id) {
			this.setState({
				id: prop.id,
				nextPost: PostStore.getNext(prop.id),
				prevPost: PostStore.getPrev(prop.id)
			});
		}
	},
	mixins: [PostStore.mixin()],
    render: function () {
		var prevLink = '';
		var nextLink = '';

		if (this.state.prevPost) {
			prevLink = (<Link to={`/post/${this.state.prevPost._id}`}
							  className="nav-link nav-link-prev js-bgstyle js-bgstyle__medium">{this.state.prevPost.title}</Link>);
		}

		if (this.state.nextPost) {
			nextLink = (<Link to={`/post/${this.state.nextPost._id}`}
							  className="nav-link nav-link-next js-bgstyle js-bgstyle__medium">{this.state.nextPost.title}</Link>);
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