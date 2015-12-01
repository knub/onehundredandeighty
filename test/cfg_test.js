
describe('cfg_test', function() {

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



	it('tours edge pair A', function () {
		semesterManager.current = "WS15/16";
	
		initDataWith({
			"pt1": -1
		});
		var rules = logic.ruleManager.checkAll();
		assert(rules.numberFailedRules == 0);
	});

	it('tours edge pair B, D, G, J', function () {
		semesterManager.shownSemesters = [
			"hdjaksWS14/15",
			"daskjaSS15",
			"asasWS15/16",
			"dasaSS16",
			"dasasWS16/17",
			"dasdaSS17"
		];

		semesterManager.numberDisplayed=  6;
		semesterManager.current = "dnasnWS15/16";
	
		initDataWith({
			"pt1": 1
		});

		var rules = logic.ruleManager.checkAll();
		assert(rules.numberFailedRules == 1);
	});


	it('tours edge pair B, D, H, K', function () {
		semesterManager.shownSemesters = [
			"WS14/15",
			"SS15",
			"WS15/16",
			"SS16",
			"WS16/17",
			"SS17"
		];

		semesterManager.numberDisplayed=  6;
		semesterManager.current = "WS14/15";
		semesterManager.lastSummerSemester = "SS14";
		semesterManager.lastWinterSemester = "WS14/15";
	
		initDataWith({
			"pt1": 3
		});
		var rules = logic.ruleManager.checkAll();
		assert(rules.numberFailedRules == 0);
	});

	it('tours edge pair B, E, I', function () {
		semesterManager.shownSemesters = [
			"WS14/15",
			"SS15",
			"WS15/16",
			"SS16",
			"WS16/17",
			"SS17"
		];

		semesterManager.numberDisplayed=  6;
		semesterManager.current = "SS14";
		semesterManager.lastSummerSemester = "SS14";
		semesterManager.lastWinterSemester = "WS13/14";
	
		initDataWith({
			"pt2": 2
		});
		var rules = logic.ruleManager.checkAll();
		assert(rules.numberFailedRules == 0);
	});

	it('tours edge pair C, F', function () {
		semesterManager.shownSemesters = [
			"WS14/15",
			"SS15",
			"WS15/16",
			"SS16",
			"WS16/17",
			"SS17"
		];

		semesterManager.numberDisplayed=  6;
		semesterManager.current = "SS14";
		semesterManager.lastSummerSemester = "SS14";
		semesterManager.lastWinterSemester = "WS13/14";
	
		initDataWith({
			"pt1": 1
		});
		var rules = logic.ruleManager.checkAll();
		assert(rules.numberFailedRules == 0);
	});

});
