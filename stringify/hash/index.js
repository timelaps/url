var isObject = require('@timelaps/is/object');
var stringify = require('@timelaps/io/stringify');
var isUndefined = require('@timelaps/is/undefined');
module.exports = function (hash) {
    var base = '';
    if (!isUndefined(hash)) {
        hash = isObject(hash) ? stringify(hash) : hash;
        base += ('#' + hash);
    }
    return base;
};