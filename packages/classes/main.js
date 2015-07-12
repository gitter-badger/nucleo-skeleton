import Parent from 'packages/classes/parent';
import Child from 'packages/classes/child';

var result = {};

result.staticParent = Parent.getEstimatedDeath();
result.staticChild = Child.getEstimatedDeath();

var parentFather = new Parent();

parentFather.updateName('luke');

var parentMother = new Parent();

result.fatherName = parentFather.name;
result.motherName = parentMother.name;

var firstChild = new Child();

result.childName = firstChild.name;

export default result;