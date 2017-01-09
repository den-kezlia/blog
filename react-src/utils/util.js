var Utils = {
    iterator: function (iterator) {
        var iteratorString = "" + iterator;
        var pad = "00";

        return pad.substring(0, pad.length - iteratorString.length) + iteratorString;
    },
    getImageUrl: function (image) {
        return '/images/uploads/' + image;
    }
};

module.exports = Utils;