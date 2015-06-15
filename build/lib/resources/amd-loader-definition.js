var AMD;

(function() {

    if (typeof AMD === 'undefined') {
        AMD = {};
    };

    var registry = {};
    var seen = {};

    var define = function(name, deps, callback) {

        var value = {};

        if (!callback) {

            value.deps = [];
            value.callback = deps;

        } else {

            value.deps = deps;
            value.callback = callback;

        }

        registry[name] = value;

    };

    var require = function(name) {

        return internalRequire(name, null);

    }

    function internalRequire(name, referrerName) {

        var exports = seen[name];

        if (exports !== undefined) {
            return exports;
        }

        exports = seen[name] = {};

        if (!registry[name]) {
            if (referrerName) {
                throw new Error('Could not find module ' + name + ' required by: ' + referrerName);
            } else {
                throw new Error('Could not find module ' + name);
            }
        }

        var mod = registry[name];
        var deps = mod.deps;
        var callback = mod.callback;
        var reified = [];
        var length = deps.length;

        for (var i = 0; i < length; i++) {

            if (deps[i] === 'exports') {
                reified.push(exports);
            } else {
                reified.push(internalRequire(resolve(deps[i], name), name));
            }

        }

        callback.apply(this, reified);

        return exports;

    };

    function resolve(child, name) {

        if (child.charAt(0) !== '.') {
            return child;
        }

        var parts = child.split('/');
        var parentBase = name.split('/').slice(0, -1);

        for (var i = 0, l = parts.length; i < l; i++) {

            var part = parts[i];

            if (part === '..') {
                parentBase.pop();
            } else if (part === '.') {
                continue;
            } else {
                parentBase.push(part);
            }

        }

        return parentBase.join('/');
    }

    AMD = {
        define: define,
        require: require,
        registry: registry
    };

})();