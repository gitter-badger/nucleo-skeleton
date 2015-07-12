class Parent {

  constructor() {

    this.name = 'parent name';
    this._age = 87;

  }

  updateName(name) {

    this.name = name;

  }

  get age(){

    return this._age;

  }

  set age(age){

    this._age = age;

  }

  static getEstimatedDeath(age) {

    return 55;

  }

}

export default Parent;