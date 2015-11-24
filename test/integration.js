data = require('../js/data.js');
var logic = require('../js/logic.js');
var foo = require('../js/helper.js');
var assert = require('assert');
var ruleManager = logic.ruleManager;

var initDataWith = function(courses) {
	ruleManager.init(function getSemester(course) {
		var semester = courses[course];
		if (!semester)
			return -1;
		else
			return semester;
	});
};

describe('integration', function() {
    it('works on Stefan\'s plan', function () {
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
		assert(rules.numberFailedRules == 0);
    });
});
