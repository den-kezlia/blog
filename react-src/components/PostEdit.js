var React = require('react');
var moment = require('moment');
var Link = require('react-router').Link;
var PostStore = require('../stores/posts');
var Widget = require('./blocks/Widget');

var Post = React.createClass({
    getInitialState: function() {
        var id = this.props.params.id;

        return {
            post: PostStore.get(id) || false
        }
    },
    mixins: [PostStore.mixin()],
    componentDidMount: function () {
        this.initForm();
    },
    componentDidUpdate: function () {
       this.initForm();
    },
    initForm: function () {
        $(this.refs.date).datepicker({
            dateFormat: 'mm.dd.yy'
        });
        if (this.refs.ckeditor) {
            CKEDITOR.replace('content-area');
        }
    },
    handleSubmit: function (event) {
        event.preventDefault();

        /*TODO Implement Edit functionality*/
    },
    render: function () {
        var PostBlock = '';
        var post = this.state.post;

        if (post) {
            var date = new Date(post.date);
            var dateString = date.getMonth() + 1 + '.' + date.getDate() + '.' + date.getFullYear();

            PostBlock = (<div>
                <h2>Edit Post <span>{post.name}</span></h2>

                <form onSubmit={this.handleSubmit}>
                    <input type="hidden" name="id" value={post._id}/>
                    <div className="form-row">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" value={post.title}/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="content-area">Content</label>
                        {/*TODO implement code editor*/}
                        <textarea ref="ckeditor" className="ckeditor" id="content-area" name="content" value={post.content}/>
                    </div>
                    <div className="form-row">
                        {/*TODO Parent Node*/}
                        <label htmlFor="parentnode">Родительская Статья</label>
                        <select name="parentnode" id="parentnode">
                            <option value="">Выбрать</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <label htmlFor="date">Date</label>
                        <input ref="date" type="text" className="js-date-picker" name="date" id="date" value={dateString} />
                    </div>
                    <div className="form-row">
                        <label htmlFor="link">Link</label>
                        <input type="text" name="link" id="link" value={post.link}/>
                    </div>
                    <div className="form-row">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>);
        }

        return (
            <div>{PostBlock}</div>
        );
    }
});

module.exports = Post;