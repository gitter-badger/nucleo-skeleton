/*!
 * @overview  nucleo-skeleton
 * @license   Licensed under MIT license
 *            See undefined
 * @version   0.0.1
 */


(function(mainContext, UNDEFINED){

    /* nucleo-amd v0.0.4  */!function(a){function b(a,d){var e=k[a];if(void 0!==e)return e;if(e=k[a]={},!j[a])throw d?new Error("Could not find module "+a+" required by: "+d):new Error("Could not find module "+a);for(var f=j[a],g=f.deps,h=f.callback,i=[],l=g.length,m=0;l>m;m++)"exports"===g[m]?i.push(e):i.push(b(c(g[m],a),a));return h.apply(this,i),e}function c(a,b){if("."!==a.charAt(0))return a;if(!m.relativePaths)throw new Error("Relative paths are not allowed: "+a+" required by "+b);for(var c=a.split("/"),d=b.split("/").slice(0,-1),e=0,f=c.length;f>e;e++){var g=c[e];if(".."===g)d.pop();else{if("."===g)continue;d.push(g)}}return d.join("/")}function d(a){var b,c,e={},f={},g="[object Object]"!==Object.prototype.toString.call(a);if(g)return a;for(b in a)c=a[b],b in f&&(f[b]===c||b in e&&e[b]===c)||(f[b]=d?d(c):c);return f}function e(){return l}function f(){return j}function g(a,b){m[a]=b}function h(){j={},k={},l=0,g("relativePaths",!0)}if("undefined"==typeof i)var i={};var j={},k={},l=0,m={relativePaths:!0},n=function(a,b,c){var d={};if(c?(d.deps=b,d.callback=c):(d.deps=[],d.callback=b),j[a])throw new Error("duplicatedModule "+a);j[a]=d,l++},o=function(a,c){var e=b(a,null),f=e[c||"default"];return d(f)};i={define:n,require:o,setConfig:g,getRegistry:f,getLength:e,reset:h},a.AMD=i}(this);
    
var define = AMD.define;
var requirePackage = AMD.require;

define("packages/arrows/functions", ["exports"], function (exports) {
  // Statement bodies
  var nums = [2, 4, 6, 8];
  var evens = [];

  nums.forEach(function (v) {

    evens.push(v);
  });

  // Lexical this
  var bob = {
    _name: "Bob",
    _friends: ["Robert"],
    rezult: [],
    printFriends: function printFriends() {
      var _this = this;

      this._friends.forEach(function (f) {
        return _this.rezult.push(_this._name + " knows " + f);
      });
    }
  };

  bob.printFriends();

  var friends = bob.rezult;

  var result = { evens: evens, friends: friends };

  exports["default"] = result;
});

define('packages/classes/child', ['exports', 'packages/classes/parent'], function (exports, _packagesClassesParent) {
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var Child = (function (_Parent) {
    function Child() {
      _classCallCheck(this, Child);

      _get(Object.getPrototypeOf(Child.prototype), 'constructor', this).call(this);
    }

    _inherits(Child, _Parent);

    _createClass(Child, null, [{
      key: 'getEstimatedDeath',
      value: function getEstimatedDeath(age) {

        return _get(Object.getPrototypeOf(Child), 'getEstimatedDeath', this).call(this) + 2;
      }
    }]);

    return Child;
  })(_packagesClassesParent['default']);

  exports['default'] = Child;
});

define('packages/classes/main', ['exports', 'packages/classes/parent', 'packages/classes/child'], function (exports, _packagesClassesParent, _packagesClassesChild) {

  var result = {};

  result.staticParent = _packagesClassesParent['default'].getEstimatedDeath();
  result.staticChild = _packagesClassesChild['default'].getEstimatedDeath();

  var parentFather = new _packagesClassesParent['default']();

  parentFather.updateName('luke');

  var parentMother = new _packagesClassesParent['default']();

  result.fatherName = parentFather.name;
  result.motherName = parentMother.name;

  var firstChild = new _packagesClassesChild['default']();

  result.childName = firstChild.name;

  exports['default'] = result;
});

define('packages/classes/parent', ['exports'], function (exports) {
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var Parent = (function () {
    function Parent() {
      _classCallCheck(this, Parent);

      this.name = 'parent name';
      this._age = 87;
    }

    _createClass(Parent, [{
      key: 'updateName',
      value: function updateName(name) {

        this.name = name;
      }
    }, {
      key: 'age',
      get: function get() {

        return this._age;
      },
      set: function set(age) {

        this._age = age;
      }
    }], [{
      key: 'getEstimatedDeath',
      value: function getEstimatedDeath(age) {

        return 55;
      }
    }]);

    return Parent;
  })();

  exports['default'] = Parent;
});

define('packages/main/main', ['exports', 'packages/arrows/functions', 'packages/classes/main'], function (exports, _packagesArrowsFunctions, _packagesClassesMain) {

  var app = {};

  app.version = '0.0.1';

  app.arrows = _packagesArrowsFunctions['default'];
  app.klasses = _packagesClassesMain['default'];

  exports['default'] = app;
});
mainContext.nucleo = mainContext.nc = requirePackage("packages/main/main");

})(this);
