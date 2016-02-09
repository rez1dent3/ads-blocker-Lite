chrome.storage.local.get({
    rulesData: [],
    whitelisted: []
}, function (items) {

    rules = [];
    _rules = [];

    if (typeof items.rulesData.findKey != 'undefined') {
        _rules = items.rulesData.findKey(hostname);
    }

    if (typeof items.rulesData[ConstAllSite] != 'undefined') {
        _rules = _rules.concat(items.rulesData[ConstAllSite]);
    }

    if (typeof items.rulesData['^' + hostname] != 'undefined') {
        _rules = _rules.diff(items.rulesData['not:' + hostname]);
    }

    for (var i = 0; i < _rules.length; ++i) {
        rules.push(_rules[i]);
    }

    isNotWhitelist = items.whitelisted.indexOf(hostname) < 0;

    t1 = 0;
    blocker();
    document.addEventListener('DOMContentLoaded', function () {
        t1 = 0;
        blocker();
        document.addEventListener('DOMSubtreeModified', blocker, false);
    });

});