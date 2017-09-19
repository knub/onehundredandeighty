/* use strict-mode provided by ecma-script5, see http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/ for details */
"use strict";

// Both Studienordnungen
// https://hpi.de/fileadmin/user_upload/hpi/navigation/80_intern/05_studium/studien_pruefungsordnung_2010_01.pdf
// https://hpi.de/fileadmin/user_upload/hpi/navigation/80_intern/05_studium/StudOrd_Bachelor_2016.pdf




/**
 * keeps track, which table column (called semester number)
 * represents which actual semester (WSdd/dd or SSdd)
 */
var semesterManager = {
    /**
     * all semesters to choose from
     */
    semesters: [
        "WS13/14", "SS14",
        "WS14/15", "SS15",
        "WS15/16", "SS16",
        "WS16/17", "SS17",
        "WS17/18", "SS18",
        "WS18/19", "SS19",
        "WS19/20", "SS20"
    ],

    /**
     * which semesters are currently displayed
     */
    shownSemesters: [
        "WS15/16", "SS16",
        "WS16/17", "SS17",
        "WS17/18", "SS18"
    ],
    numberDisplayed: 6,
    semesterLock: [false, false, false, false, false, false],
    // current must be either lastSummerSemester or lastWinterSemester!
    currentSemester: "WS17/18",
    lastSummerSemester: "SS17",
    lastWinterSemester: "WS17/18",
    /* the semester that is the first semester when you first start the application */
    startswith: "WS15/16",

    /** true, if the semester with given name lies in the future */
    isFutureSemester: function(semesterName) {
        return this.semesters.indexOf(semesterName) > this.semesters.indexOf(this.currentSemester)
    },
    /** returns a semester name not from the future, with same type (WS/SS) */
    referenceSemesterFor: function(semesterName) {
        if (semesterName.startsWith("SS")) {
            return this.lastSummerSemester
        } else if (semesterName.startsWith("WS")) {
            return this.lastWinterSemester
        }
    },
    /**
     * invert the lock state for a semester
     * @param semesterNumber the semester to alter
     * @returns {boolean} - the new lock status
     */
    flipSemesterLock: function(semesterNumber) {
        while (this.semesterLock.length < semesterNumber) {
            this.semesterLock.push(false);
        }
        var newValue = !this.semesterLock[semesterNumber - 1];
        this.semesterLock[semesterNumber - 1] = newValue;
        return newValue;
    },

    /**
     * called whenever the user changes a semester in a dropDown
     * @param semester_number which semester got changed
     * @param semester_string to what it got changed
     */
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

        for (var i = index + 1; i < this.shownSemesters.length; i++) {
            var old_index = this.semesters.indexOf(this.shownSemesters[i]);
            if (old_index + difference < this.semesters.length)
                this.shownSemesters[i] = this.semesters[old_index + difference];
            else
                this.shownSemesters[i] = this.semesters.last();
        }
    }
};

/**
 * keeps track of all the rules that need to be fulfilled
 * for a "Belegung" to be valid
 */
var ruleManager = {
    getSemester: null,
    rules: [],
    init: function(getSemester_Function) {
        this.getSemester = getSemester_Function;
    },

    /**
     * test all rules, and update their success property
     * @returns all the rules as Array, including a numberFailedRules - property
     */
    checkAll: function() {
        var failingRules = [];
        for (var r = 0; r < this.rules.length; r++) {
            var rule = this.rules[r];
            var errors = rule(this.getSemester);
            if (errors.length !== 0) {
                failingRules = failingRules.concat(errors);
            }
        }
        return failingRules;
    }
};

/**
 * this Manager keeps track on which decisions regarding the Belegung were decided how.
 * Which Vertiefungsgebiete have I selected? How is everything weighted? ...
 */
var wahlpflichtManager = {
    // vertiefungsgebiete combinations that are currently valid
    possibleCombinations: []
};

/**
 * Rule-objectes, each representing one special type of rule
 * These objects basically act as classes (will be 'cloned' by Object.create later
 * It's a kind of 'inheritance by convention', meaning:
 *    - each rule has a type, by which it can be identified
 *     - each rule must have a check method, which - given a special course to check - passes or fails
 *    - each rule must have a message property, which will be displayed, if the rule/test fails
 *    - there is one init-method, serving as constructor, which takes neccessary parameters and saves them, finally returning 'this'
 *    - some rules assign special information to variables, which can be used in the frontend to e. g. display already chosen Vertiefungen
 *
 * Furthermore, most objects have some special properties needed for that special kind of rule
 */

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
        if (semesterNumber === -1)
            return true;
        if (semesterNumber <= getSemester(this.course) || getSemester(this.course) === -1) {
            this.message = "Die Wiederholung von '" + data[this.course].nameLV + "' muss nach dem ersten Belegen der Veranstaltung geschehen.";
            return false;
        }
        this.message = "Die Veranstaltung '" + data[this.course].nameLV + "' wird im gewählten " + semesterNumber + ". Semester nicht angeboten.";

        if (semesterNumber === - 1) return true;
        // now get the semester time (WS10/11, SS10, ...) for the given course
        // important: subtract 1, because semester number starts at 1, while array starts at 0
        var semesterTime = semesterManager.shownSemesters[semesterNumber - 1];

        // now we have to distinguish two cases:
        // -    the semester is in the past/present
        // -    the semester is in the future
        if (semesterManager.semesters.indexOf(semesterTime) <= semesterManager.semesters.indexOf(semesterManager.currentSemester)) {
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


//helper methods
function courseList() {
    var list = [];
    for (var course in data) {
        if (!data.hasOwnProperty(course)) continue;
        list.push(course)
    }
    return list;
}
function allBelegteCourses(getSemester) {
    return courseList().filter(function(id) {
        return getSemester(id) !== -1
    });
}
function isModul(type) {
    return function(id) {
        return data[id].modul.includes(type);
    }
}
function not(f) {
    return function() {
        return !f.apply(null, arguments);
    }
}
function courseToCP(id) {
    return data[id].cp;
}



// new rules
// each rule returns a list of error objects
//   message: str, type: str
// "empty returned list" <==> "rule fulfilled"

ruleManager.rules.push(function timeRule(getSemester) {
    function hasTimeProblem(id) {
        var semesterName = semesterManager.shownSemesters[getSemester(id) - 1];
        var semesters = data[id].semester;
        if (semesters.includes(semesterName)) {
            return false
        }
        if (semesterManager.isFutureSemester(semesterName) &&
            semesters.includes(semesterManager.referenceSemesterFor(semesterName))) {
            return false
        }
        return true
    }
    function createErrorMessage(id) {
        return {
            type: "timeRule",
            message: "Die Veranstaltung '" + data[id].nameLV + "' wird im gewählten " + getSemester(id) + ". Semester nicht angeboten."
        };
    }

    return allBelegteCourses(getSemester)
        .filter(hasTimeProblem)
        .map(createErrorMessage)
});

ruleManager.rules.push(function mustDoRule(getSemester) {
    function mustDoCourse(id) {
        return data[id].pflicht;
    }
    function courseNotBelegt(id) {
        return getSemester(id) === -1
    }
    function createErrorMessage(id) {
        return {
            type: "mustDoRule",
            message: "Die Veranstaltung '" + data[id].nameLV + "' muss belegt werden."
        };
    }


   return courseList()
       .filter(mustDoCourse)
       .filter(courseNotBelegt)
       .map(createErrorMessage)
});

ruleManager.rules.push(function SBSRule(getSemester) {
    if (allBelegteCourses(getSemester)
            .filter(isModul("Softwarebasissysteme")).length < 4) {
        return [{
            type: "sbsRule",
            message: "Es müssen mindestens drei Softwarebasissysteme neben BS belegt werden."
        }]
    }
    return []
});

ruleManager.rules.push(function semesterOrderRule(_) {
    var errors = [];
    for (var i = 0; i < semesterManager.shownSemesters.length - 1; i += 1) {
        var earlier_index = semesterManager.semesters.indexOf(semesterManager.shownSemesters[i]);
        var   later_index = semesterManager.semesters.indexOf(semesterManager.shownSemesters[i + 1]);
        if (earlier_index >= later_index) {
            errors.push({
                type: "semesterRule",
                message: "Das " + (i + 2).toString() + "te Semester kommt zeitlich nicht nach dem " + (i + 1).toString() + "ten."
            });
        }
    }
    return errors;
});

ruleManager.rules.push(function softskillsRule(getSemester) {

    var totalCP = allBelegteCourses(getSemester)
        .filter(isModul("Softskills"))
        .map(courseToCP)
        .sumElements();

    if (totalCP < 6) {
        return [{
            type: "softskillsRule",
            message: "Es müssen mindestens sechs Leistungspunkte im Softskills-Bereich erworben werden."
        }]
    }

    return [];
});

ruleManager.rules.push(function vertiefungsgebieteRule(getSemester) {
    function returnValue(data, errorMessage) {
        wahlpflichtManager.possibleCombinations = data;
        if (errorMessage === undefined) {
            return [];
        }
        return [{
            type: "vertiefungsgebieteRule",
            message: errorMessage
        }]
    }

    var currentlyBelegteVertiefungen = allBelegteCourses(getSemester)
        .filter(isModul("Vertiefungsgebiete"));

    /*
     * Here, each Vertiefungsgebiet gets mapped to all their interpretation options.
     * So, 'pois' (which can be BPET or SAMT, and is an SBS) gets converted to:
     * [
     *    { key: 'hci2', vertiefung: 'BPET' },
     *    { key: 'hci2', vertiefung: 'SAMT' },
     *    { key: 'hci2', vertiefung: 'SBS' }
     * ]
     *
     * NOTE:
     * SBS is treated equally to HCGT, OSIS, ...
     * eventually, only those options with exactly 3 SBS are used further
     */
    var vertiefungenWithOptions = currentlyBelegteVertiefungen.map(function(course) {
        var vertiefungen = data[course].vertiefung.slice(0);
        if (isModul("Softwarebasissysteme")(course)) {
            vertiefungen.push("SBS");
        }
        return vertiefungen.map(function(vertiefung) {
           return { key: course, vertiefung: vertiefung }
        });
    });

    if (vertiefungenWithOptions.length === 0) {
        return returnValue([], "Keine Vertiefungsgebiete ausgewählt!");
    }


    // Normally, cartesianProduct expects a list of Arrays to be given, so it is usually called like:
    // Array.cartesianProduct([1, 2, 3], ['a', 'b', 'c'], [true, false]).
    // As we have an array, which contains all parameters, we have to use cartesianProduct.apply

    // So now we calculate all possibilites how the current plan could be interpreted (called combination)
    // This gives us an array, which says: One possibility is to interpret 'hci2' as 'HCGT' and 'pois2' as 'BPET'.
    // Another is to interpret 'hci2' as 'HCGT' and 'pois2' as 'SAMT'
    // Another is to interpret 'hci2' as 'SAMT' ... and so on.
    // Of course this normally happens with more courses than two.
    // a combination is a list of key+vertiefung - objects (ech key only once), called interpretation
    var possibleCombinations = Array.cartesianProduct.apply(undefined, vertiefungenWithOptions);

    // save the error message instead of instantly returning the error,
    // so that data transformation steps can still be performed
    var currentError = undefined;

    // multiple steps are necessary to filter out valid combinations
    // and to convert them to a meaningful format
    var processingSteps = [
        {filter: threeSBS, errorMessage: "Da keine 3 Softwarebasissysteme gewählt wurden, können die Vertiefungsgebiete nicht zugeteilt werden."},
        {filter: twoVertiefungen, errorMessage: "Es müssen mindestens 2 verschiedene Vertiefungsgebiete gewählt werden."},
        {filter: totalOf24, errorMessage: "Es müssen mindestens Vertiefungen im Umfang von 24 Leistungspunkten belegt werden."},
        {converter: addVertiefungCombos},
        {filter: twoTimesNine, errorMessage: "Es müssen mindestens zwei unterschiedliche Vertiefungsgebiete mit jeweils mindestens 9 Leistungspunkten belegt werden, die zusammen 24 Leistungspunkte ergeben."},
        {cleaner: expandAndTruncateVertiefungen},
        {cleaner: removeSubsets},
        {cleaner: removeDoubles},
        {converter: classifyVertiefungen},
        {filter: oneLecturePerVertiefung, errorMessage: "In jedem Vertiefungsgebiet muss mindestens eine Vorlesung belegt werden."}
    ];
    for (var s = 0; s < processingSteps.length; s++) {
        var step = processingSteps[s];
        if (step.filter != null) {
            if (currentError === undefined) {
                var oldCombinations = possibleCombinations;
                possibleCombinations = oldCombinations.filter(step.filter);
                if (possibleCombinations.length === 0) {
                    possibleCombinations = oldCombinations;
                    currentError = step.errorMessage;
                    //return error(oldCombinations, step.errorMessage);
                }
            }
        } else if (step.cleaner != null) {
            var cleaned = [];
            var emit = function (combination) {
                cleaned.push(combination);
            };
            for (var c = 0; c < possibleCombinations.length; c++) {
                step.cleaner(possibleCombinations[c], emit, c, possibleCombinations);
            }
            possibleCombinations = cleaned;
        } else if (step.converter != null) {
            for (var c = 0; c < possibleCombinations.length; c++) {
                step.converter(possibleCombinations[c]);
            }
        } else {
            throw new Error('Unknown step format!');
        }
    }

    if (currentError === undefined) {
        return returnValue(possibleCombinations); // valid!
    } else {
        return returnValue(possibleCombinations, currentError); // error occurred in progress
    }
    /////////////////////////////////////////////////////////////////////////////////////////////


    //helpers
    function isSBS(interpretation) {
        return interpretation.vertiefung === 'SBS';
    }
    function toCourse(interpretation) {
        return interpretation.key;
    }
    function getVertiefungenSet(combination) {
        var vertiefungen = new Set();
        for (var i = 0; i < combination.length; i++) {
            var interpretation = combination[i];
            vertiefungen.add(interpretation.vertiefung)
        }
        vertiefungen.delete("SBS");
        return vertiefungen;
    }


    //converter methods
    function addVertiefungCombos(combination) {
        // "In VT1 und VT2 sind jeweils mindestens 9 LP zu erbringen. In VT1 und VT2 müssen mindestens je eine Vorlesung im Umfang von 6 LP erbracht werden (not checked in this rule). Weiter müssen ergänzende Lehrveranstaltungen im Umfang von 12 LP absolviert werden, die sich auf beide Vertiefungsgebiete in den möglichen Kombinationen 3+9 LP, 6+6 LP oder 9+3 LP verteilen.
        var vertiefungsgebiete = Array.from(getVertiefungenSet(combination));
        var cpPerVertiefung = Array.from(new Array(vertiefungsgebiete.length), function(){ return 0 }); //array with same length, filled with zeros
        combination.forEach(function(interpretation) {
            // calculate index as described above
            if (interpretation.vertiefung !== "SBS") {
                var index = vertiefungsgebiete.indexOf(interpretation.vertiefung);
                cpPerVertiefung[index] += courseToCP(toCourse(interpretation));
            }
        });
        // Now we have counted all creditpoints.
        // Now test all possible pairs if they met the given criteria.
        // Found pairs are pushed to combination.possibleVertiefungen:
        combination.possibleVertiefungen = [];
        for (var i = 0; i < cpPerVertiefung.length; i += 1) {
            for (var j = i + 1; j < cpPerVertiefung.length; j += 1) {
                if (cpPerVertiefung[i] >= 9 && cpPerVertiefung[j] >= 9 && cpPerVertiefung[i] + cpPerVertiefung[j] >= 24) {
                    var newPossibleVertiefung = [vertiefungsgebiete[i], vertiefungsgebiete[j]];
                    combination.possibleVertiefungen.push(newPossibleVertiefung);
                }
            }
        }
    }
    function classifyVertiefungen(combination) {
        // Following variables will save, whether there is a lecture for the first/second Vertiefung
        var firstVertiefungLectures = [];
        var secondVertiefungLectures = [];
        combination.forEach(function(interpretation) {
            if (data[interpretation.key].lehrform.includes("Vorlesung")) {
                // check where this Vorlesung belongs to
                if (interpretation.vertiefung === combination.vertiefungCombo[0]) {
                    firstVertiefungLectures.push(data[interpretation.key]);
                }
                if (interpretation.vertiefung === combination.vertiefungCombo[1]) {
                    secondVertiefungLectures.push(data[interpretation.key]);
                }
            }
        });
        combination.firstVertiefungLectures = firstVertiefungLectures;
        combination.secondVertiefungLectures = secondVertiefungLectures;
    }


    //filter methods
    function threeSBS(combination) {
        return combination.filter(isSBS).length === 3;
    }
    function twoVertiefungen(combination) {
        return getVertiefungenSet(combination).size >= 2;
    }
    function totalOf24(combination) {
        return combination
            .filter(not(isSBS))
            .map(toCourse)
            .map(courseToCP)
            .sumElements() >= 24;
    }
    function twoTimesNine(combination) {
        // Filter this out, if no possible pairs were found.
        return combination.possibleVertiefungen.length > 0;
    }
    function oneLecturePerVertiefung(combination) {
        // And finally, check the last rule: whether a Lecture is enrolled for the given Vertiefung
        // Both Vertiefungen must have a lecture to succeed.
        return combination.firstVertiefungLectures.length > 0 && combination.secondVertiefungLectures.length > 0;
    }

    // clean up methods:

    // expand combinations with multiple Vertiefungen-combos to single ones,
    // omitting all LVs which do not contribute to this combo
    function expandAndTruncateVertiefungen(combination, emit, _i, _allCombinations) {
        var possible = combination.possibleVertiefungen;
        // For each combination, there are possible Vertiefungen-combos
        possible.forEach(function(possibleVertiefung) {
            var cleanedCombination = [];
            // Walk through all courses ..
            combination.forEach(function(course) {
                // add only those, which are important for the current Vertiefungen-combo
                if (possibleVertiefung.includes(course.vertiefung)) {
                    cleanedCombination.push(course);
                }
            });
            // save Vertiefung combo
            cleanedCombination.vertiefungCombo = possibleVertiefung;
            emit(cleanedCombination);
        });
    }
    // remove all combinations, which are a subset of another one
    function removeSubsets(combination, emit, _i, allCombinations) {
        var hasSuperCombination = allCombinations.some(function(superCombination) {
            return combination.vertiefungCombo.equals(superCombination.vertiefungCombo)
                && combination.length < superCombination.length
                && combination.every(function(interpretation) {
                    return superCombination.some(function (superInterpretation) {
                        return superInterpretation.key === interpretation.key
                            && superInterpretation.vertiefung === interpretation.vertiefung;
                    });
            });
        });
        if (!hasSuperCombination) {
            emit(combination);
        }
    }
    // remove all doubles
    function removeDoubles(combination, emit, i, allCombinations) {
        var hasDuplicate = allCombinations.some(function(otherCombination, o) {
            return o > i
                && combination.vertiefungCombo.equals(otherCombination.vertiefungCombo)
                && combination.length === otherCombination.length
                && combination.every(function (interpretation) {
                    return otherCombination.some(function(otherInterpretation) {
                        return otherInterpretation.key === interpretation.key
                            && otherInterpretation.vertiefung === interpretation.vertiefung;
                    })
                });
        });
        if (!hasDuplicate) {
            emit(combination);
        }
    }
});
