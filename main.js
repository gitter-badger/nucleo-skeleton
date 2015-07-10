/*!
 * @overview  AMD-play
 * @license   Licensed under MIT license
 *            See https://github.com/dobre-robert-marius/testing-ENV
 * @version   0.0.1
 */


(function(mainContext, UNDEFINED){

    /* nucleo-amd v0.0.4  */!function(a){function b(a,d){var e=k[a];if(void 0!==e)return e;if(e=k[a]={},!j[a])throw d?new Error("Could not find module "+a+" required by: "+d):new Error("Could not find module "+a);for(var f=j[a],g=f.deps,h=f.callback,i=[],l=g.length,m=0;l>m;m++)"exports"===g[m]?i.push(e):i.push(b(c(g[m],a),a));return h.apply(this,i),e}function c(a,b){if("."!==a.charAt(0))return a;if(!m.relativePaths)throw new Error("Relative paths are not allowed: "+a+" required by "+b);for(var c=a.split("/"),d=b.split("/").slice(0,-1),e=0,f=c.length;f>e;e++){var g=c[e];if(".."===g)d.pop();else{if("."===g)continue;d.push(g)}}return d.join("/")}function d(a){var b,c,e={},f={},g="[object Object]"!==Object.prototype.toString.call(a);if(g)return a;for(b in a)c=a[b],b in f&&(f[b]===c||b in e&&e[b]===c)||(f[b]=d?d(c):c);return f}function e(){return l}function f(){return j}function g(a,b){m[a]=b}function h(){j={},k={},l=0,g("relativePaths",!0)}if("undefined"==typeof i)var i={};var j={},k={},l=0,m={relativePaths:!0},n=function(a,b,c){var d={};if(c?(d.deps=b,d.callback=c):(d.deps=[],d.callback=b),j[a])throw new Error("duplicatedModule "+a);j[a]=d,l++},o=function(a,c){var e=b(a,null),f=e[c||"default"];return d(f)};i={define:n,require:o,setConfig:g,getRegistry:f,getLength:e,reset:h},a.AMD=i}(this);

    define('ceva f random');

    mainContext.chooseNameFromConfig = 'random stuff';

    group('Testele mele in MOCHA: ', function(){

	test('says ceva', function(){

        check(define('ceva'), 'to.be', 'ceva');

    });

    test('says altceva', function(){

        check(define('ceva'), 'to.be', 'ceva');

	});

});


})(window);
