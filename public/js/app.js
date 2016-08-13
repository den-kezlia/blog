App = {
    init: function() {
        this.menu();
        this.BGLinkStyles();
        this.initForm();
    },

    initPostPage: function() {
        this.getChildNodes();
    },

    menu: function() {
        var menu = $('#menu');
        var submenu = $('#submenu');

        menu.on('click', function() {
            $('body').toggleClass('menu-active');
        });
    },

    BGLinkStyles: function() {
        var item = $('.js-bgstyle');

        item.on('mousemove', function(e) {
            var element = $(this);
            var top = e.pageY - element.offset().top;
            var left = e.pageX - element.offset().left;
            var colorOne = '#212121';
            var colorTwo = '#272727';
            var radius = 450;

            if (element.hasClass('js-bgstyle__medium')) {
                radius = 150;
                colorOne = '#252525';
                colorTwo = '#171717';
            }

            if (element.hasClass('js-bgstyle__small')) {
                radius = 50;
                colorOne = '#1f1f1f';
                colorTwo = '#171717';
            }

            element.css('background',
                'radial-gradient(' + radius + 'px at ' + left + 'px ' + top + 'px, ' + colorOne +', ' + colorTwo + ')');
        });
        item.hover(function() {}, function() {
            $(this).css('background', 'none');
        });
    },

    initForm: function() {
        $('.js-date-picker').datepicker({
            dateFormat: 'mm.dd.yy'
        });
    },

    getChildNodes: function() {
        var childNodes = $('.js-widget__child-nodes');

        if (childNodes.length > 0) {
            var url = '/widget/childnodes/' + $('#js-item__id').val();

            $.ajax({
                url: url
            }).done(function(data) {
                if (data.length) {
                    var html = '';

                    for (var iterator = 0; iterator < data.length; iterator++) {
                        var post = data[iterator];
                        html = html + '<div class="child-post">';
                            html = html + '<a href="' + post.link + '" class="child-post__title">' + post.title + '</a>';
                            html = html + '<div class="child-post__short-description">' + post.content.slice(0, 150)  + '</div>';
                        html = html + '</div>';
                    }

                    childNodes.html(html);
                }
            });
        }
    }
};

$(document).ready(function() {
    App.init();
    App.initPostPage();
});