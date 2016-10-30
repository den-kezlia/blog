var axios = require('axios');

var util = {
    get: function (url) {
		return axios.get(url).then(function (res) {
			return res.data;
		});
    },

    post: function (url, body) {
		return axios.post(url, body).then(function (res) {
			return res.data;
		});
    }
};

module.exports = util;