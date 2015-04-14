import nume from 'nume';
import adunare from 'calcule/adunare';
import scadere from 'calcule/scadere';

var rezultate = {
	framework: nume,
	plus: adunare(1, 2),
	minus: scadere(9, 3)
};

export default rezultate;
