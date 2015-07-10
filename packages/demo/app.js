import nume from 'nume';
import adunare from 'calcule/adunare';
import scadere from 'calcule/scadere';

var plus = adunare(1, 2);
var minus = scadere(9, 3);

var rezultate = {
	framework: nume,
	plus: plus,
	minus: minus
};

export default rezultate;
