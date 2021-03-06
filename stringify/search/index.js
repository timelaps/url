var isObject = require('@timelaps/is/object');
var stringify = require('@timelaps/io/stringify');
var forOwn = require('@timelaps/n/for/own');
var isUndefined = require('@timelaps/is/undefined');
var isString = require('@timelaps/is/string');
module.exports = function (query_) {
    var val, n, base = '',
        query = [];
    if (isObject(query_)) {
        forOwn(query_, function (val, n) {
            if (!isUndefined(val)) {
                val = encodeURIComponent(isString(val) ? val : stringify(val));
                query.push(n + '=' + val);
            }
        });
        base += query.join('&');
    }
    if (base.length && base[0] !== '?') {
        base = '?' + base;
    }
    return base;
};