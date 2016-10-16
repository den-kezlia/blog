var util = {
    get: function (url) {
        return fetch(url, {
            credentials: 'same-origin'
        }).then(function (res) {
            return res.json();
        });
    },

    post: function (url, body) {
        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(body || {}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (res) {
            return res.json();
        });
    }
};

module.exports = util;