group('Testele mele in MOCHA: ', function(){

	test('says ceva', function(){

        check(define('ceva'), 'to.be', 'ceva');

    });

    test('says altceva', function(){

        check(define('ceva'), 'to.be', 'ceva');

	});

});