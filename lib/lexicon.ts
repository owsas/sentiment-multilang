/**
 * Loads the data from the json files
 * and exports it more information
 * about the language
 */

const en = require('./en.json');
const es = require('./es.json');
const fr = require('./fr.json');
const it = require('./it.json');
const de = require('./de.json');
const nl = require('./nl.json');

const data = {
	langs: {"en": true, "fr": true, "it": true, "es": true},
	negations: {
		en: {"without": 1,"not":1,"no":1,"minus":1},
		es: {"sin": 1, "nada": 1, "no":1,"menos":1},
		fr: {"sans": 1,"ne":1,"non":1,"moins":1, "pas":1, "n\'":1},
		it: {"senza":1,"non":1,"niente":1,"nulla":1,"meno":1},
		de: {"nicht": 1, "garnicht":1, "kein": 1, "keine": 1, "keines": 1, "keinem": 1, "keinen": 1, "keiner": 1, "keinesfalls": 1, "keineswegs": 1},
		nl: {"nee": 1, "niet": 1, "geen": 1}
	},
	truncated: {"en": false, "it": true, "fr": false, "es": false},
	en,
	es,
	fr,
	it,
	de,
	nl,
};

export default data;
