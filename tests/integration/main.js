var test = QUnit.test;


test('nucleo framework should exist', function(assert){

	assert.ok(nucleo, 'nucleo exists');
	assert.ok(nc, 'nc exists');

});

test('should get the version', function(assert){

    assert.equal(nc.version, '0.0.1', 'can access version');

});

test('arrows', function(assert){

    assert.deepEqual(nc.arrows.evens, [2,4,6,8], 'in statement blocks');
    assert.deepEqual(nc.arrows.friends, ['Bob knows Robert'], 'in object literal');

});

test('classes', function(assert){

    assert.deepEqual(nc.klasses.staticParent, 55, 'static methods on parent');
    assert.deepEqual(nc.klasses.staticChild, 57, 'static methods on child');
    assert.deepEqual(nc.klasses.fatherName, 'luke', 'methods on parent');
    assert.deepEqual(nc.klasses.motherName, 'parent name', 'methods on child');
    assert.deepEqual(nc.klasses.childName, 'parent name', 'constructor on child');

});
