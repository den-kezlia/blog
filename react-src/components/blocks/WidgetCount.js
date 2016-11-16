var React = require('react');
var PostStore = require('../../stores/posts');
var Link = require('react-router').Link;
var Util = require('../../utils/util');

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
            var WidgetChildBlock = this.state.child.map(function (item, iterator) {
                return (<li key={item._id}>
                    <Link to={`/post/${item._id}`}><span>{Util.iterator(iterator + 1)}</span> {item.title}</Link>
                </li>);
            });

            WidgetCountBlock = (
                <div>
                    <div className="item__widget-count">
                        <div className="item__widget-count__label">
                            Продолжение: <span>{this.state.child.length}</span>
                        </div>
                        <div className="item__widget-child">
                            <ul className="ul__no-style">{WidgetChildBlock}</ul>
                        </div>
                    </div>
                </div>
            );
        }

        return (<div>{WidgetCountBlock}</div>);
    }
});

module.exports = WidgetCount;