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
				id: this.props.id,
				nextPost: PostStore.getNext(prop.id),
				prevPost: PostStore.getPrev(prop.id)
			});
		}
	},
	mixins: [PostStore.mixin()],
    render: function () {
		var prevLink = (<a href="/" className="nav-link js-bgstyle js-bgstyle__medium disabled">Нет Старее</a>);
		var nextLink = (<a href="/" className="nav-link js-bgstyle js-bgstyle__medium disabled">Нет Новостей Новее</a>);

		if (this.state.nextPost) {
			prevLink = (<Link to={`/post/${this.state.prevPost._id}`} className="nav-link js-bgstyle js-bgstyle__medium">Старее - <span>{this.state.prevPost.title}</span></Link>);
		}

		if (this.state.prevPost) {
			nextLink = (<Link to={`/post/${this.state.nextPost._id}`} className="nav-link js-bgstyle js-bgstyle__medium">Новее - <span>{this.state.nextPost.title}</span></Link>);
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