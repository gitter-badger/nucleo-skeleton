// define should add one entry in registry. check registry
// define should add 2 entries without overwriting
// define should add 4 entries without overwriting

// instance of an custom object
// should not update reference. export number. update number. next require should have the initial value

var config = {
  afterEach: function() {
        AMD.destroy();
  }
};

QUnit.module('Adding entries', config); /*////////////////////////////////*/

QUnit.test('should add an entry with a basic function', function(assert){

    AMD.define('adunare', ['exports'], function(exports){

        var adunare = function adunare(x, y) {return x + y;};

        exports["default"] = adunare;

    });

    var adunare = AMD.require('adunare');

    assert.equal(adunare(1,2), 3, 'adunare(1, 2) should equal 3');
    ok(AMD.getRegistry().adunare, 'basic adunare should exist on registry');
    assert.deepEqual(AMD.getRegistry().adunare.deps, ['exports'], 'adunare deps should be saved correctly');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

QUnit.test('should add multiple entries', function(assert){

    AMD.define('adunare', ['exports'], function(exports){

        var adunare = function adunare(x, y) {return x + y;};

        exports["default"] = adunare;

    });

    AMD.define('scadere', ['exports'], function(exports){

        var scadere = function scadere(x, y) {
         return x - y;
        };

        exports["default"] = scadere;

    });

    AMD.define('number', ['exports'], function(exports){

        var result = 47;

        exports["default"] = result;

    });


    var adunare = AMD.require('adunare');
    var scadere = AMD.require('scadere');
    var number = AMD.require('number');

    assert.equal(adunare(1,2), 3, 'adunare(1, 2) should equal 3');
    ok(AMD.getRegistry().adunare, 'multiple adunare should exist on registry');
    assert.deepEqual(AMD.getRegistry().adunare.deps, ['exports'], 'adunare deps should be saved correctly');

    assert.equal(scadere(10,2), 8, 'scadere(10, 2) should equal 8');
    ok(AMD.getRegistry().scadere, 'scadere should exist on registry');
    assert.deepEqual(AMD.getRegistry().scadere.deps, ['exports'], 'scadere deps should be saved correctly');

    assert.equal(number, 47, 'primitive value is saved correctly');
    ok(AMD.getRegistry().number, 'primitive value should exist on registry');
    assert.deepEqual(AMD.getRegistry().number.deps, ['exports'], 'scadere deps should be saved correctly');

    assert.equal(AMD.getLength(), 3, 'registry length should be 3');

});

QUnit.test('should not add duplicated module names', function(assert){

    AMD.define('scadere', ['exports'], function(exports){

        var scadere = function scadere(x, y) {
            return x - y;
        };

        exports["default"] = scadere;

    });

    assert.throws(
        function(){
            AMD.define('scadere', function(){});
        },
        /duplicatedModule/,
        'should throw on duplicated Module name'
    );

});



QUnit.module('export submodules', config); /*////////////////////////////////*/

QUnit.test('should export submodules', function(assert){

    AMD.define('different/export/submodules', ['exports'], function(exports){

        var result = 'hello';

        exports["default"] = result;
        exports["notdefault"] = 99;

    });

    var result = AMD.require('different/export/submodules');
    var notdefault = AMD.require('different/export/submodules', 'notdefault');

    assert.equal(result, 'hello', 'should export correctly default');
    assert.equal(notdefault, 99, 'should export correctly notdefault');

});



QUnit.module('exports different type of values', config); /*////////////////////////////////*/

QUnit.test('should export string', function(assert){

    AMD.define('different/export/string', ['exports'], function(exports){

        var result = 'hello';

        exports["default"] = result;

    });

    var result = AMD.require('different/export/string');

    assert.equal(result, 'hello', 'should export correctly strings');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

QUnit.test('should export number', function(assert){

    AMD.define('different/export/number', ['exports'], function(exports){

        var result = 47;

        exports["default"] = result;

    });

    var result = AMD.require('different/export/number');

    assert.equal(result, 47, 'should export correctly numbers');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

QUnit.test('should export object', function(assert){

    AMD.define('different/export/object', ['exports'], function(exports){

        var result = {a:12,b:34};

        exports["default"] = result;

    });

    var result = AMD.require('different/export/object');

    assert.deepEqual(result, {a:12,b:34}, 'should export correctly object');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

QUnit.test('should export array', function(assert){

    AMD.define('different/export/array', ['exports'], function(exports){

        var result = [1,2,3,4,5];

        exports["default"] = result;

    });

    var result = AMD.require('different/export/array');

    assert.deepEqual(result, [1,2,3,4,5], 'should export correctly array');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

QUnit.test('should export undefined', function(assert){

    AMD.define('different/export/undefined', ['exports'], function(exports){

        var result;

        exports["default"] = result;

    });

    var result = AMD.require('different/export/undefined');

    assert.equal(result, undefined, 'should export correctly undefined');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

QUnit.test('should export null', function(assert){

    AMD.define('different/export/null', ['exports'], function(exports){

        var result = null;

        exports["default"] = result;

    });

    var result = AMD.require('different/export/null');

    assert.equal(result, null, 'should export correctly null');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

QUnit.test('should export function which returns', function(assert){

    AMD.define('different/export/function', ['exports'], function(exports){

        var result = function(ceva){return 'hello ' + ceva};

        exports["default"] = result;

    });

    var result = AMD.require('different/export/function');

    assert.equal(result('lume'), 'hello lume', 'should export correctly function');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

QUnit.test('should export function which does not returns', function(assert){

    AMD.define('different/export/function/noreturns', ['exports'], function(exports){

        var result = function(ceva){ var altceva = ceva + ceva;};

        exports["default"] = result;

    });

    var result = AMD.require('different/export/function/noreturns');

    assert.equal(result('lume'), null, 'should export correctly function');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});



QUnit.module('instances of objects', config); /*////////////////////////////////*/



QUnit.module('updating references', config); /*////////////////////////////////*/