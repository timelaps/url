var isNil = require('@timelaps/is/nil');
var cacheable = require('@timelaps/fn/cacheable');
var assign = require('@timelaps/object/assign');
var parseSearch = cacheable(function (url) {
    var search = url.split(/\?/).slice(1).join('');
    return search ? '?' + search : search;
});
var parseProtocol = cacheable(function (host) {
    var split = host.split(/\:\/\//);
    return split.length > 1 ? split[0] + ':' : '';
});
var parsePort = cacheable(function (url) {
    var port = url.split(/\:/)[1];
    return port ? ':' + port : '';
});
var parseHostname = cacheable(function (host) {
    return host.split(/\:/)[0];
});
var parseHost = cacheable(function (url) {
    return url.split(/\//)[0];
});
var parseHash = cacheable(function (url) {
    var hash = url.split(/\#/).slice(1).join('');
    return hash ? '#' + hash : hash;
});
assign(parse, {
    search: parseSearch,
    protocol: parseProtocol,
    port: parsePort,
    host: parseHost,
    hostname: parseHostname,
    hash: parseHash
});
module.exports = parse;

function parse(url_) {
    var url = isNil(url_) ? '' : url_;
    var hash = parseHash(url);
    shortenBack(hash.length);
    var search = parseSearch(url);
    shortenBack(search.length);
    var protocol = parseProtocol(url);
    if (protocol.length) {
        shortenFront(protocol.length, 2);
    } else {
        if (url[0] === '/' && url[1] === '/') {
            url = url.slice(2);
        }
    }
    var host = parseHost(url);
    shortenFront(host.length, 0);
    return {
        host: host,
        hostname: parseHostname(host),
        port: parsePort(host),
        protocol: protocol,
        search: search,
        hash: hash,
        pathname: url
    };

    function shortenBack(by) {
        url = url.slice(0, url.length - by);
    }

    function shortenFront(by, byplus) {
        url = url.slice(by ? by + byplus : by);
    }
}