var React = require('react');
var PostStore = require('../stores/posts');
var actions = require('../actions');

var PostCreate = React.createClass({
    getInitialState: function() {
        /*TODO Implement Auth required functionality*/

        actions

        var date = new Date();
        var dateString = (date.getMonth() + 1) + '.' + date.getDate() + '.' + date.getFullYear();

        return {
            id: '',
            title: '',
            content: '',
            parent: false,
            date: dateString,
            link: '',
            postsCollection: PostStore.all(),
            error: false
        }
    },
    mixins: [PostStore.mixin()],
    componentDidMount: function () {
        this.initForm();
    },
    componentDidUpdate: function () {
       this.initForm();
    },
    componentWillUnmount: function () {
        this.unmountForm();
    },
    initForm: function () {
        $(this.refs.date).datepicker({
            dateFormat: 'mm.dd.yy',
            onSelect: this.setDate
        });
        if (this.refs.content) {
            if (!CKEDITOR.instances['content']) {
                CKEDITOR.replace('content');

                var _this = this;
                CKEDITOR.instances['content'].on('change', function () {
                    _this.setContent(CKEDITOR.instances['content'].getData());
                })
            }
        }
    },
    unmountForm: function () {
        CKEDITOR.instances['content'].destroy(true);
    },
    setDate: function (date) {
        this.setState({date: date});
    },
    setContent: function (content) {
        this.setState({content: content});
    },
    handleChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    },
    handleSubmit: function (event) {
        /*TODO Implement Edit functionality*/
        event.preventDefault();

        var id = this.state.id;
        var title = this.state.title;
        var content = this.state.content;
        var parentNode = this.state.parent;
        var date = this.state.date;
        var link = this.state.link;

        if (!title || !content) {
            /*TODO implement error message*/
            this.setState({error: 'Title and Content fields are required'});
            return;
        }

        /*TODO add functionality if message was updated */

        actions.createPost({
            _id: id,
            title: title,
            content: content,
            parentNode: parentNode,
            date: date,
            link: link
        });
    },
    render: function () {
        var PostBlock = '';
        var PostSelection = '';

        if (this.state.postsCollection) {
            PostSelection = this.state.postsCollection.map(function (item) {
                return (<option key={item._id} value={item._id}>{item.title}</option>);
            });
        }

        PostBlock = (<div>
            <h2>Add Post</h2>

            <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                    <label htmlFor="title">Title</label>
                    <input ref="title" type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange}/>
                </div>
                <div className="form-row">
                    <label htmlFor="content">Content</label>
                    <textarea ref="content" className="ckeditor" id="content" name="content" value={this.state.content} onChange={this.handleChange}/>
                </div>
                <div className="form-row">
                    <label htmlFor="parent">Родительская Статья</label>
                    <select ref="parentNode" name="parent" id="parent" selected={this.state.parent} onChange={this.handleChange}>
                        <option>Выбрать</option>
                        {PostSelection}
                    </select>
                </div>
                <div className="form-row">
                    <label htmlFor="date">Date</label>
                    <input ref="date" type="text" className="js-date-picker" name="date" id="date" value={this.state.date} onChange={this.handleChange} />
                </div>
                <div className="form-row">
                    <label htmlFor="link">Link</label>
                    <input ref="link" type="text" name="link" id="link" value={this.state.link} onChange={this.handleChange}/>
                </div>
                <div className="error">{this.state.error}</div>
                <div className="form-row">
                    <button>Submit</button>
                </div>
            </form>
        </div>);

        return (
            <div className="wrapper" id="wrapper">{PostBlock}</div>
        );
    }
});

module.exports = PostCreate;