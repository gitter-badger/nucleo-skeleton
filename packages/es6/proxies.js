// Proxying a normal object
var target = {};
var handler = {
  get(receiver, name) {
    return `Hello, ${name}!`;
  }
};

var p = new Proxy(target, handler);
p.world === "Hello, world!";