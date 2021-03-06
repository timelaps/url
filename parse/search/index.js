var reduce = require('@timelaps/array/reduce');
var parse = require('object/parse');
module.exports = parseSearch;

function parseSearch(search) {
    var content = search[0] === '?' ? search.slice(0) : search;
    return reduce(decodeURI(content).split('&'), function (memo, block) {
        var split = block.split(/\=/);
        memo[split[0]] = parse(decodeURIComponent(split[1]));
    }, {});
}