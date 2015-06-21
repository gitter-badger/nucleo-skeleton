var AMD;

(function() {

    if (typeof AMD === 'undefined') {
        AMD = {};
    };

    var registry = {};
    var seen = {};
    var registryLength = 0;

    var define = function(name, deps, callback) {

        var value = {};

        if (!callback) {

            value.deps = [];
            value.callback = deps;

        } else {

            value.deps = deps;
            value.callback = callback;

        }

        if(registry[name]){
            throw new Error('duplicatedModule ' + name);
        }

        registry[name] = value;

        registryLength++;

    };

    var require = function(name, submodule) {

        var module = internalRequire(name, null);
        var result = module[submodule || 'default'];

        return cloneObject(result);

    };

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

    }

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

    function cloneObject(source) {
        
        var name, s, i, empty = {}, dest = {};
        var isNotObject = Object.prototype.toString.call(source) !== "[object Object]";
        
        if(isNotObject){
            return source;
        }

        for(name in source){
            // the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
            // inherited from Object.prototype.  For example, if dest has a custom toString() method,
            // don't overwrite it with the toString() method that source inherited from Object.prototype
            s = source[name];
            if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
                dest[name] = cloneObject ? cloneObject(s) : s;
            }
        }

        return dest;

    }

    function getLength() {
        return registryLength;
    }

    function getRegistry() {
        return registry;
    }

    function destroy() {

        registry = {};
        seen = {};
        registryLength = 0;

    };

    AMD = {
        define: define,
        require: require,
        getRegistry: getRegistry,
        getLength: getLength,
        destroy: destroy
    };

})();