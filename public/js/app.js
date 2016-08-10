App = {
    init: function() {
        this.menu();
        this.BGLinkStyles();
        this.initForm();
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
    }
};

$(document).ready(function() {
    App.init();
});