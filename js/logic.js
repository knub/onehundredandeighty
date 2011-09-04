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
 Regeln:
  - must do
  - etwas muss vorher gemacht werden
  - es fehlt ein sbs
*/
var mustDoRule = {
	course: "",
	message: "Das Fach muss belegt werden.",
	check: function (getSemester) {
		this.message = "Das Fach '" + data[this.course].nameLV + "' muss belegt werden.";
		if (getSemester(this.course) === -1)
			return false;
		return true;
	}
};

// TODO: Hübscher machen, nicht zwei Anweisungen nötig. Init irgendwas.
var pt1MustDoRule = Object.create(mustDoRule); pt1MustDoRule.course = "pt1";

ruleManager.rules.push(pt1MustDoRule);
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
