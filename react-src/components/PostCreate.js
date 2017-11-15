var React = require('react');
var Dropzone = require('react-dropzone');
var PostStore = require('../stores/posts');
var actions = require('../actions');

var PostCreate = React.createClass({
    getInitialState: function () {
        /*TODO Implement Auth required functionality*/
        var date = new Date();
        var dateString = (date.getMonth() + 1) + '.' + date.getDate() + '.' + date.getFullYear();

        return {
            id: '',
            title: '',
            image: '',
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
                CKEDITOR.replace('content', {
                    allowedContent: 'iframe[*]',
                });

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
        this.state[event.target.id] = event.target.value;
    },
    onDrop: function (image) {
        this.setState({
            image: image
        });
    },
    deleteImage: function () {
        this.setState({
            image: ''
        })
    },
    handleSubmit: function (event) {
        /*TODO Implement Edit functionality*/
        event.preventDefault();

        var title = this.state.title,
            image = this.state.image[0],
            content = this.state.content,
            parentNode = this.state.parent,
            date = this.state.date,
            link = this.state.link;
        var formData = new FormData();

        if (!title) {
            this.setState({error: 'Заголовок не может быть пустым.'});

            return;
        }

        if (!content) {
            this.setState({error: 'Тело статьи не может быть пустым'});

            return;
        }

        /*TODO add functionality if message was updated */

        formData.append('title', title);
        formData.append('content', content);
        if (parentNode) {
            formData.append('parentNode', parentNode);
        }
        formData.append('date', date);
        formData.append('link', link);
        if (image) {
            formData.append('image', image, image.name);
        }

        actions.createPost(formData);
    },
    render: function () {
        var PostBlock = '',
            PostSelection = '';

        if (this.state.postsCollection) {
            PostSelection = this.state.postsCollection.map(function (item) {
                return (<option key={item._id} value={item._id}>{item.title}</option>);
            });
        }

        PostBlock = (<div className="page__create">
            <h2>Добавить Запись</h2>

            <div className="form form-create">
                <form onSubmit={this.handleSubmit} id="post">
                    <div className="form__row">
                        <input ref="title"
                               type="text"
                               id="title"
                               name="title"
                               onChange={this.handleChange}
                               placeholder="Заголовок"/>
                    </div>
                    <div className="form__row form__row-dropzone">
                        <Dropzone onDrop={this.onDrop} className="dropzone">
                            Загрузить картинку
                        </Dropzone>
                        {this.state.image.length > 0
                            ? <div className="dropzone-image">
                                {this.state.image.map((image) => <img key={image.preview} src={image.preview} /> )}
                                <span className="form__delete-image" onClick={this.deleteImage}>Delete</span>
                            </div>
                            : null}
                    </div>
                    <div className="form__row">
                        <textarea ref="content"
                                  className="ckeditor"
                                  id="content"
                                  name="content"
                                  value={this.state.content}
                                  onChange={this.handleChange}/>
                    </div>
                    <div className="form__row form__row-select">
                        <select ref="parentNode"
                                name="parent"
                                id="parent"
                                selected={this.state.parent}
                                onChange={this.handleChange}>
                            <option>Родительская Статья - Выбрать</option>
                            {PostSelection}
                        </select>
                    </div>
                    <div className="form__row-inline">
                        <div className="form__row">
                            <input ref="date"
                                   type="text"
                                   className="js-date-picker"
                                   name="date"
                                   id="date"
                                   value={this.state.date}
                                   onChange={this.handleChange}
                                   placeholder="Дата создания"/>
                        </div>
                        <div className="form__row">
                            <input ref="link"
                                   type="text"
                                   name="link"
                                   id="link"
                                   value={this.state.link}
                                   onChange={this.handleChange}
                                   placeholder="Link Alias"/>
                        </div>
                    </div>
                    <div className="form__error">{this.state.error}</div>
                    <div className="form__row-button">
                        <button>Создать</button>
                    </div>
                </form>
            </div>
        </div>);

        return (
            <div className="wrapper" id="wrapper">{PostBlock}</div>
        );
    }
});

module.exports = PostCreate;