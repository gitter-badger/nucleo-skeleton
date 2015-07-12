import Parent from 'packages/classes/parent';

class Child extends Parent {

  constructor() {

    super();

  }

  static getEstimatedDeath(age) {

    return super.getEstimatedDeath() + 2;

  }

}

export default Child;