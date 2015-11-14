data = require('../js/data.js');
var logic = require('../js/logic.js');
var foo = require('../js/helper.js');
var assert = require('assert');
var ruleManager = logic.ruleManager;

beforeEach(function() {
	ruleManager.rules = [];
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

describe('180', function() {
    it('can access data', function () {
		assert.equal(data["pt1"].kurz, "PT I");
    });


    it('should test time', function () {
		initDataWith({
			"pt1": 1
		});
		var rules = logic.ruleManager.checkAll();
		assert(rules.numberFailedRules == 0);
    });
});
