/* use strict-mode provided by ecma-script5, see http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/ for details */
"use strict";

/*
 * Holds all relevant information from the study regulations 
 * 'Fachspezifische Ordnung für das Bachelor- und Masterstudium im Fach IT-Systems Engineering an der Universität Potsdam'
 * (variable names in german, because 'Vertiefungsgebiete' is hard to translate and not really nice)
 */
var studyRegulations = {
	module: [
		"Grundlagen IT-Systems Engineering",
		"Mathematische und theoretische Grundlagen",
		"Softwaretechnik und Modellierung",
		"Rechtliche und wirtschaftliche Grundlagen",
		"Softwarebasissysteme",
		"Vertiefungsgebiete",
		"Softskills"
	],
	vertiefungsgebiete: [
		"BPET",
		"HCT",
		"IST",
		"OSIS",
		"SAMT"
	]
};
var semesterManager = {
	semesters: [
		"WS10/11",
		"SS11",
		"WS11/12",
		"SS12",
		"WS12/13",
		"SS13",
		"WS13/14",
		"SS14"
	],
	shownSemesters: [
		"WS10/11",
		"SS11",
		"WS11/12",
		"SS12",
		"WS12/13",
		"SS13"
	],
	current: "WS11/12",
	startswith: "WS11/12"	/* the semester that is the first semester when you first start the application */
};



var ruleManager = {
	getSemester: null,
	rules: [],
	init: function (getSemester_Function) {
		this.getSemester = getSemester_Function;
	},
	checkAll: function () {
		var messages = [];
		for (var rule = 0; rule < this.rules.length; rule += 1) {
			if (!this.rules[rule].check(this.getSemester)) {
				messages.push(this.rules[rule].message);
			}
		}
		return messages;
	}
};

/*
 * Rule-objectes, each representing one special type of rule
 * These objects basically act as classes (will be 'cloned' by Object.create later
 * It's a kind of 'inheritance by convention', meaning:
 * 	- each rule must have a check method, which - given a special course to check - passes or fails
 *	- each rule must have a message property, which will be displayed, if the rule/test fails
 *	- there is one init-method, serving as constructor, which takes neccessary parameters and saves them, finally returning 'this'
 *
 * Furthermore, most objects have some special properties needed for that special kind of rule
 */

/* 1. Must-Do-Rule: a certain course must be done. */
var mustDoRule = {
	/* constructor */
	init: function (course) {
		this.course = course;
		this.message = "Das Fach '" + data[this.course].nameLV + "' muss belegt werden.";

		return this;
	},
	/* check method */
	check: function (getSemester) {
		// if course is currently not selected for a certain semester, but put in courses-pool (indicated by -1), return false
		if (getSemester(this.course) === -1)
			return false;
		return true;
	},
	/* message */
	message: "Das Fach muss belegt werden.",
	/* needed to save for what course the current rule applies */
	course: ""
};
/* 2. Before-Rule: a certain course must be done before another */
var beforeRule = {
	/* constructor */
	init: function (before, after) {
		this.before = before;
		this.after = after;
	},
	/* check method */
	check: function (getSemester) {
		/* before -1, fail!
		* after -1, no problem
		*/
	},
	/* message */
	message: "Ein Fach muss vor einem anderen belegt werden.",
	/* needed to save, which course must be done before which */
	before: "",
	after: ""
};

/*
 Regeln:
  - must do
  - etwas muss vorher gemacht werden
  - es fehlt ein sbs
*/

/* 1: create must-do-rules according to the informationen saved in data */
for (var course in data) {
	if (!data.hasOwnProperty(course)) continue;
	// if course must be done ..
	if(data[course].pflicht) {
	 	// .. add rule to rule manager
		ruleManager.rules.push(Object.create(mustDoRule).init(course));
	}
}

/*
var obj = {
	a: 1,
	b: "Stefan Bunk",
	c: function () {
		alert(this.b);
	}
};

var obj2 = Object.create(obj);
obj2.c();
obj2.b = "Tanja Bergmann";
obj2.c();
*/
