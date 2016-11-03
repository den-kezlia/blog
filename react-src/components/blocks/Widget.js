var React = require('react');
var Link = require('react-router').Link;
var PostStore = require('../../stores/posts');
var Util = require('../../utils/util');

var Widget = React.createClass({
	getInitialState: function() {
		return {
			id: this.props.id,
			child: PostStore.getChild(this.props.id)
		}
	},
	componentDidMount: function () {
		this.renderLines();

		var _this = this;
		$(window).on('resize', function () {
			_this.renderLines();
		});
	},
	componentDidUpdate: function () {
		this.renderLines();
	},
	componentWillReceiveProps: function (prop) {
		if (this.state.id !== prop.id) {
			this.setState({
				id: prop.id,
				child: PostStore.getChild(prop.id)
			});
		}
	},
	mixins: [PostStore.mixin()],
	renderLines: function () {
		var content = $('.post');
		var widgetsCount = this.state.child.length;

		for (var iterator = 0; iterator < widgetsCount; iterator++) {
			var svg = this.refs['item_' + iterator];
			var svgCurve = svg.getElementById('curve');
			var widget = $(svg).parent('.js-widget');

			var centerOfWidget = (widget.outerHeight() / 2) + widget.offset().top;
			var centerOfPost = (content.outerHeight() / (widgetsCount + 1) * (iterator + 1)) + content.offset().top;
			var svgHeight = centerOfWidget - centerOfPost;

			if (svgHeight > 0) {
				svg.style.height = svgHeight + 'px';
				svg.style.bottom = widget.outerHeight() / 2;

				svgCurve.setAttribute('d', 'M0,1 C30,1 10,' + (svgHeight - 1) + ' 40,' + (svgHeight - 1));
			} else {
				svgHeight = svgHeight * (-1);
				svg.style.height = svgHeight + 'px';
				svg.style.top = widget.outerHeight() / 2;

				svgCurve.setAttribute('d', 'M0,' + (svgHeight - 1) + ' C40,' + (svgHeight - 1) + ' 0,1 40,1');
			}
		}
	},
    render: function () {
    	/*TODO implement Widget*/
    	var WidgetBlock = (<div></div>);

    	var Widget = this.state.child.map(function (item, iterator) {
    	    var showMoreBlock = (<div></div>);
            if (item.content.length > 255) {
                showMoreBlock = (<div> + </div>);
            }

			return (
				<li key={item._id} className="widget__item js-widget">
					<svg className="widget__item-line" ref={`item_${iterator}`} width="40">
						<g id="Layer1" name="Layer 1" opacity="1">
							<g id="Shape1">
								<path id="curve" d="" style={{stroke: '#008DDE', opacity: 0.5, strokeWidth: 2, fill: 'none'}}/>
							</g>
						</g>
					</svg>
					<div className="widget__item-iterator">{Util.iterator(iterator + 1)}</div>
					<h3 className="widget__item-title"><Link to={`/post/${item._id}`}>{item.title}</Link></h3>
					{/*TODO Add button to show full article*/}
					<div className="widget__item-description" dangerouslySetInnerHTML={{__html: item.content}} />
                    {showMoreBlock}
				</li>);
		});

		if (Widget.length) {
			WidgetBlock = (
			<div className="widget">
				<h2 className="widget-title">Подстатьи:</h2>
				<ul>
					{Widget}
				</ul>
			</div>);
		}

        return (WidgetBlock);
    }
});

module.exports = Widget;