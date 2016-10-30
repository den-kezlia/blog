var React = require('react');
var PostStore = require('../../stores/posts');

var WidgetCount = React.createClass({
	getInitialState: function () {
		return {
			id: this.props.id,
			child: PostStore.getChild(this.props.id)
		}
	},
	mixins: [PostStore.mixin()],
	render: function () {
		var WidgetCountBlock = (<div></div>);

		if (this.state.child.length) {
			WidgetCountBlock = (<div className="item__widget-count">Подстатьи: <span>{this.state.child.length}</span></div>);
		}

		return (<div>{WidgetCountBlock}</div>);
	}
});

module.exports = WidgetCount;