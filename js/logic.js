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
/* 2. Dependency-Rule: a certain course must be done before another */
var dependencyRule = {
	/* constructor */
	init: function (course, dependency) {
		this.course= course;
		this.dependency = dependency;
		this.message = "Das Fach '" + data[this.dependency].nameLV + "' muss vor dem Fach '" + data[this.course].nameLV + "' belegt werden.";

		return this;
	},
	/* check method */
	check: function (getSemester) {
		var courseSemester = getSemester(this.course);
		var dependencySemester = getSemester(this.dependency);
		// if course, which has a dependency is not selected, test passes automatically
		if (courseSemester === -1)
			return true;
		// course is chosen, but dependency not
		else if (dependencySemester === -1)
			return false;
		// both are chosen, now check for semesters
		else {
			// check whether course was chosen before its dependency
			return courseSemester > dependencySemester;
		}
	},
	/* message */
	message: "Ein Fach muss vor einem anderen belegt werden.",
	/* save which course must be done before which */
	dependency: "",
	course: ""
};

/*
 Regeln:
  - must do
  - etwas muss vorher gemacht werden
  - es fehlt ein sbs
*/

// TODO: merge todos for more efficient solution

/* 1: create must-do-rules according to the information saved in data */
for (var course in data) {
	if (!data.hasOwnProperty(course)) continue;
	// if course must be done ..
	if(data[course].pflicht) {
	 	// .. add rule to rule manager
		ruleManager.rules.push(Object.create(mustDoRule).init(course));
	}
}
/* 2: create dependency-rules according to the information saved in data */
for (var course in data) {
	if (!data.hasOwnProperty(course)) continue;
	// if there are dependencies ..
	if(data[course].vorher.length !== 0) {
		// .. loop through all dependencies and ..
		for (var i = 0; i < data[course].vorher.length; i++) {
			// .. add rule to rule manager
			ruleManager.rules.push(Object.create(dependencyRule).init(course, data[course].vorher[i]));
		}
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
