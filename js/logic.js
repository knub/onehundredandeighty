/* use strict-mode provided by ecma-script5, see http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/ for details */
"use strict";

// Both Studienordnungen
// https://hpi.de/fileadmin/user_upload/hpi/navigation/80_intern/05_studium/studien_pruefungsordnung_2010_01.pdf
// https://hpi.de/fileadmin/user_upload/hpi/navigation/80_intern/05_studium/StudOrd_Bachelor_2016.pdf




/**
 * keeps track, which table column (called semester number)
 * represents which actual semester (WSdd/dd or SSdd)
 */
const semesterManager = {
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
    isFutureSemester(semesterName) {
        return this.semesters.indexOf(semesterName) > this.semesters.indexOf(this.currentSemester)
    },
    /** returns a semester name not from the future, with same type (WS/SS) */
    referenceSemesterFor(semesterName) {
        if (semesterName.startsWith("SS")) {
            return this.lastSummerSemester
        } else if (semesterName.startsWith("WS")) {
            return this.lastWinterSemester
        }
    },
    /**
     * @param course which course(id) to test
     * @param semesterNumber which semester to test
     * @return boolean - true if it was or will be offered in the given semester
     */
    courseOfferedInSemester(course, semesterNumber) {
        const semesterName = this.shownSemesters[semesterNumber - 1];
        const semesters = data[course].semester;
        if (semesters.includes(semesterName)) {
            return true
        }
        if (this.isFutureSemester(semesterName) &&
            semesters.includes(this.referenceSemesterFor(semesterName))) {
            return true
        }
        return false
    },

    /**
     * get the current lock state for a semester
     */
    getSemesterLock(semesterNumber) {
        while (this.semesterLock.length < semesterNumber) {
            this.semesterLock.push(false);
        }
        return this.semesterLock[semesterNumber - 1];
    },
    /**
     * invert the lock state for a semester
     * @param semesterNumber the semester to alter
     * @returns {boolean} - the new lock status
     */
    flipSemesterLock(semesterNumber) {
        const newValue = !this.getSemesterLock(semesterNumber);
        this.semesterLock[semesterNumber - 1] = newValue;
        return newValue;
    },

    /**
     * called whenever the user changes a semester in a dropDown
     * @param semester_number which semester got changed
     * @param semester_string to what it got changed
     */
    updateSemester(semester_number, semester_string) {
        const index = semester_number - 1;
        if (semester_string.search(/[WS]S((\d{2}\/\d{2})|(\d{2}))/) < 0) {
            console.error("Mismatched semester string. Check data!");
            return;
        }

        const old_chosen = this.semesters.indexOf(this.shownSemesters[index]);
        const new_chosen = this.semesters.indexOf(semester_string);
        const difference = new_chosen - old_chosen;

        this.shownSemesters[index] = semester_string;

        for (let i = index + 1; i < this.shownSemesters.length; i++) {
            const old_index = this.semesters.indexOf(this.shownSemesters[i]);
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
const ruleManager = {
    getSemester: null,
    rules: [],
    init(getSemester_Function) {
        this.getSemester = getSemester_Function;
    },

    /**
     * test all rules, and update their success property
     * @returns all the rules as Array, including a numberFailedRules - property
     */
    checkAll() {
        let failingRules = [];
        for (let r = 0; r < this.rules.length; r++) {
            const rule = this.rules[r];
            const errors = rule(this.getSemester);
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
const wahlpflichtManager = {
    // vertiefungsgebiete combinations that are currently valid
    possibleCombinations: []
};

const gradeManager = {
    grades: {},
    set(course, grade) {
        this.grades[course] = grade;
    },
    get(course) {
        return this.grades[course];
    },
    setString(course, gradeString) {
        this.set(course, parseFloat(gradeString));
    },
    getString(course, niceFormatOpt) {
        const val = this.get(course);
        if (isNaN(val)) {
            return "";
        } else {
            const niceFormat = (niceFormatOpt !== undefined) ? niceFormatOpt : false;
            if (niceFormat) {
                return val.toFixed(1);
            }
            return "" + val;
        }
    }
};


/**
 * RULE SECTION
 */

//helper methods
function courseList() {
    const list = [];
    for (const course in data) {
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
        return !semesterManager.courseOfferedInSemester(id, getSemester(id));
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
    const errors = [];
    for (let i = 0; i < semesterManager.shownSemesters.length - 1; i += 1) {
        const earlier_index = semesterManager.semesters.indexOf(semesterManager.shownSemesters[i]);
        const   later_index = semesterManager.semesters.indexOf(semesterManager.shownSemesters[i + 1]);
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

    const totalCP = allBelegteCourses(getSemester)
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

    const currentlyBelegteVertiefungen = allBelegteCourses(getSemester)
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
    const vertiefungenWithOptions = currentlyBelegteVertiefungen.map(function(course) {
        const vertiefungen = data[course].vertiefung.slice(0);
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
    let possibleCombinations = Array.cartesianProduct.apply(undefined, vertiefungenWithOptions);

    // save the error message instead of instantly returning the error,
    // so that data transformation steps can still be performed
    let currentError = undefined;

    // multiple steps are necessary to filter out valid combinations
    // and to convert them to a meaningful format
    const processingSteps = [
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
    for (let s = 0; s < processingSteps.length; s++) {
        const step = processingSteps[s];
        if (step.filter != null) {
            if (currentError === undefined) {
                const oldCombinations = possibleCombinations;
                possibleCombinations = oldCombinations.filter(step.filter);
                if (possibleCombinations.length === 0) {
                    possibleCombinations = oldCombinations;
                    currentError = step.errorMessage;
                    //return error(oldCombinations, step.errorMessage);
                }
            }
        } else if (step.cleaner != null) {
            const cleaned = [];
            const emit = function (combination) {
                cleaned.push(combination);
            };
            for (let c = 0; c < possibleCombinations.length; c++) {
                step.cleaner(possibleCombinations[c], emit, c, possibleCombinations);
            }
            possibleCombinations = cleaned;
        } else if (step.converter != null) {
            for (let c = 0; c < possibleCombinations.length; c++) {
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
        const vertiefungen = new Set();
        for (let i = 0; i < combination.length; i++) {
            const interpretation = combination[i];
            vertiefungen.add(interpretation.vertiefung)
        }
        vertiefungen.delete("SBS");
        return vertiefungen;
    }


    //converter methods
    function addVertiefungCombos(combination) {
        // "In VT1 und VT2 sind jeweils mindestens 9 LP zu erbringen. In VT1 und VT2 müssen mindestens je eine Vorlesung im Umfang von 6 LP erbracht werden (not checked in this rule). Weiter müssen ergänzende Lehrveranstaltungen im Umfang von 12 LP absolviert werden, die sich auf beide Vertiefungsgebiete in den möglichen Kombinationen 3+9 LP, 6+6 LP oder 9+3 LP verteilen.
        const vertiefungsgebiete = Array.from(getVertiefungenSet(combination));
        const cpPerVertiefung = Array.from(new Array(vertiefungsgebiete.length), function(){ return 0 }); //array with same length, filled with zeros
        combination.forEach(function(interpretation) {
            // calculate index as described above
            if (interpretation.vertiefung !== "SBS") {
                const index = vertiefungsgebiete.indexOf(interpretation.vertiefung);
                cpPerVertiefung[index] += courseToCP(toCourse(interpretation));
            }
        });
        // Now we have counted all creditpoints.
        // Now test all possible pairs if they met the given criteria.
        // Found pairs are pushed to combination.possibleVertiefungen:
        combination.possibleVertiefungen = [];
        for (let i = 0; i < cpPerVertiefung.length; i += 1) {
            for (let j = i + 1; j < cpPerVertiefung.length; j += 1) {
                if (cpPerVertiefung[i] >= 9 && cpPerVertiefung[j] >= 9 && cpPerVertiefung[i] + cpPerVertiefung[j] >= 24) {
                    const newPossibleVertiefung = [vertiefungsgebiete[i], vertiefungsgebiete[j]];
                    combination.possibleVertiefungen.push(newPossibleVertiefung);
                }
            }
        }
    }
    function classifyVertiefungen(combination) {
        // Following variables will save, whether there is a lecture for the first/second Vertiefung
        const firstVertiefungLectures = [];
        const secondVertiefungLectures = [];
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
        const possible = combination.possibleVertiefungen;
        // For each combination, there are possible Vertiefungen-combos
        possible.forEach(function(possibleVertiefung) {
            const cleanedCombination = [];
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
        const hasSuperCombination = allCombinations.some(function(superCombination) {
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
        const hasDuplicate = allCombinations.some(function(otherCombination, o) {
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
