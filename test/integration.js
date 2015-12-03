describe('integration', function() {

	data = require('../js/data.js');
	copyData = data
	var logic = require('../js/logic.js');
	var foo = require('../js/helper.js');
	var assert = require('assert');
	var ruleManager = logic.ruleManager;
	var semesterManager = logic.semesterManager;


	beforeEach(function() {
		ruleManager.rules = [];
		data = copyData;
	});

	var initDataWith = function(courses) {

		ruleManager.init(function getSemester(course) {
			var semester = courses[course];
			if (!semester)
				return -1;
			else
				return semester;
		});
		ruleManager.rules = [];
		ruleManager.addAllRules();
	};

    it('works on Stefan\'s plan', function () {
		semesterManager.shownSemesters = [ "WS10/11", "SS11", "WS11/12", "SS12", "WS12/13", "SS13" ];
		initDataWith({
			"beauty":4,
			"bs1":3,
			"dbs1":2,
			"dbs2":3,
			"fachenglisch1":1,
			"gds":1,
			"grafik1":4,
			"hci1":3,
			"mathematik1":1,
			"mathematik2":2,
			"mod1":1,
			"mod2":2,
			"pem":3,
			"praesentieren":4,
			"pt1":1,
			"pt2":2,
			"recht1":2,
			"recht2":3,
			"semanticmedia":5,
			"swa":3,
			"swt1":4,
			"swt2":5,
			"ti1":3,
			"ti2":4,
			"webzwonull":3,
			"wirtschaft1":1,
			"wirtschaft2":2,
			"www":2,
		});
		var rules = logic.ruleManager.checkAll();

		for (var rule = 0; rule < rules.length; rule += 1) {
			if (rules[rule].success === true) continue;
		}
		assert(rules.numberFailedRules == 0);
    });


    it('works on Richard\'s plan', function () {
		semesterManager.shownSemesters = [ "WS10/11", "SS11", "WS11/12", "SS12", "WS12/13", "SS13", "WS13/14", "SS14" ];
		initDataWith({
			"bs1":3,
			"bs2":6,
			"dbs1":4,
			"fachenglisch1":8,
			"gds":1,
			"grafik1":2,
			"hci1":7,
			"klubsprecher":8,
			"mathematik1":1,
			"mathematik2":2,
			"mod1":1,
			"mod2":2,
			"modellgetriebenesoftwareentwicklungvorlesung":5,
			"pem":5,
			"pois1":3,
			"pt1":1,
			"pt2":2,
			"recht1":2,
			"recht2":3,
			"studiumplus":3,
			"swa":5,
			"swt1":4,
			"ti1":5,
			"ti2":4,
			"webappselearning":7,
			"wirtschaftneu":3,
			"www":8,
		});
		var rules = logic.ruleManager.checkAll();

		for (var rule = 0; rule < rules.length; rule += 1) {
			if (rules[rule].success === true) continue;
		}
		assert(rules.numberFailedRules == 0);
    });
});
