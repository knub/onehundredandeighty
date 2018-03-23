/* use strict-mode provided by ecma-script5, see http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/ for details */
"use strict";

// Both Studienordnungen
// https://hpi.de/fileadmin/user_upload/hpi/navigation/80_intern/05_studium/studien_pruefungsordnung_2010_01.pdf
// https://hpi.de/fileadmin/user_upload/hpi/navigation/80_intern/05_studium/StudOrd_Bachelor_2016.pdf

/**
 * get the value of data[course][parameter], for a given Semester
 * @param course the course id
 * @param parameter the parameter name
 * @param semesterNumber the number of the semester to get information for
 */
function getCourseParameter(course, parameter, semesterNumber) {
    if (semesterNumber === undefined) {
        semesterNumber = f.getSemester(course);
    }
    if (semesterNumber < 0) {
        //find the last semester that is not locked and where this course is offered,
        //and use it as display reference
        for (let testSemester = semesterManager.shownSemesters.length - 1; testSemester >= 0; testSemester--) {
            const testSemesterNumber = testSemester+1;
            if (semesterManager.getSemesterLock(testSemesterNumber)) {
                continue;
            }
            if (!semesterManager.courseOfferedInSemester(course, testSemesterNumber)) {
                continue;
            }
            semesterNumber = testSemesterNumber;
            break;
        }
    }
    let semesterName = 'general';
    if (semesterNumber >= 0) {
        semesterName = semesterManager.shownSemesters[semesterNumber - 1].substr(0, 4);
    }
    const coursedata = data[course];
    const specific = coursedata.specific[semesterName];
    if (specific !== undefined) {
        const specificParameter = specific[parameter];
        if (specificParameter !== undefined) {
            return specificParameter;
        }
    }
    return coursedata[parameter];
}


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
    numberDisplayed: 0,
    semesterLock: [],
    // current must be either lastSummerSemester or lastWinterSemester!
    currentSemester: "WS17/18",
    lastSummerSemester: "SS17",
    lastWinterSemester: "WS17/18",
    preLastSummerSemester: "SS16",
    preLastWinterSemester: "WS16/17",
    /* the semester that is the first semester when you first start the application */
    startswith: "WS15/16",

    /* saves for each course an extra semester where it is offered */
    exceptions: {},
    addTimeException(course, semesterNumber) {
        this.exceptions[course] = this.shownSemesters[semesterNumber - 1];
        this.removeTimeExceptionIfAble(course, semesterNumber);
    },
    removeTimeExceptionIfAble(course, semesterNumber) {
        if (semesterNumber < 0 || this.courseOfferedInSemester(course, semesterNumber, false)) {
            this.exceptions[course] = undefined;
        }
    },

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
    /** returns a semester name not from the future, with same type (WS/SS) */
    referenceSemester2For(semesterName) {
        if (semesterName.startsWith("SS")) {
            return this.preLastSummerSemester
        } else if (semesterName.startsWith("WS")) {
            return this.preLastWinterSemester
        }
    },
    /**
     * @param course which course(id) to test
     * @param semesterNumber which semester to test
     * @param allowExceptions true to also
     * @return boolean - true if it was or will be offered in the given semester
     */
    courseOfferedInSemester(course, semesterNumber, allowExceptions = true) {
        if (allowExceptions && this.shownSemesters[semesterNumber - 1] === this.exceptions[course]) {
            return true;
        }

        if (course.startsWith('bp')) {
            if (course === 'bp') {
                return this.shownSemesters[semesterNumber - 1].startsWith("WS");
            } else { //'bp2'
                return this.shownSemesters[semesterNumber - 1].startsWith("SS");
            }
        } else if (course === 'ba') {
            return this.shownSemesters[semesterNumber - 1].startsWith("SS");
        }

        const semesterName = this.shownSemesters[semesterNumber - 1];
        const semesters = data[course].semester;
        if (semesters.includes(semesterName)) {
            return true
        }
        if (this.isFutureSemester(semesterName)
            && semesters.includes(this.referenceSemesterFor(semesterName))
            && semesters.includes(this.referenceSemester2For(semesterName))) {
            return true
        }
        if (data[course].kurz === 'VHDL') {
            const ws_ss = semesterName.substr(0, 2);
            const num = parseInt(semesterName.substr(2, 2));
            return (ws_ss === 'SS') && (num % 2 === 0)
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
        const val = this.grades[course];
        if (val) {
            return val;
        }
        return NaN;
    },
    setString(course, gradeString) {
        const float = parseFloat(gradeString);
        if (float < 1 || float > 5) {
            return;
        }
        if (gradeString.length > 2 && !['0', '3', '7'].includes(gradeString[2])) {
            return;
        }
        this.set(course, float);
    },
    getString(course, niceFormatOpt) {
        const val = this.get(course);
        if (!val) {
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
function allBelegteCoursesInSemester(getSemester, semesterID) {
    return courseList().filter(function(id) {
        return getSemester(id) === semesterID
    });
}
function isModul(type) {
    return function(id) {
        return getCourseParameter(id, 'modul').includes(type);
    }
}
function not(f) {
    return function() {
        return !f.apply(null, arguments);
    }
}
function courseToCP(id) {
    return getCourseParameter(id, 'cp');
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
            course: id,
            type: "timeRule",
            message: "Die Veranstaltung '" + getCourseParameter(id, 'nameLV') + "' wird im gewählten " + getSemester(id) + ". Semester nicht angeboten."
        };
    }

    return allBelegteCourses(getSemester)
        .filter(hasTimeProblem)
        .map(createErrorMessage)
});

ruleManager.rules.push(function mustDoRule(getSemester) {
    function mustDoCourse(id) {
        return getCourseParameter(id, 'pflicht');
    }
    function courseNotBelegt(id) {
        return getSemester(id) === -1
    }
    function createErrorMessage(id) {
        return {
            type: "mustDoRule",
            message: "Die Veranstaltung '" + getCourseParameter(id, 'nameLV') + "' muss belegt werden."
        };
    }


   return courseList()
       .filter(mustDoCourse)
       .filter(courseNotBelegt)
       .map(createErrorMessage)
});

ruleManager.rules.push(function semesterOrderRule() {
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


class CartesianProduct {
    constructor(arrayOfDimensions) {
        this.arrayOfDimensions = arrayOfDimensions;
        this.reset();
    }
    totalAmount() {
        return this.arrayOfDimensions.map((a) => a.length).reduce(((a, b) => a * b), 1);
    }
    next() {
        if (this.done) return;
        const result = this.current();
        this.increaseCounter();
        return result;
    }
    reset() {
        this.currentPosition = new Array(this.dimensions());
        for (let d = 0; d < this.currentPosition.length; d++) {
            this.currentPosition[d] = 0;
        }
        this.done = false;
    }
    dimensions() {
        return this.arrayOfDimensions.length;
    }
    current() {
        let result = [];
        for (let d = 0; d < this.dimensions(); d++) {
            result.push(this.arrayOfDimensions[d][this.currentPosition[d]]);
        }
        return result;
    }
    increaseCounter() {
        const increaseAtDigit = (function(digit) {
            this.currentPosition[digit]++;
            if (this.currentPosition[digit] >= this.arrayOfDimensions[digit].length) {
                this.currentPosition[digit] = 0;
                if (digit > 0) {
                    increaseAtDigit(digit - 1);
                } else {
                    this.done = true;
                }
            }
        }).bind(this);
        increaseAtDigit(this.dimensions() - 1);
    }
}


