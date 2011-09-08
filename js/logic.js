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
	],
	softwarebasissysteme: [
		'dbs1',
		'hci1',
		'grafik1',
		'pois1',
		'www'
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
	current: "SS11",
	lastSummerSemester: "SS11",
	lastWinterSemester: "WS10/11",
	startswith: "WS10/11"	/* the semester that is the first semester when you first start the application */
};



var ruleManager = {
	getSemester: null,
	rules: [],
	init: function (getSemester_Function) {
		this.getSemester = getSemester_Function;
	},
	checkAll: function () {
		var failedRules = [];
		for (var rule = 0; rule < this.rules.length; rule += 1) {
			if (!this.rules[rule].check(this.getSemester)) {
				failedRules.push(this.rules[rule]);
			}
		}
		return failedRules;
	}
};

/*
 * Rule-objectes, each representing one special type of rule
 * These objects basically act as classes (will be 'cloned' by Object.create later
 * It's a kind of 'inheritance by convention', meaning:
 *	- each rule has a type, by which it can be identified
 * 	- each rule must have a check method, which - given a special course to check - passes or fails
 *	- each rule must have a message property, which will be displayed, if the rule/test fails
 *	- there is one init-method, serving as constructor, which takes neccessary parameters and saves them, finally returning 'this'
 *
 * Furthermore, most objects have some special properties needed for that special kind of rule
 */

/* 1. Must-Do-Rule: a certain course must be done. */
var mustDoRule = {
	/* type */
	type: 'mustDoRule',
	/* constructor */
	init: function (course) {
		this.course = course;
		this.message = "Die Veranstaltung '" + data[this.course].nameLV + "' muss belegt werden.";

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
	message: "Eine Veranstaltung muss belegt werden.",
	/* needed to save for what course the current rule applies */
	course: ""
};
/* 2. Dependency-Rule: a certain course must be done before another */
var dependencyRule = {
	/* type */
	type: 'dependencyRule',
	/* constructor */
	init: function (course, dependency) {
		this.course= course;
		this.dependency = dependency;
		this.message = "Die Veranstaltung '" + data[this.dependency].nameLV + "' muss vor der Veranstaltung '" + data[this.course].nameLV + "' belegt werden.";

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
	message: "Eine Veranstaltung muss vor einer anderen belegt werden.",
	/* save which course must be done before which */
	dependency: "",
	course: ""
};

// TODO: merge todos for more efficient solution

/* 3. SBS-Rule: atleast three courses from 'Softwarebasisssysteme' must be done */
var sbsRule = {
	/* type */
	type: "sbsRule",
	/* constructor */
	init: function() {
		return this;
	},
	/* check method */
	check: function (getSemester) {
		var sbs = studyRegulations.softwarebasissysteme;
		var sbsNumber = 0;
		for (var i = 0; i < sbs.length; i += 1) {
			if (getSemester(sbs[i]) !== -1)
				sbsNumber += 1;
		}
		return sbsNumber >= 3;
	},
	/* message */
	message: 'Es müssen mindestens drei Softwarebasissysteme belegt werden.'
};

/* 4. Softskills-Rule: atleast six credit points in  Softskills module must be done */
var softskillsRule = {
	/* type */
	type: "softskillsRule",
	/* constructor */
	init: function() {
		return this;
	},
	/* check method */
	check: function (getSemester) {
		var creditpoints = 0;
		for (var course in data) {
			if (!data.hasOwnProperty(course)) continue;
			if (data[course].modul.indexOf("Softskills") !== -1 && course !== 'pem' && getSemester(course) !== -1) {
				creditpoints += data[course].cp;
			}
		}
		return creditpoints >= 6;
	},
	/* message */
	message: 'Es müssen mindestens sechs Leistungspunkte im Softskills-Bereich erworben werden.'
};

/* 5. Time-Rule: course is not schedulable in the chosen semester */
var timeRule = {
	/* type */
	type: "timeRule",
	/* constructor */
	init: function (course) {
		this.course = course;
		this.message = "Die Veranstaltung '" + data[this.course].nameLV + "' wird im gewählten Semester nicht angeboten.";

		return this;
	},
	/* check method */
	check: function (getSemester) {
		// get the semester number (first, second, third ...) for the given course
		var semesterNumber = getSemester(this.course);
		if (semesterNumber === -1)
			return true;
		// now get the semester time (WS10/11, SS10, ...) for the given course
		// important: subtract 1, because semester number starts at 1, while array starts at 0
		var semesterTime = semesterManager.shownSemesters[semesterNumber - 1];

		// now we have to distinguish two cases:
		// -	the semester is in the past/present
		// -	the semester is in the future
		if (semesterManager.semesters.indexOf(semesterTime) <= semesterManager.semesters.indexOf(semesterManager.current)) {
			// past or present
			return data[this.course].semester.indexOf(semesterTime) !== -1;
		}
		else {
			// if the course is currently chosen for a summer semester
			if (semesterTime.indexOf("SS") >= 0) {
				// check if it was offered in the last summer semester
				return data[this.course].semester.indexOf(semesterManager.lastSummerSemester) !== -1;
			}
			// if the course is currently chosen for a winter semester
			else if (semesterTime.indexOf("WS") >= 0) {
				// check if it was offered in the last summer semester
				return data[this.course].semester.indexOf(semesterManager.lastWinterSemester) !== -1;
			}
			// else something went completly wrong
			else {
				alert("Something is wrong with the semester-time (js/logic.js 5th rule)!");
			}
			return true;
		}
	},
	/* message */
	message: 'Der Kurs wird im gewählten Semester nicht angeboten.',
	course: ""
};

/* 6. Vertiefungsgebiete-Rule: take care of complex Vertiefungsgebiete rules */
var vertiefungsgebieteRule = {
	/* type */
	type: "vertiefungsgebieteRule",
	/* constructor */
	init: function() {
		return this;
	},
	/* check method */
	check: function (getSemester) {
		// at first, check how many Softwarebasissysteme there are. If there are more than three, one of them will be counted to Vertiefungsgebiete
		var sbs = studyRegulations.softwarebasissysteme;
		var sbsNumber = 0;
		for (var i = 0; i < sbs.length; i += 1) {
			if (getSemester(sbs[i]) !== -1)
				sbsNumber += 1;
		}

		if (sbsNumber <= 3) {
			/* THIS IMPLEMENTATION IS WRONG, MUST BE THOUGHT OVER AGAIN */
			var chosenVertiefungen = [];
			for (var course in data) {
				if (!data.hasOwnProperty(course)) continue;
				if (data[course].modul.indexOf("Vertiefungsgebiete") !== -1 && data[course].modul.indexOf("Softwarebasissysteme") === -1 && getSemester(course) >= 1) {
					chosenVertiefungen.push(data[course]);
				}
			}
			var chosenVertiefungsgebiete = [];
			var possibleCombinationsNumber = 1;
			for (var i = 0; i < chosenVertiefungen.length; i += 1) {
				chosenVertiefungsgebiete.push(chosenVertiefungen[i].vertiefung);
				possibleCombinationsNumber *= chosenVertiefungen[i].vertiefung.length;
			}

			var possibleCombinations = [];
			for (var i = 0; i < possibleCombinationsNumber; i += 1) {
				var combination = [];
				for (var j = 0; j < chosenVertiefungen.length; j += 1) {
					combination.push(chosenVertiefungen[j].vertiefung[i % chosenVertiefungen[j].vertiefung.length]);
				}
				possibleCombinations.push(combination);
			}
			for (var i in possibleCombinations) {
				if (!possibleCombinations.hasOwnProperty(i)) continue;
				//alert(possibleCombinations[i]);
			}
			return true;
		} else {
			alert("sbs number is higher than three. this currently cant be managed by 180");
		}
	},
	/* message */
	message: 'Die Vertiefungsgebiete wurden nicht im notwendigen Gesamtumfang absolviert.'
};

// ---
// Rules created, now started adding them to rule manager
// ---

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
/* 3: create sbs-rule, just push it to rules-array */
//ruleManager.rules.push(sbsRule);

/* 4: create softskills-rule, just push it to rules-array */
//ruleManager.rules.push(softskillsRule);

/* 5: create time-rules for all courses saved in data */
for (var course in data) {
	if (!data.hasOwnProperty(course)) continue;
	ruleManager.rules.push(Object.create(timeRule).init(course));
}

/* 6: create vertiefungsgebiete-rule, just push it to rules-array */
ruleManager.rules.push(vertiefungsgebieteRule);
