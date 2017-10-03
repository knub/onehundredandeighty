// The term "semester-view" refer to the upper list, the list of courses which are currently chosen in a specific semester
// The term "courses-pool" refers to the lists of courses, that are currently not chosen, so the lower list
/* use strict-mode provided by ecma-script5, see http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/ for details */
"use strict";

$("header img").click(function() {
});

/*
 * Only used by the filter system
 */
const studyRegulations = {
    module: ["Grundlagen IT-Systems Engineering", "Mathematische und theoretische Grundlagen", "Softwaretechnik und Modellierung", "Rechtliche und wirtschaftliche Grundlagen", "Softwarebasissysteme", "Vertiefungsgebiete", "Softskills"],
    vertiefungsgebiete: ["BPET", "HCGT", "ISAE", "OSIS", "SAMT"]
};

// A Semester is one column in the Stundenplan
const Semester = class {
    constructor(semesterNumber) {
        this.semesterNumber = semesterNumber;
        this.container = $("#semester" + semesterNumber);
        this.lockSpan = $("#semester" + semesterNumber + "-lock");
        this.updateLockState();
        this.addSemesterLockHandler(semesterNumber);
    }
    isLocked() {
        return semesterManager.getSemesterLock(this.semesterNumber);
    }
    switchLock() {
        const nowLocked = semesterManager.flipSemesterLock(this.semesterNumber);
        this.updateLockState(nowLocked);
        f.saveManager.save();
        f.filterManager.filter();
    }
    updateLockState(newState) {
        const locked = (newState !== undefined) ? newState : this.isLocked();
        let color;
        if (locked) {
            this.lockSpan.text("🔒");
            color = '#C9C9D1';
        } else {
            this.lockSpan.text("🔓");
            color = '#fff';
        }
        this.container.animate({
            backgroundColor: color
        }, 350);
    }
    addSemesterLockHandler() {
        this.lockSpan.click(this.switchLock.bind(this));
    }
    getSemesterName() {
        return semesterManager.shownSemesters[this.semesterNumber - 1];
    }
    highlightRed() {
        if (this.isLocked()) {
            this.container.animate({
                backgroundColor: '#d4c5c5'
            }, 200);
        } else {
            this.container.animate({
                backgroundColor: '#fcc'
            }, 200);
        }
    }
    static showDragDropHintsFor(course) {
        for (let s = 0; s < semesterManager.shownSemesterObjects.length; s++) {
            const semesterObject = semesterManager.shownSemesterObjects[s];
            if (!semesterManager.courseOfferedInSemester(course, semesterObject.semesterNumber)) {
                semesterObject.highlightRed();
            }
        }
    }
    static hideDragDropHints() {
        for (let s = 0; s < semesterManager.shownSemesterObjects.length; s++) {
            const semesterObject = semesterManager.shownSemesterObjects[s];
            semesterObject.updateLockState();
        }
    }
};
semesterManager.shownSemesterObjects = [];

// A Course represents one entry in the data dict
const Course = class {
    static get(id) {
        if (id.startsWith('course-'))
            id = id.substr(7);

        const cached = courseCache[id];
        if (cached !== undefined) return cached;

        const course = new Course(id);
        courseCache[id] = course;
        return course;
    }
    constructor(id) {
        this.id = id;
        this.container =  $('#course-' + id);
        this.nameText = $('#course-' + id + '-name');
        this.gradeInput = $('#course-' + id + '-gradeinput');
        this.editGradeButton = $('#course-' + id + '>button');
        this.updateGradeButton();
    }
    data() {
        return data[this.id];
    }
    getGradeString(format) {
        return gradeManager.getString(this.id, format);
    }
    startEditGrade() {
        this.container.addClass('inGradeEditMode'); //to prevent DragnDrop
        this.nameText.css('display', 'none');
        this.editGradeButton.css('display', 'none');
        this.gradeInput.val(this.getGradeString());
        this.gradeInput.css('display', 'block');
        this.gradeInput.focus();
    }
    formatGradeInput() {
        //bring the content if the input area back into a nice format
        const content = this.gradeInput.val();
        if (content.length === 2 && !content.includes(".")) {
            this.gradeInput.val(content[0] + "." + content[1]);
        }
        if (content.length > 3) {
            this.gradeInput.val("" + content[0] + content[1] + content[content.length - 1]);
        }
    }
    onGradeEditDelete() {
        const content = this.gradeInput.val();
        if (content.length === 3 && content[1] === ".") {
            this.gradeInput.val(content[0] + ".");
        }
    }
    finishGradeEditing() {
        const grade = this.gradeInput.val();
        this.gradeInput.val("");
        if (grade) {
            gradeManager.setString(this.id, grade);
            f.saveManager.save();
            f.checkRulesIfWanted();
        }
        this.container.removeClass('inGradeEditMode');
        this.nameText.css('display', 'block');
        this.gradeInput.css('display', 'none');
        this.editGradeButton.css('display', 'block');
        this.updateGradeButton()
    }
    updateGradeButton() {
        const newGrade = this.getGradeString(true);
        if (newGrade) {
            this.editGradeButton.html(newGrade);
        } else {
            this.editGradeButton.html(f.gradeCharacter);
        }
    }
    static initEvents() {
        /* the following functions define the grade-editing behaviour */
        f.coursesUl.find("li").delegate("button", "click", function() {
            Course.get(this.parentNode.id).startEditGrade();
        });
        f.coursesUl.find("li").delegate("input", "input", function(event) {
            Course.get(this.parentNode.id).formatGradeInput();
        });
        f.coursesUl.find("li").delegate("input", "keypress", function(event) {
            const course = Course.get(this.parentNode.id);
            if (event.which === 10 || event.which === 13) { // Enter
                course.finishGradeEditing();
            } else if (event.which === 8 || event.which === 46) { //Delete or Backspace
                course.onGradeEditDelete();
            }
        });
        f.coursesUl.find("li").delegate("input", "blur", function(event) {
            Course.get(this.parentNode.id).finishGradeEditing();
        });
    }
    static createAllInstances() {
        for (const key in data) {
            if (!data.hasOwnProperty(key)) continue;
            Course.get(key);
        }
    }
};
const courseCache = {};

const Bacherlorproject = class extends Course {
    constructor() {
        super("bp");
        this.editGradeButton2 = $("#course-bp2>button");
        this.updateGradeButton();
    }

    updateGradeButton() {
        if (!this.editGradeButton2) return;
        super.updateGradeButton();
        const newGrade = this.getGradeString(true);
        if (newGrade) {
            this.editGradeButton2.html(newGrade);
        } else {
            this.editGradeButton2.html(f.gradeCharacter);
        }
    }
};

const frontend = {
    /* filterManager controls the possibility to filter the courses-pool */
    filterManager: {
        /* saves all possibly selectable semesters */
        possibleSemesters: semesterManager.shownSemesters,
        /* rest accordingly .. */
        possibleModule: studyRegulations.module,
        selectedModule: studyRegulations.module,
        possibleVertiefungsgebiete: studyRegulations.vertiefungsgebiete,
        selectedVertiefungsgebiete: studyRegulations.vertiefungsgebiete,
        possibleWahlpflicht: ["Pflicht", "Wahl"],
        selectedWahlpflicht: ["Pflicht", "Wahl"],
        /*
         * Used to determine, whether a special course should be displayed according to its semester.
         * That means, there is at least one course selected the current course is/was offered in.
         * True, when course should be displayed.
         */
        checkSemester(course) {
            // course is the array index to one course in data
            for (let s = 1; s <= semesterManager.shownSemesters.length; s++) {
                if (!semesterManager.getSemesterLock(s) &&
                    semesterManager.courseOfferedInSemester(course, s)) {
                    return true;
                }
            }
            return false;
        },
        /* see checkSemester for documentation, same procedure */
        checkModule(key) {
            return this.selectedModule.haveIntersection(data[key].modul);
        },
        /* see checkSemester for documentation, same procedure */
        checkVertiefungsgebiete(key) {
            if (data[key].vertiefung.length === 0) return true;
            return this.selectedVertiefungsgebiete.haveIntersection(data[key].vertiefung);
        },
        /* see checkSemester for documentation, same procedure */
        checkWahlpflicht(key) {
            // if both 'Wahl' and 'Pflicht' are in the array, its always true
            if (this.selectedWahlpflicht.indexOf("Wahl") !== - 1 && this.selectedWahlpflicht.indexOf("Pflicht") !== - 1) return true;
            // if its only 'Pflicht' return true, when the course is 'Pflicht'
            else if (this.selectedWahlpflicht[0] === "Pflicht") return data[key].pflicht;
            // if its only 'Wahl' return true, when the course is not 'Pflicht'
            else if (this.selectedWahlpflicht[0] === "Wahl") return ! data[key].pflicht;
            // if nothing is selected, return false
            return false;
        },
        filter() {
            f.coursesPoolUl.find("li").each(function() {
                // .slice(7) to remove foregoing "course-" from id
                const key = this.id.slice(7);

                const show = f.filterManager.checkSemester(key) && f.filterManager.checkWahlpflicht(key) && f.filterManager.checkModule(key) && f.filterManager.checkVertiefungsgebiete(key);
                if (show === false) {
                    $(this).addClass("hidden");
                }
                else {
                    $(this).removeClass("hidden");
                }
            });
            f.sortPool();
        }
    },
    /* saveManager saves the current status via Web-Storage */
    saveManager: {
        save() {
            const courseToSemester = {};
            /* save courses */
            for (const key in data) {
                if (!data.hasOwnProperty(key)) continue;
                courseToSemester[key] = f.getSemester(key);
            }
            // SAVE data
            localStorage.onehundredandeighty_hasData = true;
            localStorage.onehundredandeighty_courseToSemester = JSON.stringify(courseToSemester);
            localStorage.onehundredandeighty_filterManager = JSON.stringify(f.filterManager);
            localStorage.onehundredandeighty_semesterLocks = JSON.stringify(semesterManager.semesterLock);
            localStorage.onehundredandeighty_semesters = JSON.stringify(semesterManager.shownSemesters);
            localStorage.onehundredandeighty_grades = JSON.stringify(gradeManager.grades);
            localStorage.onehundredandeighty_checkPermanently = f.checkPermanently;
            localStorage.onehundredandeighty_allMessagesVisible = f.allMessagesVisible;
        }
    },
    makeVertiefungsgebieteTable(vertiefungen) {
        let cp = 0;
        let table = "<table class='vertiefungen'>";
        table += "<tr><td>Lehr&shy;veranstaltung</td><td>Leistungs&shy;punkte</td><td>Vertiefungs&shy;gebiet</td><td style='width: 300px'>Dozent</td></tr>";
        for (let i = 0; i < vertiefungen.length; i += 1) {
            const course = data[vertiefungen[i]];
            cp += course.cp;
            table += "<tr><td>" + course.nameLV + "</td>" +
                     "<td>" + course.cp + "</td>" +
                 "<td>" + course.vertiefung.join(", ") + "</td>" +
                 "<td>" + course.dozent.join(", ") + "</td>" +
                 "</tr>";
        }
        if (vertiefungen.sbsCourses.length === 4) {
            cp += 6;
            table += "<tr class='sbs-text'><td colspan='4'>Es wurden vier Softwarebasissysteme gewählt, sodass <strong>eines</strong> davon als Vertiefung gewertet wird (siehe auch <a href='fragen.html#mehrsoftwarebasissysteme'>Was passiert, wenn ich mehr als drei Softwarebasissysteme belege?</a>). Die vier gewählten Softwarebasissysteme sind:</td></tr>";
            vertiefungen.sbsCourses.forEach(function (key) {
                const course = data[key];
                table += "<tr class='sbs-vertiefung'><td>" + course.nameLV + "</td>" +
                     "<td>" + course.cp + "</td>" +
                     "<td>" + course.vertiefung.join(", ") + "</td>" +
                     "<td>" + course.dozent.join(", ") + "</td>" +
                     "</tr>";
            });
        }

        else if (vertiefungen.sbsCourses.length === 5) {
            cp += 12;
            table += "<tr class='sbs-text'><td colspan='4'>Es wurden fünf Softwarebasissysteme gewählt, sodass <strong>zwei</strong> davon als Vertiefung gewertet werden (siehe auch <a href='fragen.html#mehrsoftwarebasissysteme'>Was passiert, wenn ich mehr als drei Softwarebasissysteme belege?</a>). Die fünf gewählten Softwarebasissysteme sind:</td></tr>";
            vertiefungen.sbsCourses.forEach(function (key) {
                const course = data[key];
                table += "<tr class='sbs-vertiefung'><td>" + course.nameLV + "</td>" +
                     "<td>" + course.cp + "</td>" +
                     "<td>" + course.vertiefung.join(", ") + "</td>" +
                     "<td>" + course.dozent.join(", ") + "</td>" +
                     "</tr>";
            });
        }
        // if there are less than 24 creditpoints, show how much creditpoints there are
        if (cp < 24)
            table += "<tr><td></td><td class='sum'>" + cp + "</td><td></td><td></td></tr>";
        // else insert empty row, because last row is visibility:hidden by default (a little bit hacky, i know)
        else
            table += "<tr><td></td></tr>";
        table += "</table>";

        // and now there is a dirty little hack:
        // the arrow on the left of the messages box is only displayed, if there is more than <li> in the box
        // as we want to have the arrow here, because the table is quite big, we add a <li> here
        table += "<ul style='display:none;'><li></li></ul>";
        return table;
    },
    /* adjusts short lv-string to be displayed in table */
    adjustShortCourseName(course) {
        return course.replace(/–<br \/>/g, "–").replace(/-<br \/>/g, "&shy;").replace(/<br \/>/g, " ");
    },
    /* used to display information about possible Vertiefungsgebiete */
    makeCombinationsTable(possibilities, showAllDetails) {
        showAllDetails = (showAllDetails !== undefined) ? showAllDetails : false;
        const tablePreviewSize = 4;
        possibilities.sort(function(a, b) {
            return a.grade - b.grade;
        });
        let table = "<table class='combinations'>";
        table += "<tr><td></td>" +
            "<td>Vertiefungs&shy;gebiete</td>" +
            "<td>Lehr&shy;veranstaltungen</td>" +
            "<td>aktuell belegte<br />Leistungs&shy;punkte</td>" +
            "<td>Vorlesung<br />in diesem Ge&shy;biet</td>" +
            "<td>Gesamt&shy;note</td></tr>";
        for (let i = 0; i < possibilities.length && (showAllDetails || i < tablePreviewSize); i += 1) {
            const possibility = possibilities[i];

            // at first, do some calculation stuff, so collect all courses, creditpoints and lectures
            const first = [];
            const second = [];
            let firstCP = 0,
            secondCP = 0;
            for (let j = 0; j < possibility.length; j += 1) {
                const course = possibility[j];
                if (course.vertiefung === possibility.vertiefungCombo[0]) {
                    first.push(f.adjustShortCourseName(data[course.key].kurz));
                    firstCP += data[course.key].cp;
                }
                else if (course.vertiefung === possibility.vertiefungCombo[1]) {
                    second.push(f.adjustShortCourseName(data[course.key].kurz));
                    secondCP += data[course.key].cp;
                }
            }
            const firstLectures = [];
            const secondLectures = [];
            for (let j = 0; j < possibility.firstVertiefungLectures.length; j += 1)
                firstLectures.push(f.adjustShortCourseName(possibility.firstVertiefungLectures[j].kurz));
            for (let j = 0; j < possibility.secondVertiefungLectures.length; j += 1)
                secondLectures.push(f.adjustShortCourseName(possibility.secondVertiefungLectures[j].kurz));

            let finalGrade = 'un&shy;bekannt';
            if (!isNaN(possibility.grade)) {
                const number = (Math.floor(possibility.grade*1000)/1000).toFixed(3);
                finalGrade = "<span class='finalGrade'>" + number.slice(0, 3) + "<sup>" + number.substr(3) + "</sup></span>";
            }
            const sbsString = 'BS, &nbsp; ' + possibility.sbs.map(function({key}) {
                return data[key].kurz;
            }).join(', &nbsp; ');


            table += "<tr><td rowspan='3'>Variante " + (i + 1).toString() + "</td>";

            table += '<td>SBS</td>' +
                    '<td colspan="3">' +
                        '<ul style="list-style-type: none">' +
                            '<li>' + sbsString + '</li>' +
                        '</ul>' +
                    '</td>';

            table += "<td rowspan='3'>" + finalGrade + "</td>";


            table += "</tr><tr>";

            // now display first Vertiefungsgebiet
            table += "<td>" + possibility.vertiefungCombo[0] + "</td>";
            table += "<td><ul>" + first.reduce(function(prev, current) {
                return prev + "<li>" + current + "</li>";
            },
            "") + "</ul></td>";
            table += "<td>" + firstCP + "</td>";
            table += "<td>" + firstLectures.join(", ") + "</td>";

            table += "</tr><tr>";

            // now display second Vertiefungsgebiet
            table += "<td>" + possibility.vertiefungCombo[1] + "</td>";
            table += "<td><ul>" + second.reduce(function(prev, current) {
                return prev + "<li>" + current + "</li>";
            },
            "") + "</ul></td>";
            table += "<td>" + secondCP + "</td>";
            table += "<td>" + secondLectures.join(", ") + "</td>";

            table += "</tr>";
        }
        if (possibilities.length > tablePreviewSize && !showAllDetails) {
            table += '<tr><td colspan="6"><a onclick="f.showFullCombinationTable()" style="text-decoration:underline;cursor:pointer">' + (possibilities.length - tablePreviewSize) + ' weitere M&ouml;glichkeiten...</a></td></tr>';
        }
        table += "</table>";
        return table;
    },
    checkRulesIfWanted() {
        if (f.checkPermanently === true) {
            f.checkRules();
            f.slideMessages();
        }
    },
    /* used to check all rules and display them in div#messages */
    checkRules(showAllDetails) {
        /* performance check */
        const start = new Date();

        const rules = ruleManager.checkAll();

        const ende = new Date();
        const startK = start.getHours() * 60 * 60 * 1000 + start.getMinutes() * 60 * 1000 + start.getSeconds() * 1000 + start.getMilliseconds();
        const endeK = ende.getHours() * 60 * 60 * 1000 + ende.getMinutes() * 60 * 1000 + ende.getSeconds() * 1000 + ende.getMilliseconds();
        console.log(endeK-startK);


        const messageUl = f.messageDiv.find("ul");
        messageUl.empty();
        if (rules.length === 0) {
            const possibilities = wahlpflichtManager.possibleCombinations;
            const bestGrade = possibilities.reduce(function(acc, curr) {
                if (isNaN(curr.grade)) {
                    return acc;
                }
                return Math.min(acc, curr.grade);
            }, 10);
            if (bestGrade < 10) {
                messageUl.append("<li>Der Belegungsplan ist gültig! Deine beste Gesamtnote: " + (Math.floor(bestGrade*1000)/1000).toFixed(3) + "</li>");
            } else {
                messageUl.append("<li>Der Belegungsplan ist gültig!</li>");
            }
            let extra = '<div class="extra-inf">Folgende Kombinationen von Vertiefungsgebieten sind gültig im Sinne der Studienordnung:';
            extra += f.makeCombinationsTable(possibilities, showAllDetails);
            extra += "</div>";
            messageUl.append("<li>" + extra + "</li>");
            f.messageDiv.animate({
                backgroundColor: '#316400'
            }, 350);
        } else {
            for (let r = 0; r < rules.length; r += 1) {
                const rule = rules[r];
                let extra = '';
                if (rule.type === 'sbsRule')
                    extra = ' <a href="fragen.html#softwarebasissysteme">Was bedeutet das?</a>';
                else if (rule.type === 'softskillsRule')
                    extra = ' <a href="fragen.html#softskills">Was bedeutet das?</a>';
                messageUl.append("<li>" + rule.message + extra + "</li>");
            }
            // animate to red
            f.messageDiv.animate({
                backgroundColor: '#9F0606'
            }, 350);
        }
    },
    showFullCombinationTable() {
        f.checkRules(true);
    },
    slideMessages() {
        if (f.allMessagesVisible === true) {
            f.slideMessagesDiv.text("△");
            f.messageDiv.css("height", "auto");
        } else {
            f.slideMessagesDiv.text("▽");
            f.messageDiv.css("height", "2em");
        }
        if (f.messageDiv.find("li").length > 1)
            f.slideMessagesDiv.css("visibility", "visible");
        else
            f.slideMessagesDiv.css("visibility", "hidden");
    },
    /* used to add more than six semesters */
    addSemester(number) {
        if (number === undefined) number = 1;
        for (let i = 0; i < number; i+= 1) {
            if (semesterManager.numberDisplayed === 12)
                return;

            const num = (semesterManager.numberDisplayed + 1);

            const semesterTime = "<h2>" + num  + ". Semester<span id='semester" + num + "-lock' class='locksymbol'>🔓</span><br><select id='selectSemester" + num + "' name='selectSemester" + num + "' size='1'></select></h2>";
            $("#semester-time2").find("br").last().before(semesterTime);

            const semesterView = "<ul id='semester" + num + "' class='chosen courses'></ul>";
            $("#semester-view2").find("br").last().before(semesterView);

            semesterManager.shownSemesterObjects.push(new Semester(num));
            
            semesterManager.numberDisplayed += 1;
        }
        f.organizeSemesters();
        f.initializeSortable();
    },
    /* used to remove previously added semesters */
    removeSemester(number) {
        if (number === undefined) number = 1;
        for (let i = 0; i < number; i += 1) {
            if (semesterManager.numberDisplayed === 6)
                return;
            const num = semesterManager.numberDisplayed;
            $("#semester" + num).find("li").each(function() {
                const li = $(this);
                // remove it from its current location ..
                li.detach();
                // and move it to the end of courses pool
                $("#extra7").append(li);
            });
            $("#semester" + num).remove();
            $("#selectSemester" + num).parent().remove();
            semesterManager.numberDisplayed -= 1;
        }
        f.sortPool();
        f.organizeSemesters();
    },
    /* used when app is initialized to fill <select>s with semester-<option>s according to settings in logic.js */
    organizeSemesters() {
        // if shownSemesters has not been initialized so far ..
        if (semesterManager.shownSemesters.length === 0) {
            // .. initialize starting at semesterManager.startswith-Semester
            let index = semesterManager.semesters.indexOf(semesterManager.startswith);
            for (let i = 0; i < semesterManager.numberDisplayed; i += 1) {
                semesterManager.shownSemesters[i] = semesterManager.semesters[index];
                index++;
            }
        }
        else if (semesterManager.shownSemesters.length < semesterManager.numberDisplayed) {
            // number displayed has been increased by two, so the last two shownSemesters must be intialized
            const lastSemester = semesterManager.shownSemesters.last();
            let index = semesterManager.semesters.indexOf(lastSemester);
            while (semesterManager.shownSemesters.length !== semesterManager.numberDisplayed) {
                index++;
                if (index >= semesterManager.semesters.length)
                    index = semesterManager.semesters.length - 1;
                semesterManager.shownSemesters.push(semesterManager.semesters[index]);
            }
        }
        else if (semesterManager.shownSemesters.length > semesterManager.numberDisplayed) {
            while (semesterManager.shownSemesters.length !== semesterManager.numberDisplayed) {    
                semesterManager.shownSemesters.pop();
            }
            // semesters did not change, so we dont have to initialize them
            return;
        }

        // now initialize select-boxes according to information in semesterManager.shownSemesters
        for (let i = 0; i < semesterManager.shownSemesters.length; i++) {
            // .. build options and select the correct one
            let options = "",
            selected = "";
            // fill selects with all possible semesters (possible semesters specified in semesterManager.semesters)
            for (let j = 0; j < semesterManager.semesters.length; j++) {
                // check whether the current <option> must be selected
                selected = semesterManager.shownSemesters[i] === semesterManager.semesters[j] ? " selected": "";
                options += "<option" + selected + ">" + semesterManager.semesters[j] + "</option>";
            }
            // assume, that there are no breaks while studying and go on with the following semester
            $("#selectSemester" + (i + 1).toString()).html(options);
        }
        $(".semester-time").find("select").change(function(eventObject) {
            const select = $(this);
            let id = this.id;
            id = parseInt(id[id.length - 1]);
            semesterManager.updateSemester(id, this.value);
            select.find(":selected").removeAttr("selected");
            for (let i = 1; i <= semesterManager.shownSemesters.length; i += 1) {
                $("#selectSemester" + i).children().each(function() {
                    if (this.value === semesterManager.shownSemesters[i - 1]) {
                        $(this).attr("selected", "");
                    }
                });
            }


            f.checkRulesIfWanted();
            f.filterManager.filter();
            f.saveManager.save();
        });
    },
    /* returns the currently chosen semester for a given course */
    getSemester(course) {
        const parent = $("#course-" + course).parent();
        const id = parent.attr("id");
        if (id === undefined) {
            console.log(course);
            console.log(parent);
        }
        if (id.substr(0, 5) === "extra") {
            return -1;
        } else if (id.substr(0, 8) === "semester") {
            return parseInt(id.substring(8));
        }
        console.error("Function getSemester returning invalid data!");
        return -1;
    },
    /*
     * This functions builds a complete <li> element containing information about one course
     * key: The course's key to information in data.
     */
    buildCourseData(id) {
        const course = data[id];
        const courseInfo = "<div class='info'>" +
            "<h3>" + course['nameLV'] + "</h3>" +
            "<div>" +
                "<table>" +
                    f.displayArray(course['modul'], "Modul") +
                    f.displayArray(course['dozent'], "Dozent") +
                    "<tr>" +
                        "<td>Leistungspunkte</td>" +
                        "<td>" + course['cp'] + " Leistungspunkte</td>" +
                    "</tr>" +
                    f.displayArray(course['lehrform'], "Lehrform") +
                    f.displayArray(course['vertiefung'], "Vertiefungsgebiet") +
                    f.displayArray(course['semester'], "Angeboten im") +
                "</table>" +
            "</div>" +
        "</div>";

        // if item contains no newline break, apply specific css class (which sets line-height higher, so text is vertically aligned)
        const classes = [];
        if (course['kurz'].indexOf("<br />") === - 1) {
            classes.push("oneliner");
        }
        let cssclass = "";
        if (classes.length !== 0)
            cssclass = " class='" + classes.join(" ") + "'";

        let character = f.gradeCharacter;

        return "<li" + cssclass + " id='course-" + id + "'>" +
                    "<span id='course-" + id + "-name'>" + course['kurz'] + "</span>" +
                    "<input type='text' id='course-" +  id + "-gradeinput' class='courseGradeInput'/>" +
                    "<button>" +
                        "<div class='info grade-info'>Hier klicken, um deine Note für diese Veranstaltung einzutragen.</div>" +
                        "<!---->" + character + "" +
                    "</button>" + courseInfo +
                "</li>";
    },
    /* used, when user starts drag'n'dropping courses */
    startSorting(event, ui) {
        f.coursesUl.find("li").knubtip("disable");
        const itemID = ui.item[0].id;
        const courseName = itemID.substr(7); // remove 'course-' from the id
        Semester.showDragDropHintsFor(courseName);
    },
    /* used, when user finished drag'n'dropping courses */
    endSorting(event, ui) {
        f.coursesUl.find("li").knubtip("enable");
        Semester.hideDragDropHints();
    },
    /* called when user drag'n'dropped something */
    update(event, ui) {
        // catches the first of two duplicate calls to the update function
        // after every drag and drop and returns, so that the rules are
        // only checked once per change
        // ui.sender is only defined for the second call
        if (ui.sender === null) {
            return;
        }
        f.adjustSemesterViewHeight();
        f.sortPool();
        f.filterManager.filter();
        f.checkRulesIfWanted();
        f.saveManager.save();
    },
    /* adjust #semester-view1 ul's heights to fit to max-height */
    adjustSemesterViewHeight: function () {
        let max = 0;
        $("#semester-view1").find("ul").css("height", "auto").css("min-height", "0").each(function (element) {
            max = Math.max(max, $(this).height());
        }).each(function (element) {
            $(this).css("min-height", max + "px");
        });
    },
    /* used to sort courses pool, ensures that each stack has the same height (frontend.coursesPoolHeight) */
    sortPool() {
        let listitems = f.coursesPoolUl.find("li:not(.hidden)");
        f.adjustPoolHeight(listitems.length);

        // There can be at most frontend.coursesPoolHeight items in one stack.
        // The following two var's ensure this.
        let currentPool = 1;
        let coursesInCurrentPool = 0;

        listitems = listitems.sort(function (a, b) {
            if (a.innerHTML === b.innerHTML)
                return 0;
            else if (a.innerHTML < b.innerHTML)
                return -1;
            else
                return +1;
        });

        // for each listitem
        listitems.each(function(index, listitem) {
            // listitem is li dom element, jquerify it
            listitem = $(listitem);

            // detach it from wherever it is at the moment
            listitem.detach();
            // .. put it in the courses pool taking care of frontend.coursesPoolHeight
            $("#extra" + currentPool).append(listitem);
            coursesInCurrentPool += 1;
            if (coursesInCurrentPool === f.coursesPoolHeight) {
                coursesInCurrentPool = 0;
                currentPool += 1;
            }
        });
    },
    /* used to adjust the height of one stack in courses-pool */
    adjustPoolHeight(shownCourses) {
        // count all visible courses
        f.coursesPoolHeight = Math.ceil(shownCourses / 6);
    },
    /* used to display informationen from an array in a nice way, used for tooltips */
    displayArray(value, headline) {
        if (value === undefined || !Array.isArray(value) || value.length === 0 || value[0] === "")
            return "";
        return "<tr>" +
                   "<td>" + headline + "</td>" +
                   "<td>" + value.join(", ") + "</td>" +
               "</tr>";
    },
    /* used to initialize jquery-sortable (drag'n'drop) */
    initializeSortable: function () {
        /* apply jquery drag'n'dropping */
        $(f.coursesList).sortable({
            connectWith: f.coursesList,        // specifies lists where li's can be dropped
            placeholder: "placeholder-highlight",    // css class for placeholder when drag'n dropping
            cancel: "." + f.disabledClass + ",.inGradeEditMode",        // elements matching this selector cannot be dropped
            update: f.update,            // raised, when there was a change while sorting
            start: f.startSorting,            // raised, when sorting starts
            stop: f.endSorting            // raised, when sorting is finished
        }).disableSelection();                // disableSelection makes text selection impossible
    },
    /* used to initialize course pool filter with correct selectors */
    initializeFilter() {
        // build module list
        let moduleList = "<ul id='module-filter'>";
        for (const modul in f.filterManager.possibleModule) {
            if (!f.filterManager.possibleModule.hasOwnProperty(modul)) continue;
            const selected = f.filterManager.selectedModule.indexOf(f.filterManager.possibleModule[modul]) === - 1 ? "": " class='selected'";
            moduleList += "<li" + selected + ">" + f.filterManager.possibleModule[modul] + "</li>";
        }
        moduleList += "</ul>";

        // build vertiefungsgebiete list
        let vertiefungsgebieteList = "<ul id='vertiefungsgebiete-filter'>";
        for (const vertiefungsgebiet in f.filterManager.possibleVertiefungsgebiete) {
            if (!f.filterManager.possibleVertiefungsgebiete.hasOwnProperty(vertiefungsgebiet)) continue;
            const selected = f.filterManager.selectedVertiefungsgebiete.indexOf(f.filterManager.possibleVertiefungsgebiete[vertiefungsgebiet]) === - 1 ? "": " class='selected'";
            vertiefungsgebieteList += "<li" + selected + ">" + f.filterManager.possibleVertiefungsgebiete[vertiefungsgebiet] + "</li>";
        }
        vertiefungsgebieteList += ' <a href="fragen.html#vertiefungsgebiete">Wofür stehen die Abkürzungen?</a></ul>';

        // build wahlpflicht list
        let wahlpflichtList = "<ul id='wahlpflicht-filter'>";
        for (const wahlpflicht in f.filterManager.possibleWahlpflicht) {
            if (!f.filterManager.possibleWahlpflicht.hasOwnProperty(wahlpflicht)) continue;
            const selected = f.filterManager.selectedWahlpflicht.indexOf(f.filterManager.possibleWahlpflicht[wahlpflicht]) === - 1 ? "": " class='selected'";
            wahlpflichtList += "<li" + selected + ">" + f.filterManager.possibleWahlpflicht[wahlpflicht] + "</li>";
        }
        wahlpflichtList += "</ul>";

        // append built uls to correct div
        $("#semester_wahlpflicht").html(wahlpflichtList);
        $("#module_vertiefungsgebiete").html(moduleList + vertiefungsgebieteList);
    },
    /* selector for droppables */
    coursesList: ".courses",
    /* when a li has this class it cannot be dragged */
    disabledClass: "disabled",
    /* true, when all error messages are visible in drop down list */
    allMessagesVisible: false,
    /* when true, rules are checked permanently */
    checkPermanently: null,
    /* number of list items in one list in unchosen lists */
    coursesPoolHeight: 8,
    gradeCharacter: "✓",
    /* caching stuff */
    messageDiv: null,
    slideMessagesDiv: null,
    coursesPoolUl: null,
    coursesUl: null
};

// declare shorthand f for frontend
const f = frontend;

// note: $(function () ...) is the same as $(document).ready(function () ..)
$(function() {
    /* at first: do the caching stuff */
    f.messageDiv = $("#message");
    f.slideMessagesDiv = $("#slide-messages");
    f.coursesPoolUl = $("#courses-pool > ul");
    f.coursesUl = $(f.coursesList);

    /* initialize rule manager with function, which returns the currently chosen semester for a specific course */
    ruleManager.init(f.getSemester);

    $("#last-update").html("Daten: WS10/11 bis einschließlich " + semesterManager.currentSemester);
    /* initialize check permanently checkbox */
    $("#checkbox-div").find("ul").knubselect({
        // change is raised when the selection changed
        change(selected, id) {
            if (selected.length === 1) {
                f.checkPermanently = true;
                $("#button-div").fadeOut(100);
                f.checkRulesIfWanted();
            }
            else {
                f.checkPermanently = false;
                $("#button-div").fadeIn(100);
            }
            f.saveManager.save();
        }
    });

    /* apply check routine on button click */
    $("#check").click(function() {
        f.checkRulesIfWanted();
        f.checkPermanently = true;
        $("#permacheck").find("li").attr("class", "selected");
        $("#checkbox-div").css("visibility", "visible");
        $("#button-div").css("visibility", "visible");
        localStorage.onehundredandeighty_alreadyChecked = true;
        f.saveManager.save();
    });

    /* apply check routine on button click */
    $("#recheck").click(function() {
        f.checkRulesIfWanted();
        f.saveManager.save();
    });

    /* add click handler for slide button to show messages */
    f.slideMessagesDiv.click(function() {
        f.allMessagesVisible = ! f.allMessagesVisible;
        f.slideMessages();
        f.saveManager.save();
    });

    f.initializeSortable();


    let filtering = false;
    /* apply filter routine on filter-button-div click */
    $("#filter-button").click(function() {
        if (filtering) {
            $(this).find("h2").text("Filter");
            $("#filter").animate({
                width: '0'
            }, 250);
        }
        else {
            $(this).find("h2").text("Fertig");
            $("#filter").animate({
                width: '100%'
            }, 250);
        }
        filtering = !filtering;
    });

    if (localStorage.onehundredandeighty_hasData === "true") {
        f.checkPermanently = localStorage.onehundredandeighty_checkPermanently === "true";
        if (localStorage.onehundredandeighty_checkPermanently === "null")
            f.checkPermanently = null;
        f.allMessagesVisible = localStorage.onehundredandeighty_allMessagesVisible === "true";

        semesterManager.shownSemesters = JSON.parse(localStorage.onehundredandeighty_semesters);
        if (localStorage.onehundredandeighty_grades)
            gradeManager.grades = JSON.parse(localStorage.onehundredandeighty_grades);
        if (localStorage.onehundredandeighty_semesterLocks)
            semesterManager.semesterLock = JSON.parse(localStorage.onehundredandeighty_semesterLocks);
        // if there are more than six semester, we need a special row
        if (semesterManager.shownSemesters.length > 6) {
            f.addSemester(semesterManager.shownSemesters.length - 6);
        }

        f.filterManager = $.extend(f.filterManager, JSON.parse(localStorage.onehundredandeighty_filterManager));
        if (f.checkPermanently !== false) $("#permacheck").find("li").attr("class", "selected");
        else $("#button-div").fadeIn(100);
    }

    /* initialize <select>'s with correct semesters from logic (see logic.js) */
    f.organizeSemesters();

    /* initialize filter with correct settings */
    f.initializeFilter();

    /* initialize selectables for filter div */
    $("#filter-options").find("ul").knubselect({
        // change is raised when the selection changed
        change(selected, id) {
            // according to the ul, where the selection change happened, update selected
            if (id === "wahlpflicht-filter") {
                f.filterManager.selectedWahlpflicht = selected;
            } else if (id === "module-filter") {
                f.filterManager.selectedModule = selected;
            } else if (id === "vertiefungsgebiete-filter") {
                f.filterManager.selectedVertiefungsgebiete = selected;
            }
            f.filterManager.filter();
            f.saveManager.save();
        }
    });
    /*
     * Information:
     * var data is imported from data.js
     * It is an object containing all relevant informationen about courses.
     */

    let coursesPoolItems = "";
    // for each course in data
    for (const key in data) {
        if (!data.hasOwnProperty(key)) continue;
        const course = data[key];

        // build list item and associated .info for tooltip
        const html = f.buildCourseData(key);

        // now the element has been created, decide where to put it on the page

        // lookup, if there is localStorage data for this semester
        // if this is the case, use this information
        if (localStorage.onehundredandeighty_courseToSemester !== undefined && localStorage.onehundredandeighty_courseToSemester !== null) {
            const semester = JSON.parse(localStorage.onehundredandeighty_courseToSemester)[key];
            if (semester === undefined || semester === -1) coursesPoolItems += html;
            else if (semester >= 0) $("#semester" + JSON.parse(localStorage.onehundredandeighty_courseToSemester)[key]).append(html);
        }
        // else use standard behaviour
        else {
            // if it is not recommended for a specific semester ..
            if (course['empfohlen'] === "") {
                // .. put it in the courses pool
                // for now, putting in the first ul is ok, because whole courses-pool will be rearranged afterwards
                coursesPoolItems += html;
            }
            // if it is recommended for a specific semester ..
            else {
                // .. just put it there.
                $("#semester" + course['empfohlen']).append(html);
            }
        }
    }
    $("#extra1").append(coursesPoolItems);
    // until now, all courses are in the first ul. now adjust pool height and sort pool.
    f.sortPool();

    /* initialize the Course class and all the instances */
    Course.initEvents();
    courseCache.bp = new Bacherlorproject();
    courseCache.bp2 = courseCache.bp;
    Course.get('ba');
    Course.createAllInstances();

    /* initialize tooltips for all courses */
    f.coursesUl.find("li").knubtip("init"); // activate tooltip for li elements (see jquery.knubtip.js)
    f.coursesUl.find("li button").knubtip("init"); // activate tooltip for button elements (see jquery.knubtip.js)
    f.filterManager.filter();

    /* adjust #semester-view1 height */
    f.adjustSemesterViewHeight();

    if (localStorage.onehundredandeighty_alreadyChecked === "true") {
        f.checkRulesIfWanted();
        $("#checkbox-div").css("visibility", "visible");
        $("#button-div").css("visibility", "visible");
    }

    $("#reset").click(function() {
        /* localStorage.clear() may remove too much data, e.g. 120 data hosted on the same server */
        localStorage.removeItem("onehundredandeighty_hasData");
        localStorage.removeItem("onehundredandeighty_courseToSemester");
        localStorage.removeItem("onehundredandeighty_filterManager");
        localStorage.removeItem("onehundredandeighty_semesterLocks");
        localStorage.removeItem("onehundredandeighty_semesters");
        localStorage.removeItem("onehundredandeighty_grades");
        localStorage.removeItem("onehundredandeighty_checkPermanently");
        localStorage.removeItem("onehundredandeighty_allMessagesVisible");
        location.reload();
    });
    $("#moresemester").click(function() {
        f.addSemester(2);
        f.saveManager.save();
    });
    $("#lesssemester").click(function() {
        f.removeSemester(2);
        f.coursesUl = $(f.coursesList);
        f.checkRulesIfWanted();
        f.saveManager.save();
    });
    //addling lock-handlers to the existing 6 semesters
    for (let s = 1; s <= 6; s++) {
        semesterManager.shownSemesterObjects.push(new Semester(s));
    }
    $('#changeStudienordnungLink')
        .text(NEUE_STUDIENORDNUNG ? '2016' : '2010')
        .click(switchStudienordnung);
});
