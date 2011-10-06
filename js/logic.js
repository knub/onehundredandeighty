/* use strict-mode provided by ecma-script5, see http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/ for details */
"use strict";

/*
 * Holds all relevant information from the study regulations 
 * 'Fachspezifische Ordnung für das Bachelor- und Masterstudium im Fach IT-Systems Engineering an der Universität Potsdam'
 * (variable names in german, because 'Vertiefungsgebiete' is hard to translate and not really nice)
 */
var studyRegulations = {
	module: ["Grundlagen IT-Systems Engineering", "Mathematische und theoretische Grundlagen", "Softwaretechnik und Modellierung", "Rechtliche und wirtschaftliche Grundlagen", "Softwarebasissysteme", "Vertiefungsgebiete", "Softskills"],
	vertiefungsgebiete: ["BPET", "HCT", "IST", "OSIS", "SAMT"],
	softwarebasissysteme: ['dbs1', 'hci1', 'grafik1', 'pois1', 'www']
};
var semesterManager = {
	semesters: ["WS10/11", "SS11", "WS11/12", "SS12", "WS12/13", "SS13", "WS13/14", "SS14", "WS14/15", "SS15", "WS15/16", "SS16"],
	shownSemesters: [
	/*
		"WS10/11",
		"SS11",
		"WS11/12",
		"SS12",
		"WS12/13",
		"SS13"
		*/
	],
	current: "SS11",
	lastSummerSemester: "SS11",
	lastWinterSemester: "WS10/11",
	startswith: "WS10/11"
	/* the semester that is the first semester when you first start the application */
	,
	updateSemester: function(semester_number, semester_string) {
		var index = semester_number - 1;
		if (semester_string.search(/[WS]S((\d{2}\/\d{2})|(\d{2}))/) < 0) {
			console.error("Mismatched semester string. Check data!");
			return;
		}

		var old_chosen = this.semesters.indexOf(this.shownSemesters[index]);
		var new_chosen = this.semesters.indexOf(semester_string);
		var difference = new_chosen - old_chosen;

		this.shownSemesters[index] = semester_string;

		for (var i = index + 1; i < this.shownSemesters.length; i += 1) {
			var old_index = this.semesters.indexOf(this.shownSemesters[i]);
			if (old_index + difference < this.semesters.length) this.shownSemesters[i] = this.semesters[old_index + difference];
			else this.shownSemesters[i] = this.semesters[this.semesters.length - 1];
		}
	}
};

var ruleManager = {
	getSemester: null,
	rules: [],
	init: function(getSemester_Function) {
		this.getSemester = getSemester_Function;
	},
	checkAll: function() {
		var numberFailedRules = 0;
		var rules = [];
		for (var rule = 0; rule < this.rules.length; rule += 1) {
			this.rules[rule].success = true;
			if (!this.rules[rule].check(this.getSemester)) {
				numberFailedRules += 1;
				this.rules[rule].success = false;
			}
			rules.push(this.rules[rule]);
		}
		rules.numberFailedRules = numberFailedRules;
		return rules;
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

/* 1. Semester-Rule: Check that the chosen semesters are valid. */
var semesterRule = {
	/* type */
	type: 'semesterRule',
	/* constructor */
	init: function(course) {
		return this;
	},
	/* check method */
	check: function(getSemester) {
		for (var i = 0; i < semesterManager.shownSemesters.length - 1; i += 1) {
			var earlier_index = semesterManager.semesters.indexOf(semesterManager.shownSemesters[i]);
			var later_index = semesterManager.semesters.indexOf(semesterManager.shownSemesters[i + 1]);
			if (earlier_index >= later_index) {
				this.message = "Das " + (i + 2).toString() + "te Semester kommt zeitlich nicht nach dem " + (i + 1).toString() + "ten.";
				return false;
			}
		}
		return true;
	},
	/* message */
	message: "Eine späteres Semester kommt vor einem früheren."
};
/* 2. Must-Do-Rule: a certain course must be done. */
var mustDoRule = {
	/* type */
	type: 'mustDoRule',
	/* constructor */
	init: function(course) {
		this.course = course;
		this.message = "Die Veranstaltung '" + data[this.course].nameLV + "' muss belegt werden.";

		return this;
	},
	/* check method */
	check: function(getSemester) {
		// if course is currently not selected for a certain semester, but put in courses-pool (indicated by -1), return false
		if (getSemester(this.course) === - 1) return false;
		return true;
	},
	/* message */
	message: "Eine Veranstaltung muss belegt werden.",
	/* needed to save for what course the current rule applies */
	course: ""
};
/* 3. Dependency-Rule: a certain course must be done before another */
var dependencyRule = {
	/* type */
	type: 'dependencyRule',
	/* constructor */
	init: function(course, dependency) {
		this.course = course;
		this.dependency = dependency;
		this.message = "Die Veranstaltung '" + data[this.dependency].nameLV + "' muss vor der Veranstaltung '" + data[this.course].nameLV + "' belegt werden.";

		return this;
	},
	/* check method */
	check: function(getSemester) {
		var courseSemester = getSemester(this.course);
		var dependencySemester = getSemester(this.dependency);
		// if course, which has a dependency is not selected, test passes automatically
		if (courseSemester === - 1) return true;
		// course is chosen, but dependency not
		else if (dependencySemester === - 1) return false;
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

/* 4. SBS-Rule: atleast three courses from 'Softwarebasisssysteme' must be done */
var sbsRule = {
	/* type */
	type: "sbsRule",
	/* constructor */
	init: function() {
		return this;
	},
	/* check method */
	check: function(getSemester) {
		var sbs = studyRegulations.softwarebasissysteme;
		var sbsNumber = 0;
		for (var i = 0; i < sbs.length; i += 1) {
			if (getSemester(sbs[i]) !== - 1) sbsNumber += 1;
		}
		return sbsNumber >= 3;
	},
	/* message */
	message: 'Es müssen mindestens drei Softwarebasissysteme belegt werden.'
};

/* 5. Softskills-Rule: atleast six credit points in  Softskills module must be done */
var softskillsRule = {
	/* type */
	type: "softskillsRule",
	/* constructor */
	init: function() {
		return this;
	},
	/* check method */
	check: function(getSemester) {
		var creditpoints = 0;
		for (var course in data) {
			if (!data.hasOwnProperty(course)) continue;
			if (data[course].modul.indexOf("Softskills") !== - 1 && course !== 'pem' && getSemester(course) !== - 1) {
				creditpoints += data[course].cp;
			}
		}
		return creditpoints >= 6;
	},
	/* message */
	message: 'Es müssen mindestens sechs Leistungspunkte im Softskills-Bereich erworben werden.'
};

/* 6. Time-Rule: course is not schedulable in the chosen semester */
var timeRule = {
	/* type */
	type: "timeRule",
	/* constructor */
	init: function(course) {
		this.course = course;
		this.message = "Die Veranstaltung '" + data[this.course].nameLV + "' wird im gewählten Semester nicht angeboten.";

		return this;
	},
	/* check method */
	check: function(getSemester) {
		// get the semester number (first, second, third ...) for the given course
		var semesterNumber = getSemester(this.course);
		this.message = "Die Veranstaltung '" + data[this.course].nameLV + "' wird im gewählten " + semesterNumber + ". Semester nicht angeboten.";

		if (semesterNumber === - 1) return true;
		// now get the semester time (WS10/11, SS10, ...) for the given course
		// important: subtract 1, because semester number starts at 1, while array starts at 0
		var semesterTime = semesterManager.shownSemesters[semesterNumber - 1];

		// now we have to distinguish two cases:
		// -	the semester is in the past/present
		// -	the semester is in the future
		if (semesterManager.semesters.indexOf(semesterTime) <= semesterManager.semesters.indexOf(semesterManager.current)) {
			// past or present
			return data[this.course].semester.indexOf(semesterTime) !== - 1;
		}
		else {
			// if the course is currently chosen for a summer semester
			if (semesterTime.indexOf("SS") >= 0) {
				// check if it was offered in the last summer semester
				return data[this.course].semester.indexOf(semesterManager.lastSummerSemester) !== - 1;
			}
			// if the course is currently chosen for a winter semester
			else if (semesterTime.indexOf("WS") >= 0) {
				// check if it was offered in the last summer semester
				return data[this.course].semester.indexOf(semesterManager.lastWinterSemester) !== - 1;
			}
			// else something went completly wrong
			else {
				console.error("Something is wrong with the semester-time. Check data!");
			}
			return true;
		}
	},
	/* message */
	message: 'Der Kurs wird im gewählten Semester nicht angeboten.',
	course: ""
};

/* 7. Vertiefungsgebiete-Rule: take care of complex Vertiefungsgebiete rules */
var vertiefungsgebieteRule = {
	/* type */
	type: "vertiefungsgebieteRule",
	/* constructor */
	init: function() {
		return this;
	},
	/* check method */
	check: function(getSemester) {
		this.vertiefungen = null;
		this.combinations = null;
		/*
		 * At first, define some helper functions, which will help writing the actual algorithm:
		 * -	getSBSNumber: Returns the number of Softwarebasissysteme currently chosen.
		 * -	getCurrentlyChosenVertiefungen: Returns an array of Vertiefungen, which are currently chosen.
		 */
		// At first, check how many Softwarebasissysteme there are. If there are more than three, one of them will be counted to Vertiefungsgebiete.
		var getSBSCourses = function() {
			var sbs = studyRegulations.softwarebasissysteme;
			var sbsCourses = [];
			for (var i = 0; i < sbs.length; i += 1) {
				if (getSemester(sbs[i]) !== - 1) sbsCourses.push(sbs[i]);
			}
			return sbsCourses;
		}
		var getCurrentlyChosenVertiefungen = function() {
			var chosenVertiefungen = [];
			for (var course in data) {
				if (!data.hasOwnProperty(course)) continue;
				if (data[course].modul.indexOf("Vertiefungsgebiete") !== - 1 && data[course].modul.indexOf("Softwarebasissysteme") === - 1 && getSemester(course) >= 1) {
					chosenVertiefungen.push(course);
				}
			}
			return chosenVertiefungen;
		}
		/*
		 * This function returns an array with all possible Vertiefungsgebiete interpretations one Vertiefung can have.
		 * for example, if
		 * chosenVertiefungen = [
		 *	'hci2',		// which can be HCT or SAMT
		 *	'pois2'		// which can be BPET or SAMT
		 * ]
		 * this function returns:
		 * [
		 * 	[
		 *		{ key: 'hci2', vertiefung: 'HCT' },
		 *		{ key: 'hci2', vertiefung: 'SAMT' }
		 *	],
		 * 	[
		 *		{ key: 'pois2', vertiefung: 'BPET' },
		 *		{ key: 'pois2', vertiefung: 'SAMT' }
		 *	]
		 * ]
		 */
		var getChosenVertiefungsgebiete = function(chosenVertiefungen) {
			var chosenVertiefungsgebiete = [];
			for (var i = 0; i < chosenVertiefungen.length; i += 1) {
				var key = chosenVertiefungen[i];
				var course = data[key];
				var currentCourse = [];
				for (var j = 0; j < course.vertiefung.length; j += 1) {
					currentCourse.push({
						'key': key,
						'vertiefung': course.vertiefung[j]
					});
				}
				chosenVertiefungsgebiete.push(currentCourse);
			}
			return chosenVertiefungsgebiete;
		}
		var sbsCourses = getSBSCourses();
		var sbsNumber = sbsCourses.length;
		if (sbsNumber === 5) {
			alert("Du hast fünf Softwarebasissysteme gewählt. 180 kann dies aktuell nicht behandeln.");
		}

		// At first, find all Vertiefung courses, which are currently chosen for a semester.
		var chosenVertiefungen = getCurrentlyChosenVertiefungen();
		// Then make it an array with all possible Vertiefungsgebiete (see getChosenVertiefungsgebiete definition for details)
		var chosenVertiefungsgebiete = getChosenVertiefungsgebiete(chosenVertiefungen);
		// if there are four Softwarebasissysteme, one of them must be treated like a Vertiefungsgebiet
		if (sbsNumber === 4) {
			// so we add all of them to chosenVertiefungsgebiete
			// NOTE: we assume that every Softwarebasissystem has only one Vertiefungsgebiet (which is right for current study regulations).
			var addSBS = [];
			for (var i = 0; i < sbsCourses.length; i += 1) {
				addSBS.push({
					'key': sbsCourses[i],
					'vertiefung': data[sbsCourses[i]].vertiefung[0]
				});
			}
			// add at the beginning
			chosenVertiefungsgebiete.unshift(addSBS);
		}

		// Normally, cartesianProduct expects a list of Arrays to be given, so it is usually called like:
		// Array.cartesianProduct([1, 2, 3], ['a', 'b', 'c'], [true, false]).
		// As we have an array, which contains all parameters, we have to use cartesianProduct.apply
		// So now we calculate all possibilites how the current plan could be interpreted.
		// This gives us an array, which says: One possibility is to interpret 'hci2' as 'HCT' and 'pois2' as 'BPET'.
		// Another is to interpret 'hci2' as 'HCT' and 'pois2' as 'SAMT'
		// Another is to interpret 'hci2' as 'SAMT' ... and so on.
		// Of course this normally happens with more courses than two.
		var possibleCombinations = Array.cartesianProduct.apply(undefined, chosenVertiefungsgebiete);

		// Now we all possible interpretations of the current plan.
		// Now make a first, vague check for all interpretations:
		// Check if all Vertiefungsgebiete summed up make more than 24 creditpoints.
		// Filter those, which do not make 24 creditpoints.
		var have24CreditPoints = possibleCombinations.filter(function(element) {
			var creditpoints = 0;
			element.forEach(function(element) {
				creditpoints += data[element.key].cp;
			});
			return creditpoints >= 24;
		});

		// If no courses are left, the plan is obviously not valid.
		if (have24CreditPoints.length === 0) {
			// Adjust message and let rule fail.
			this.message = "Es müssen mindestens Vertiefungen im Umfang von 24 Leistungspunkten belegt werden.";
			this.vertiefungen = chosenVertiefungen;
			this.vertiefungen.sbsCourses = sbsCourses;
			return false;
		}

		// Another check, this time its quite precise:
		// Filter out those, which do not met the following criteria:
		// Quoting from paper:
		// "In VT1 und VT2 sind jeweils mindestens 9 LP zu erbringen. In VT1 und VT2 müssen mindestens je eine Vorlesung im Umfang von 6 LP erbracht werden (not checked in this rule). Weiter müssen ergänzende Lehrveranstaltungen im Umfang von 12 LP absolviert werden, die sich auf beide Vertiefungsgebiete in den möglichen Kombinationen 3+9 LP, 6+6 LP oder 9+3 LP verteilen.
		var haveTwoVertiefungsgebiete = have24CreditPoints.filter(function(combination) {
			// Count creditpoints for each Vertiefung
			// This will be done in creditPointsPerVertiefung.
			// The indices are determined by studyRegulations.vertiefungsgebiete, so 'BPET' is counted at index 0, 'HCT' at index 1 and so on
			var creditPointsPerVertiefung = [0, 0, 0, 0, 0];
			combination.forEach(function(element) {
				// calculate index as described above
				var index = studyRegulations.vertiefungsgebiete.indexOf(element.vertiefung);
				creditPointsPerVertiefung[index] += data[element.key].cp;
			});
			// Now we have counted all creditpoints.
			// Now test all possible pairs if they met the given criteria.
			// Found pairs are pushed to combination.possibleVertiefungen:
			combination.possibleVertiefungen = [];
			for (var i = 0; i < creditPointsPerVertiefung.length; i += 1) {
				for (var j = 0; j < creditPointsPerVertiefung.length; j += 1) {
					// i < j because we want each pair only once
					if (i < j && creditPointsPerVertiefung[i] >= 9 && creditPointsPerVertiefung[j] >= 9 && creditPointsPerVertiefung[i] + creditPointsPerVertiefung[j] >= 24) {

						var newPossibleVertiefung = [studyRegulations.vertiefungsgebiete[i], studyRegulations.vertiefungsgebiete[j]];
						combination.possibleVertiefungen.push(newPossibleVertiefung);
					}
				}
			}
			// Filter this out, if no possible pairs were found.
			return combination.possibleVertiefungen.length > 0;
		});

		// Same procedure as above.
		if (haveTwoVertiefungsgebiete.length === 0) {
			this.message = "Es müssen mindestens zwei unterschiedliche Vertiefungsgebiete mit jeweils mindestens 9 Leistungspunkten belegt werden, die zusammen 24 Leistungspunkte ergeben.";
			this.vertiefungen = chosenVertiefungen;
			this.vertiefungen.sbsCourses = sbsCourses;
			return false;
		}

		// So now we have to do a lot of cleanup.
		// At first we isolate the possibleVertiefungen which are currently saved as properties to different arrays to one clean array.
		// And we remove those courses which are not neccessary for the chosen Vertiefungen
		// So when we have ['BPET', 'HCT'] as Vertiefungen, courses which belong to the other three Vertiefungen are removed.
		var cleanedCombinations = [];
		// For all combinations ..
		haveTwoVertiefungsgebiete.forEach(function(combination, index) {
			var possible = combination.possibleVertiefungen;
			// For each combination, there are possibleVertiefungen
			// Walk through all these
			possible.forEach(function(possibleVertiefung) {
				var cleaned = [];
				// Walk through all courses ..
				combination.forEach(function(course) {
					// add only those, which are important for the current Vertiefungsgebiet
					if (possibleVertiefung.indexOf(course.vertiefung) >= 0) cleaned.push(course);
				});
				// save Vertiefung Pair
				cleaned.vertiefungPair = possibleVertiefung;
				cleanedCombinations.push(cleaned);
			});
		});
		// write changes back to haveTwoVertiefungsgebiete
		haveTwoVertiefungsgebiete = cleanedCombinations;

		// now that we cleaned up, there are still a lot of doubled Vertiefung pairs
		// lets clean that up a little bit, start with a clean empty array
		var mergedCombinations = [];
		haveTwoVertiefungsgebiete.forEach(function(combination, index) {
			// Make a string of Vertiefung pair. Will be used to identifiy same Vertiefung pairs
			var vertiefungsstring = combination.vertiefungPair.join("");

			// will save, whether a special combination of Vertiefungen (a Vertiefung pair) is already pushed to the array.
			var alreadyIn = false;

			var unique = true;
			// Walk through all combinations and then decide, whether to save it in the array.
			mergedCombinations.forEach(function(combinationOld, helpindex) {
				// if the Vertiefung pair is already in the array ..
				if (combinationOld.vertiefungPair.join("") === vertiefungsstring) {
					// decide whether it is worthy to override the old value
					alreadyIn = true;
					// it IS worthy, when it is longer than the old value and is a superset of it
					if (combinationOld.length < combination.length && combinationOld.subsetOf(combination)) {
						mergedCombinations[helpindex] = combination;
						unique = false;
					}
					else {
						if (combination.subsetOf(combinationOld) === true) unique = false;
					}
				}
			});
			// if this combination has not already been pushed to the array, push it now.
			if (!alreadyIn) mergedCombinations.push(combination);
			else if (unique) mergedCombinations.push(combination);

		});

		// write changes back to haveTwoVertiefungsgebiete
		haveTwoVertiefungsgebiete = mergedCombinations;

		//
		// DEBUG: Alert remaining combinations with all relevant information.
		//
		/*
		for (var combination in haveTwoVertiefungsgebiete) {
			if (!haveTwoVertiefungsgebiete.hasOwnProperty(combination)) continue;
			var comb = haveTwoVertiefungsgebiete[combination];
			var string = "";
			for (var i = 0; i < comb.length; i += 1) {
				if (comb[i] === undefined) continue;
				var course = data[comb[i].key];
				string += course.nameLV + "___" + course.cp + "___" + comb[i].vertiefung + "\n";
			}
			alert(string);
		}
		*/

		// And finally, check the last rule: whether a Lecture is enroled for the given Vertiefung
		var haveLecture = haveTwoVertiefungsgebiete.filter(function(combination) {
			// Following variables will save, whether there is a lecture for the first/second Vertiefung
			var firstVertiefungLectures = [];
			var secondVertiefungLectures = [];
			combination.forEach(function(course) {
				// check if there is a lecture for the first Vertiefung
				if (course.vertiefung === combination.vertiefungPair[0] && data[course.key].lehrform.indexOf("Vorlesung") >= 0) {
					firstVertiefungLectures.push(data[course.key]);
				}
				// accordingly ..
				if (course.vertiefung === combination.vertiefungPair[1] && data[course.key].lehrform.indexOf("Vorlesung") >= 0) {
					secondVertiefungLectures.push(data[course.key]);
				}
			});
			combination.firstVertiefungLectures = firstVertiefungLectures;
			combination.secondVertiefungLectures = secondVertiefungLectures;
			// Both Vertiefungen must have a lecture to succeed.
			return firstVertiefungLectures.length > 0 && secondVertiefungLectures.length > 0;
		});

		// Same procedure as above.
		if (haveLecture.length === 0) {
			this.message = "In jedem Vertiefungsgebiet muss mindestens eine Vorlesung belegt werden.";
			this.combinations = haveTwoVertiefungsgebiete;
			return false;
		}

		// save information about all correct combinations in combinations, so frontend has access to this information
		this.combinations = haveLecture;

		// If you came so far, you are worthy to return with true :)
		return true;
	},
	/* message */
	message: 'Die Vertiefungsgebiete wurden nicht im notwendigen Gesamtumfang absolviert.',
	/* extra information */
	vertiefungen: null,
	/* extra information */
	combinations: null
};
/* 8. Clone-Rule: take care of clones (repetitions) of a specific course */
var cloneRule = {
	/* type */
	type: "cloneRule",
	/* constructor */
	init: function(cloneId) {
		this.cloneId = cloneId;
		var index = cloneId.indexOf("-");
		this.course = cloneId.substr(0, index);

		this.message = "Die Veranstaltung '" + data[this.course].nameLV + "' wird im gewählten Semester nicht angeboten.";

		return this;
	},
	/* check method */
	check: function(getSemester) {
		// get the semester number (first, second, third ...) for the given course
		var semesterNumber = getSemester(this.cloneId);
		if (semesterNumber <= getSemester(this.course)) {
			this.message = "Die Wiederholung von '" + data[this.course].nameLV + "' muss nach dem ersten Belegen der Veranstaltung geschehen.";
			return false;
		}
		this.message = "Die Veranstaltung '" + data[this.course].nameLV + "' wird im gewählten " + semesterNumber + ". Semester nicht angeboten.";

		if (semesterNumber === - 1) return true;
		// now get the semester time (WS10/11, SS10, ...) for the given course
		// important: subtract 1, because semester number starts at 1, while array starts at 0
		var semesterTime = semesterManager.shownSemesters[semesterNumber - 1];

		// now we have to distinguish two cases:
		// -	the semester is in the past/present
		// -	the semester is in the future
		if (semesterManager.semesters.indexOf(semesterTime) <= semesterManager.semesters.indexOf(semesterManager.current)) {
			// past or present
			return data[this.course].semester.indexOf(semesterTime) !== - 1;
		}
		else {
			// if the course is currently chosen for a summer semester
			if (semesterTime.indexOf("SS") >= 0) {
				// check if it was offered in the last summer semester
				return data[this.course].semester.indexOf(semesterManager.lastSummerSemester) !== - 1;
			}
			// if the course is currently chosen for a winter semester
			else if (semesterTime.indexOf("WS") >= 0) {
				// check if it was offered in the last summer semester
				return data[this.course].semester.indexOf(semesterManager.lastWinterSemester) !== - 1;
			}
			// else something went completly wrong
			else {
				console.error("Something is wrong with the semester-time. Check data!");
			}
			return true;
		}
	},
	/* message */
	message: 'Der Kurs wird im gewählten Semester nicht angeboten.',
	course: "",
	cloneId: ""
};

// ---
// Rules created, now started adding them to rule manager
// ---
/* 1: create semester rule, just push it to rules array */
ruleManager.rules.push(semesterRule);

/* now walk through the array and add data-dependent rules */
for (var course in data) {
	if (!data.hasOwnProperty(course)) continue;
	/* 2: create must-do-rules according to the information saved in data */
	// if course must be done ..
	if (data[course].pflicht) {
		// .. add rule to rule manager
		ruleManager.rules.push(Object.create(mustDoRule).init(course));
	}

	/* 3: create dependency-rules according to the information saved in data */
	// if there are dependencies ..
	if (data[course].vorher.length !== 0) {
		// .. loop through all dependencies and ..
		for (var i = 0; i < data[course].vorher.length; i++) {
			// .. add rule to rule manager
			ruleManager.rules.push(Object.create(dependencyRule).init(course, data[course].vorher[i]));
		}
	}

	/* 6: create time-rules for all courses saved in data */
	ruleManager.rules.push(Object.create(timeRule).init(course));
}
/* 4: create sbs-rule, just push it to rules-array */
ruleManager.rules.push(sbsRule);

/* 5: create softskills-rule, just push it to rules-array */
ruleManager.rules.push(softskillsRule);

/* 7: create vertiefungsgebiete-rule, just push it to rules-array */
ruleManager.rules.push(vertiefungsgebieteRule);
