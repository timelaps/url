var reduce = require('@timelaps/array/reduce');
var search = require('./search');
var returnsFirst = require('@timelaps/returns/first');
var hash = require('./hash');
var hash = {
    search: search,
    hash: hash
};
stringify.hash = hash;
stringify.search = search;
var parts = 'protocol,host,pathname,search,hash'.split(',');
module.exports = stringify;

function stringify(location) {
    return reduce(parts, function (memo, key, index) {
        return memo + (hash[key] || returnsFirst)(location[key] || '') + (!index ? '//' : '');
    }, '');
}