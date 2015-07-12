// Statement bodies
var nums = [2,4,6,8];
var evens = [];

nums.forEach(v => {

    evens.push(v);

});


// Lexical this
var bob = {
  _name: "Bob",
  _friends: ['Robert'],
  rezult:[],
  printFriends() {
    this._friends.forEach(f =>
      this.rezult.push(this._name + " knows " + f));
  }
};

bob.printFriends();

var friends = bob.rezult;


var result = {evens, friends};

export default result;