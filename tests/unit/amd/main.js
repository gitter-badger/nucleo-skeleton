// WIP:
// - instance of an custom object
// - closures
// - dots and slashes in name - test relative paths

var config = {
  afterEach: function() {
        AMD.destroy();
  }
};
var test = QUnit.test;



QUnit.module('Adding entries', config);

test('should add an entry with a basic function', function(assert){

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

test('should add multiple entries', function(assert){

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

test('should not add duplicated module names', function(assert){

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



QUnit.module('export submodules', config);

test('should export submodules', function(assert){

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



QUnit.module('exports different type of values', config);

test('should export string', function(assert){

    AMD.define('different/export/string', ['exports'], function(exports){

        var result = 'hello';

        exports["default"] = result;

    });

    var result = AMD.require('different/export/string');

    assert.deepEqual(result, 'hello', 'should export correctly strings');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should export number', function(assert){

    AMD.define('different/export/number', ['exports'], function(exports){

        var result = 47;

        exports["default"] = result;

    });

    var result = AMD.require('different/export/number');

    assert.equal(result, 47, 'should export correctly numbers');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should export object', function(assert){

    AMD.define('different/export/object', ['exports'], function(exports){

        var result = {a:12,b:34};

        exports["default"] = result;

    });

    var result = AMD.require('different/export/object');

    assert.deepEqual(result, {a:12,b:34}, 'should export correctly object');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should export array', function(assert){

    AMD.define('different/export/array', ['exports'], function(exports){

        var result = [1,2,3,4,5];

        exports["default"] = result;

    });

    var result = AMD.require('different/export/array');

    assert.deepEqual(result, [1,2,3,4,5], 'should export correctly array');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should export date', function(assert){

    AMD.define('different/export/date', ['exports'], function(exports){

        var result = new Date();

        exports["default"] = result;

    });

    var result = AMD.require('different/export/date');

    assert.ok(result instanceof Date, 'should export correctly date');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should export regexp', function(assert){

    AMD.define('different/export/regexp', ['exports'], function(exports){

        var result = new RegExp(/[bvc]/);

        exports["default"] = result;

    });

    var result = AMD.require('different/export/regexp');

    assert.ok(result instanceof RegExp, 'should export correctly regexp');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should export undefined', function(assert){

    AMD.define('different/export/undefined', ['exports'], function(exports){

        var result;

        exports["default"] = result;

    });

    var result = AMD.require('different/export/undefined');

    assert.equal(result, undefined, 'should export correctly undefined');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should export null', function(assert){

    AMD.define('different/export/null', ['exports'], function(exports){

        var result = null;

        exports["default"] = result;

    });

    var result = AMD.require('different/export/null');

    assert.equal(result, null, 'should export correctly null');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should export function which returns', function(assert){

    AMD.define('different/export/function', ['exports'], function(exports){

        var result = function(ceva){return 'hello ' + ceva};

        exports["default"] = result;

    });

    var result = AMD.require('different/export/function');

    assert.equal(result('lume'), 'hello lume', 'should export correctly function');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should export function which does not returns', function(assert){

    AMD.define('different/export/function/noreturns', ['exports'], function(exports){

        var result = function(ceva){ var altceva = ceva + ceva;};

        exports["default"] = result;

    });

    var result = AMD.require('different/export/function/noreturns');

    assert.equal(result('lume'), null, 'should export correctly function');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});



QUnit.module('updating references', config);

test('should not update reference as a plain object', function(assert){

    AMD.define('different/export/object/ref', ['exports'], function(exports){

        var result = {a:12,b:34};

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref');

    initialObj.a = "suprascris";

    var finalObj = AMD.require('different/export/object/ref');

    assert.deepEqual(initialObj, {a:"suprascris",b:34}, 'update obj should be locally');
    assert.deepEqual(finalObj, {a:12,b:34}, 'should keep reference object');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should not update reference as a deep plain object', function(assert){

    AMD.define('different/export/object/ref/deep', ['exports'], function(exports){

        var result = {a:{c:5,d:'6'},b:34};

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/deep');

    initialObj.a = "suprascris";

    var finalObj = AMD.require('different/export/object/ref/deep');

    assert.deepEqual(initialObj, {a:"suprascris",b:34}, 'update deep obj should be locally');
    assert.deepEqual(finalObj, {a:{c:5,d:'6'},b:34}, 'should keep reference deep object');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should not update reference as a string', function(assert){

    AMD.define('different/export/object/ref/string', ['exports'], function(exports){

        var result = 'ref/string';

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/string');

    initialObj = "string suprascris";

    var finalObj = AMD.require('different/export/object/ref/string');

    assert.equal(initialObj, 'string suprascris', 'update string should be locally');
    assert.equal(finalObj, 'ref/string', 'should keep reference string');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should not update reference as a number', function(assert){

    AMD.define('different/export/object/ref/number', ['exports'], function(exports){

        var result = 87;

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/number');

    initialObj = "number suprascris";

    var finalObj = AMD.require('different/export/object/ref/number');

    assert.equal(initialObj, 'number suprascris', 'update number should be locally');
    assert.equal(finalObj, 87, 'should keep reference number');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should not update reference as a array', function(assert){

    AMD.define('different/export/object/ref/array', ['exports'], function(exports){

        var result = ['ref/array'];

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/array');

    initialObj = ["array suprascris"];

    var finalObj = AMD.require('different/export/object/ref/array');

    assert.deepEqual(initialObj, ['array suprascris'], 'update array should be locally');
    assert.deepEqual(finalObj, ['ref/array'], 'should keep reference array');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should not update reference as a undefined', function(assert){

    AMD.define('different/export/object/ref/undefined', ['exports'], function(exports){

        var result;

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/undefined');

    initialObj = "undefined suprascris";

    var finalObj = AMD.require('different/export/object/ref/undefined');

    assert.equal(initialObj, 'undefined suprascris', 'update undefined should be locally');
    assert.equal(finalObj, undefined, 'should keep reference undefined');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should not update reference as a null', function(assert){

    AMD.define('different/export/object/ref/null', ['exports'], function(exports){

        var result = null;

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/null');

    initialObj = "null suprascris";

    var finalObj = AMD.require('different/export/object/ref/null');

    assert.equal(initialObj, 'null suprascris', 'update null should be locally');
    assert.equal(finalObj, null, 'should keep reference null');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should not update reference as a function', function(assert){

    AMD.define('different/export/object/ref/function', ['exports'], function(exports){

        var result = function(msg){return msg+'aaa';};

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/function');

    initialObj = function(msg){return msg+'bbb';};

    var finalObj = AMD.require('different/export/object/ref/function');

    assert.equal(initialObj('say '), 'say bbb', 'update function should be locally');
    assert.equal(finalObj('say '), 'say aaa', 'should keep reference function');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should not update reference as a date', function(assert){

    AMD.define('different/export/object/ref/date', ['exports'], function(exports){

        var result = new Date();

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/date');

    initialObj = "date suprascris";

    var finalObj = AMD.require('different/export/object/ref/date');

    assert.equal(initialObj, 'date suprascris', 'update date should be locally');
    assert.ok(finalObj instanceof Date, 'should keep reference date');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should not update reference as a regexp', function(assert){

    AMD.define('different/export/object/ref/regexp', ['exports'], function(exports){

        var result = new RegExp(/[abc]/g);

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/regexp');

    initialObj = "regexp suprascris";

    var finalObj = AMD.require('different/export/object/ref/regexp');

    assert.equal(initialObj, 'regexp suprascris', 'update regexp should be locally');
    assert.ok(finalObj instanceof RegExp, 'should keep reference regexp');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});



QUnit.module('instances of objects', config);



QUnit.module('dependencies', config);

test('should get the correct dependencies', function(assert){

    AMD.define('app', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = aDep + ' ' + bDep;

        exports["default"] = result;

    });

    AMD.define('some/dep/1', ['exports'], function(exports){

        var result = 'a';

        exports["default"] = result;

    });

    AMD.define('some/dep/2', ['exports'], function(exports){

        var result = 'b';

        exports["default"] = result;

    });

    var result = AMD.require('app');

    assert.equal(result, 'a b', 'get correctly 2 dependencies');
    assert.equal(AMD.getLength(), 3, 'registry length should be 3');

});
