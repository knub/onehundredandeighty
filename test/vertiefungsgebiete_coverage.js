describe('vertiefungsgebiete_rule_coverage', function() {

	data = require('../js/data.js');
	data["foobar"] = {
		kurz: "Foobar",
		lehrform: ["Seminar"],
		modul: ["Vertiefungsgebiete"],
		semester: ["SS11"],
		vertiefung: ["OSIS"],
		cp: 3,
		dozent: ["Foobar"],
		nameLV: "Foobar"
	}
	var logic = require('../js/logic.js');
	var foo = require('../js/helper.js');
	var assert = require('assert');
	var ruleManager = logic.ruleManager;
	var semesterManager = logic.semesterManager;

	beforeEach(function() {
		ruleManager.rules = [];
		ruleManager.addVertiefungsgebieteRule();
	});

	var initDataWith = function(courses) {
		ruleManager.init(function getSemester(course) {
			var semester = courses[course];
			if (!semester)
				return -1;
			else
				return semester;
		});
	};

	it('works with active clause a', function () {
		//
		// true: “Es werden nur Veranstaltungen des VG OSIS belegt”
		//
		initDataWith({
			"android": 1,
			"bs2": 1,
			"cloud": 1,
			"foobar": 1,
			"nosql": 1,
			"parallelesrechnen": 1
		});
		var rules = logic.ruleManager.checkAll();
		var message = rules[0].message;
		assert(message.indexOf("Es müssen mindestens zwei Vertiefungsgebiete belegt werden") === -1);
		//
		// false: “Es werden Veranstaltungen der VG OSIS und BPET belegt”
		//
		initDataWith({
			"android": 1,
			"processapplications": 1,
			"nosql": 1,
			"enterpriseapplications": 1
		});
		var rules = logic.ruleManager.checkAll();
		var message = rules[0].message;
		assert(message.indexOf("Es müssen mindestens zwei Vertiefungsgebiete belegt werden") === -1);
	});

	it('works with active clause b', function () {
		//
		// true: “Es werden nur Veranstaltungen im Umfang von 21 LP belegt”
		//
		initDataWith({
			"android": 1, // 3 LP
			"bs2": 1, // 6 LP
			"cloud": 1,  // 3 LP
			"foobar": 1, // 3 LP
			"nosql": 1, // 3 LP
			// only 21 LP
		});
		var rules = logic.ruleManager.checkAll();
		var message = rules[0].message;
		assert(message.indexOf("Es müssen mindestens Vertiefungen im Umfang von 24 Leistungspunkten belegt werden.") > -1);
		//
		// false: “Es werden Veranstaltungen im Umfang von 24 LP belegt”
		//
		initDataWith({
			"android": 1, // 3 LP
			"bs2": 1, // 6 LP
			"cloud": 1,  // 3 LP
			"foobar": 1, // 3 LP
			"nosql": 1, // 3 LP
			"parallelesrechnen": 1 // 6 LP
			// full 24 LP
		});
		var rules = logic.ruleManager.checkAll();
		var message = rules[0].message;
		assert(message.indexOf("Es müssen mindestens Vertiefungen im Umfang von 24 Leistungspunkten belegt werden.") === -1);
	});

	it('works with active clause c', function () {
		//
		// true: “Es werden zwei VGs belegt, allerdings ein VG nur mit 6 LP”
		//
		initDataWith({
			"android": 1, // 3 LP OSIS
			"bs2": 1, // 6 LP OSIS
			"cloud": 1, // 3 LP OSIS
			"foobar": 1, // 3 LP OSIS
			"nosql": 1,  // 3 LP OSIS
			"processapplications": 1 // 6 LP BPET
		});
		var rules = logic.ruleManager.checkAll();
		var message = rules[0].message;
		assert(message.indexOf("Es müssen mindestens zwei unterschiedliche Vertiefungsgebiete mit jeweils mindestens 9 Leistungspunkten belegt werden, die zusammen 24 Leistungspunkte ergeben") > -1);
		//
		// false: “Es werden Veranstaltungen zweier VG mit 9 LP belegt
		//
		initDataWith({
			"bs2": 1, // 6 LP OSIS
			"cloud": 1, // 3 LP OSIS
			"enterprise": 1,  // 3 LP BPET
			"processapplications": 1 // 6 LP BPET
		});
		var rules = logic.ruleManager.checkAll();
		var message = rules[0].message;
		assert(message.indexOf("Es müssen mindestens zwei unterschiedliche Vertiefungsgebiete mit jeweils mindestens 9 Leistungspunkten belegt werden, die zusammen 24 Leistungspunkte ergeben") === -1);
	});

	it('works with active clause d', function () {
		//
		// true: “Ein VG wird ohne Vorlesung belegt”
		//
		initDataWith({
			"android": 1, // 3 LP OSIS
			"bs2": 1, // 6 LP OSIS
			"cloud": 1, // 3 LP OSIS
			"foobar": 1, // 3 LP OSIS
			"nosql": 1,  // 3 LP OSIS
			"enterpriseapplications": 1,  // 3 LP BPET
			"processapplications": 1 // 6 LP BPET
		});
		var rules = logic.ruleManager.checkAll();
		var message = rules[0].message;
		assert(message.indexOf("In jedem Vertiefungsgebiet muss mindestens eine Vorlesung belegt werden.") > -1);
	
	});
});
