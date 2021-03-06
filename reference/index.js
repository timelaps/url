var cacheable = require('@timelaps/fn/cacheable');
var isString = require('@timelaps/is/string');
var withprotocolmatch = /^https?:\/\/.*?\//im;
module.exports = reference;

function reference(str_) {
    var match, str = str_;
    if (!str) {
        return '';
    }
    if (!isString(str)) {
        str = str.referrer;
    }
    if (isString(str)) {
        // gives it a chance to match
        str += '/';
        match = str.match(withprotocolmatch);
        if (match) {
            match = match[0].slice(0, match[0].length - 1);
        }
    }
    return match || '';
}