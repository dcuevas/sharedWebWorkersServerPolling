var ajax = function(url, callback, type) {
    if (callback == null) {
        callback = function() {};
    }

    if (type == null) {
        //default to a GET request
        type = 'GET';
    }

    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            return callback(req.responseText);
        }
    };

    req.open(type, url, false);
    req.send();
    return req;
};
