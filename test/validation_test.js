describe('validation_test', function() {

	data = require('../js/data.js');
	var logic = require('../js/logic.js');
	var foo = require('../js/helper.js');
	var assert = require('assert');
	var ruleManager = logic.ruleManager;
	var semesterManager = logic.semesterManager;

	beforeEach(function() {
		ruleManager.rules = [];
		data = {
			"pt1": { semester: "WS14/15", nameLV: "PT1"},
			"pt2": { semester: "SS14", nameLV: "PT2"},
		};
		ruleManager.addTimeRule();
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

	it('§ 2 is fulfiled', function () {
		// semesterManager.current = "WS15/16";
	
		// initDataWith({
		// 	"pt1": -1
		// });
		// var rules = logic.ruleManager.checkAll();
		// assert(rules.numberFailedRules == 0);
	});

	it('§ 3 is fulfiled', function () {
	});

	it('§ 8 is fulfiled', function () {
	});

	it('§ 9(1) is fulfiled', function () {
	});

	it('§ 9(2) is fulfiled', function () {
	});

	it('§ 9(3) is fulfiled', function () {
	});

	it('§ 9(4) is fulfiled', function () {
	});

	it('§ 10 is fulfiled', function () {
	});

	it('§ 11 is fulfiled', function () {
	});
});
