// define should add one entry in registry. check registry
// define should add 2 entries without overwriting
// define should add 4 entries without overwriting
// check values when it exports different types of values


QUnit.test('Adunare', function(assert){

    AMD.define('adunare', ['exports'], function(exports){

        var adunare = function adunare(x, y) {
            return x + y;
        };

        exports["default"] = adunare;

    });

    var adunare = AMD.require('adunare')['default'];

    assert.equal(adunare(1,2), 3, 'adunare(1, 2) should equal 3');

});

QUnit.test('Scadere', function(assert){

    AMD.define('scadere', ['exports'], function(exports){

        var scadere = function scadere(x, y) {
            return x - y;
        };

        exports["default"] = scadere;

    });

    var scadere = AMD.require('scadere')['default'];

    assert.equal(scadere(10,2), 8, 'scadere(10, 2) should equal 8');

});
