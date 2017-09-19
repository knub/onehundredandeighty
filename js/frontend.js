// The term "semester-view" refer to the upper list, the list of courses which are currently chosen in a specific semester
// The term "courses-pool" refers to the lists of courses, that are currently not chosen, so the lower list
/* use strict-mode provided by ecma-script5, see http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/ for details */
"use strict";

$("header img").click(function() {
});

/*
 * Only used by the filter system
 */
var studyRegulations = {
    module: ["Grundlagen IT-Systems Engineering", "Mathematische und theoretische Grundlagen", "Softwaretechnik und Modellierung", "Rechtliche und wirtschaftliche Grundlagen", "Softwarebasissysteme", "Vertiefungsgebiete", "Softskills"],
    vertiefungsgebiete: ["BPET", "HCGT", "ISAE", "OSIS", "SAMT"]
};

var frontend = {
    /* filterManager controls the possibility to filter the courses-pool */
    filterManager: {
        /* saves all possibly selectable semesters */
        possibleSemesters: semesterManager.shownSemesters,
        /* saves the semesters, which are currently selected by the filter */
        selectedSemesters: semesterManager.shownSemesters,
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
        checkSemester: function(key) {
            if (key.search("clone") >= 0)
                key = f.repetitionManager.cloneIdToCourseId(key);
            // key is the array index to one course in data
            var copy = [];
            for (var s = 0; s < f.filterManager.possibleSemesters.length; s++) {
                if (!semesterManager.semesterLock[s]) {
                    copy.push(semesterManager.shownSemesters[s]);
                }
            }
            console.log(copy);
            for (var i = 0; i < copy.length; i += 1) {
                // if semester is in the future, reset it to the last winter/summer-semester
                if (semesterManager.semesters.indexOf(copy[i]) > semesterManager.semesters.indexOf(semesterManager.currentSemester)) {
                    if (copy[i].indexOf("SS") >= 0)
                        copy[i] = semesterManager.lastSummerSemester;
                    else if (copy[i].indexOf("WS") >= 0)
                        copy[i] = semesterManager.lastWinterSemester;
                    else
                        console.error("Something is wrong with the semester-time. Check data!");
                }
            }
            return copy.haveIntersection(data[key].semester);
        },
        /* see checkSemester for documentation, same procedure */
        checkModule: function(key) {
            if (key.search("clone") >= 0)
                key = f.repetitionManager.cloneIdToCourseId(key);
            return this.selectedModule.haveIntersection(data[key].modul);
        },
        /* see checkSemester for documentation, same procedure */
        checkVertiefungsgebiete: function(key) {
            if (key.search("clone") >= 0)
                key = f.repetitionManager.cloneIdToCourseId(key);
            if (data[key].vertiefung.length === 0) return true;
            return this.selectedVertiefungsgebiete.haveIntersection(data[key].vertiefung);
        },
        /* see checkSemester for documentation, same procedure */
        checkWahlpflicht: function(key) {
            if (key.search("clone") >= 0)
                key = f.repetitionManager.cloneIdToCourseId(key);
            // if both 'Wahl' and 'Pflicht' are in the array, its always true
            if (this.selectedWahlpflicht.indexOf("Wahl") !== - 1 && this.selectedWahlpflicht.indexOf("Pflicht") !== - 1) return true;
            // if its only 'Pflicht' return true, when the course is 'Pflicht'
            else if (this.selectedWahlpflicht[0] === "Pflicht") return data[key].pflicht;
            // if its only 'Wahl' return true, when the course is not 'Pflicht'
            else if (this.selectedWahlpflicht[0] === "Wahl") return ! data[key].pflicht;
            // if nothing is selected, return false
            return false;
        },
        filter: function() {
            f.coursesPoolUl.find("li").each(function() {
                // .slice(7) to remove foregoing "course-" from id
                var key = this.id.slice(7);

                var show = f.filterManager.checkSemester(key) && f.filterManager.checkWahlpflicht(key) && f.filterManager.checkModule(key) && f.filterManager.checkVertiefungsgebiete(key);
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
    repetitionManager: {
        cloneNode: function(li) {
            var key = li.id.substr(7);
            var semester = f.getSemester(key);
            var cloneId = "";
            if (this.repetitions[key] !== undefined) {
                cloneId = key + "-clone-" + (this.repetitions[key].count + 1).toString();
                this.repetitions[key].list.push({ id: cloneId, semester: semester });
            }
            else {
                cloneId = key + "-clone-1";
                this.repetitions[key] = { count: 0, list: [{ id: cloneId, semester: semester }] };
            }
            this.repetitions[key].count += 1;

            var clone = li.cloneNode(true);
            var ul = li.parentNode;
            var that = this;
            $(clone).attr("id", "course-" + cloneId).prepend("<span>W<br />D<br />H</span>").addClass("clone").find("button").text("x").click(function () {
                that.deleteNode(this.parentNode, cloneId);
                f.saveManager.save();
            });
            $(ul).append(clone);
            ruleManager.rules.unshift(Object.create(cloneRule).init(cloneId));
            if (f.checkPermanently === true) {
                f.checkRules();
                f.slideMessages();
            }
            f.coursesUl = $(f.coursesList);
        },
        deleteNode: function(li, cloneId) {
            var key = f.repetitionManager.cloneIdToCourseId(cloneId);
            var index = -1;
            var index = this.repetitions[key].list.forEach(function(value, i) {
                if (value.id === cloneId)
                    index = i;
            });
            this.repetitions[key].list.splice(index, 1);
            if (this.repetitions[key].list.length === 0)
                delete this.repetitions[key];
            $(li).remove();
            for (var i = 0; i < ruleManager.rules.length; i += 1) {
                var rule = ruleManager.rules[i];
                if (rule.type === 'cloneRule' && rule.cloneId === cloneId) {
                    ruleManager.rules.splice(i, 1);
                    break;
                }
            }
            f.coursesUl = $(f.coursesList);
            if (f.checkPermanently === true) {
                f.checkRules();
                f.slideMessages();
            }
            f.adjustSemesterViewHeight();
        },
        cloneIdToCourseId: function(cloneId) {
            var index = cloneId.indexOf("-");
            var key = cloneId.substr(0, index);
            return key;
        },
        repetitions: {}
    },
    /* saveManager saves the current status via Web-Storage */
    saveManager: {
        save: function() {
            var courseToSemester = {};
            /* save courses */
            for (var key in data) {
                if (!data.hasOwnProperty(key)) continue;
                courseToSemester[key] = f.getSemester(key);
            }
            /* save repetitions */
            for (var repetition in f.repetitionManager.repetitions) {
                if (!f.repetitionManager.repetitions.hasOwnProperty(repetition)) continue;
                var courseRepetition = f.repetitionManager.repetitions[repetition];
                for (var i = 0; i < courseRepetition.list.length; i += 1) {
                    var id = courseRepetition.list[i].id;
                    courseRepetition.list[i].semester = f.getSemester(id);
                }
            }
            // SAVE data
            localStorage.onehundredandeighty_hasData = true;
            localStorage.onehundredandeighty_courseToSemester = JSON.stringify(courseToSemester);
            localStorage.onehundredandeighty_repetitionManager = JSON.stringify(f.repetitionManager);
            localStorage.onehundredandeighty_filterManager = JSON.stringify(f.filterManager);
            localStorage.onehundredandeighty_semesters = JSON.stringify(semesterManager.shownSemesters);
            localStorage.onehundredandeighty_checkPermanently = f.checkPermanently;
            localStorage.onehundredandeighty_allMessagesVisible = f.allMessagesVisible;
        }
    },
    makeVertiefungsgebieteTable: function(vertiefungen) {
        var cp = 0;
        var table = "<table class='vertiefungen'>";
        table += "<tr><td>Lehr&shy;veranstaltung</td><td>Leistungs&shy;punkte</td><td>Vertiefungs&shy;gebiet</td><td style='width: 300px'>Dozent</td></tr>";
        for (var i = 0; i < vertiefungen.length; i += 1) {
            var course = data[vertiefungen[i]];
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
                var course = data[key];
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
                var course = data[key];
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
    adjustShortCourseName: function(course) {
        return course.replace(/–<br \/>/g, "–").replace(/-<br \/>/g, "&shy;").replace(/<br \/>/g, " ");
    },
    /* used to display information about possible Vertiefungsgebiete */
    makeCombinationsTable: function(possibilities) {
        var table = "<table class='combinations'>";
        table += "<tr><td></td><td>Vertiefungs&shy;gebiete</td><td>Lehr&shy;veranstaltungen</td><td>aktuell belegte<br />Leistungs&shy;punkte</td><td>Vorlesung<br />in diesem Ge&shy;biet</td></tr>";
        for (var i = 0; i < possibilities.length; i += 1) {
            var possibility = possibilities[i];

            // at first, do some calculation stuff, so collect all courses, creditpoints and lectures
            var first = [];
            var second = [];
            var firstCP = 0,
            secondCP = 0;
            for (var j = 0; j < possibility.length; j += 1) {
                var course = possibility[j];
                if (course.vertiefung === possibility.vertiefungCombo[0]) {
                    first.push(f.adjustShortCourseName(data[course.key].kurz));
                    firstCP += data[course.key].cp;
                }
                else if (course.vertiefung === possibility.vertiefungCombo[1]) {
                    second.push(f.adjustShortCourseName(data[course.key].kurz));
                    secondCP += data[course.key].cp;
                }
            }
            var firstLectures = [];
            var secondLectures = [];
            for (var j = 0; j < possibility.firstVertiefungLectures.length; j += 1)
                firstLectures.push(f.adjustShortCourseName(possibility.firstVertiefungLectures[j].kurz));
            for (var j = 0; j < possibility.secondVertiefungLectures.length; j += 1)
                secondLectures.push(f.adjustShortCourseName(possibility.secondVertiefungLectures[j].kurz));

            table += "<tr><td rowspan='2'>Variante " + (i + 1).toString() + "</td>";

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
        table += "</table>";
        return table;
    },
    /* used to check all rules and display them in div#messages */
    checkRules: function() {
        /* performance check */
        var start = new Date();

        var rules = ruleManager.checkAll();

        var ende = new Date();
        var startK = start.getHours() * 60 * 60 * 1000 + start.getMinutes() * 60 * 1000 + start.getSeconds() * 1000 + start.getMilliseconds();
        var endeK = ende.getHours() * 60 * 60 * 1000 + ende.getMinutes() * 60 * 1000 + ende.getSeconds() * 1000 + ende.getMilliseconds();
        console.log(endeK-startK);


        var messageUl = f.messageDiv.find("ul");
        messageUl.empty();
        if (rules.length === 0) {
            messageUl.append("<li>Der Belegungsplan wahrscheinlich ist gültig!</li>");
            // animate to green
            var possibilities = wahlpflichtManager.possibleCombinations;
            var extra = '<div class="extra-inf">Folgende Kombinationen von Vertiefungsgebieten sind wahrscheinlich gültig im Sinne der Studienordnung:';
            extra += f.makeCombinationsTable(possibilities);
            extra += "</div>";
            messageUl.append("<li>" + extra + "</li>");
            f.messageDiv.animate({
                backgroundColor: '#4a6400'
            }, 350);
        } else {
            for (var r = 0; r < rules.length; r += 1) {
                var rule = rules[r];
                var extra = '';
                if (rule.type === 'sbsRule')
                    extra = ' <a href="fragen.html#softwarebasissysteme">Was bedeutet das?</a>';
                else if (rule.type === 'softskillsRule')
                    extra = ' <a href="fragen.html#softskills">Was bedeutet das?</a>';
                else if (rule.type === 'vertiefungsgebieteRule') {
                    var possibilities = wahlpflichtManager.possibleCombinations;
                    extra += ' <a href="fragen.html#vertiefungsgebiete">Was bedeutet das?</a>';
                    if (possibilities.length > 0) {
                        extra += '<div class="extra-inf">Folgende Kombinationen von Vertiefungsgebieten sind in Aussicht, aber noch nicht gültig:';
                        extra += f.makeCombinationsTable(possibilities);
                        extra += "</div>";
                    }
                }
                messageUl.append("<li>" + rule.message + extra + "</li>");
            }
            // animate to red
            f.messageDiv.animate({
                backgroundColor: '#9F0606'
            }, 350);
        }

    },
    slideMessages: function() {
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
    addSemesterLockHandler: function(semesterNumber) {
        var lockSpan = $("#semester" + semesterNumber + "-lock");
        lockSpan.click(function() {
            var nowLocked = semesterManager.flipSemesterLock(semesterNumber);
            if (nowLocked) {
                lockSpan.text("🔒")
            } else {
                lockSpan.text("🔓")
            }
            f.filterManager.filter();
        });
    },
    /* used to add more than six semesters */
    addSemester: function(number) {
        if (number === undefined) number = 1;
        for (var i = 0; i < number; i+= 1) {
            if (semesterManager.numberDisplayed === 12)
                return;

            var num = (semesterManager.numberDisplayed + 1);

            var semesterTime = "<h2>" + num  + ". Semester<span id='semester" + num + "-lock' class='locksymbol'>🔓</span><br><select id='selectSemester" + num + "' name='selectSemester" + num + "' size='1'></select></h2>";
            $("#semester-time2").find("br").last().before(semesterTime);

            var semesterView = "<ul id='semester" + num + "' class='chosen courses'></ul>";
            $("#semester-view2").find("br").last().before(semesterView);

            f.addSemesterLockHandler(num);
            
            semesterManager.numberDisplayed += 1;
        }
        f.organizeSemesters();
        f.initializeSortable();
    },
    /* used to remove previously added semesters */
    removeSemester: function(number) {
        if (number === undefined) number = 1;
        for (var i = 0; i < number; i += 1) {
            if (semesterManager.numberDisplayed === 6)
                return;
            var num = semesterManager.numberDisplayed;
            $("#semester" + num).find("li").each(function() {
                var li = $(this);
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
    organizeSemesters: function() {
        // if shownSemesters has not been initialized so far ..
        if (semesterManager.shownSemesters.length === 0) {
            // .. initialize starting at semesterManager.startswith-Semester
            var index = semesterManager.semesters.indexOf(semesterManager.startswith);
            for (var i = 0; i < semesterManager.numberDisplayed; i += 1) {
                semesterManager.shownSemesters[i] = semesterManager.semesters[index];
                index += 1;
            }
        }
        else if (semesterManager.shownSemesters.length < semesterManager.numberDisplayed) {
            // number displayed has been increased by two, so the last two shownSemesters must be intialized
            var lastSemester = semesterManager.shownSemesters.last();
            var index = semesterManager.semesters.indexOf(lastSemester);
            while (semesterManager.shownSemesters.length !== semesterManager.numberDisplayed) {
                index += 1;
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
        for (var i = 0; i < semesterManager.shownSemesters.length; i++) {
            // .. build options and select the correct one
            var options = "",
            selected = "";
            // fill selects with all possible semesters (possible semesters specified in semesterManager.semesters)
            for (var j = 0; j < semesterManager.semesters.length; j++) {
                // check whether the current <option> must be selected
                selected = semesterManager.shownSemesters[i] === semesterManager.semesters[j] ? " selected": "";
                options += "<option" + selected + ">" + semesterManager.semesters[j] + "</option>";
            }
            // assume, that there are no breaks while studying and go on with the following semester
            $("#selectSemester" + (i + 1).toString()).html(options);
        }
        $(".semester-time").find("select").change(function(eventObject) {
            var select = $(this);
            var id = this.id;
            id = parseInt(id[id.length - 1]);
            semesterManager.updateSemester(id, this.value);
            select.find(":selected").removeAttr("selected");
            for (var i = 1; i <= semesterManager.shownSemesters.length; i += 1) {
                $("#selectSemester" + i).children().each(function() {
                    if (this.value === semesterManager.shownSemesters[i - 1]) {
                        $(this).attr("selected", "");
                    }
                });
            }

            // now we have to update the filter to display the correct filter options
            // if a semester was changed, filter is reset
            f.filterManager.possibleSemesters = semesterManager.shownSemesters;
            f.filterManager.selectedSemesters = semesterManager.shownSemesters;

            // now update gui
            var semesterList = "";
            for (var semester in f.filterManager.possibleSemesters) {
                if (!f.filterManager.possibleSemesters.hasOwnProperty(semester)) continue;
                semesterList += "<li class='selected'>" + f.filterManager.possibleSemesters[semester] + "</li>";
            }
            $("#semester-filter").html(semesterList);

    

            if (f.checkPermanently === true) {
                f.checkRules();
                f.slideMessages();
            }
            f.filterManager.filter();
            f.saveManager.save();
        });
    },
    /* returns the currently chosen semester for a given course */
    getSemester: function(course) {
        var parent = $("#course-" + course).parent();
        var id = parent.attr("id");
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
     * repetition: This has two meanings. On the one hand, it indicates that the course to build the <li> for is just a repetition and on the other hand, it holds the repetition's html-id
     */
    buildCourseData: function(key, repetition) {
        var id = key;
        if (repetition !== undefined)
            id = repetition;
        var course = data[key];
        var courseInfo = "<div class='info'>" + "<h3>" + course['nameLV'] + "</h3>" + "<div>" + "<table>" + f.displayArray(course['modul'], "Modul") + f.displayArray(course['dozent'], "Dozent") + "<tr><td>Leistungspunkte</td><td>" + course['cp'] + " Leistungspunkte</td></tr>" + f.displayArray(course['lehrform'], "Lehrform") + f.displayArray(course['vertiefung'], "Vertiefungsgebiet") + f.displayArray(course['semester'], "Angeboten im") + "</table>" + "</div>" + "</div>";

        // if item contains no newline break, apply specific css class (which sets line-height higher, so text is vertically aligned)
        var classes = [];
        if (course['kurz'].indexOf("<br />") === - 1) {
            classes.push("oneliner");
        }
        if (repetition !== undefined)
            classes.push("clone");
        var cssclass = "";
        if (classes.length !== 0)
            cssclass = " class='" + classes.join(" ") + "'";

        var character = f.copyCharacter;
        if (repetition !== undefined)
            character = "x";

        var repetitionString = "";
        if (repetition !== undefined)
            repetitionString = "<span>W<br />D<br />H</span>";
        return "<li" + cssclass + " id='course-" + id + "'>" +repetitionString + course['kurz'] + "<button><div class='info clone-info'>Auf diesen Button klicken, um einen Kurs in einem anderen Semester noch einmal zu wiederholen.</div><!---->" + character + "</button>" + courseInfo + "</li>";
    },
    /* used, when user starts drag'n'dropping courses */
    startSorting: function() {
        f.coursesUl.find("li").knubtip("disable");
    },
    /* used, when user finished drag'n'dropping courses */
    endSorting: function() {
        f.coursesUl.find("li").knubtip("enable");
    },
    /* called when user drag'n'dropped something */
    update: function(event, ui) {
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
        if (f.checkPermanently === true) {
            f.checkRules();
            f.slideMessages();
        }
        f.saveManager.save();
    },
    /* adjust #semester-view1 ul's heights to fit to max-height */
    adjustSemesterViewHeight: function () {
        var max = 0;
        $("#semester-view1").find("ul").css("height", "auto").css("min-height", "0").each(function (element) {
            max = Math.max(max, $(this).height());
        }).each(function (element) {
            $(this).css("min-height", max + "px");
        });
    },
    /* used to sort courses pool, ensures that each stack has the same height (frontend.coursesPoolHeight) */
    sortPool: function() {
        var listitems = f.coursesPoolUl.find("li:not(.hidden)");
        f.adjustPoolHeight(listitems.length);

        // There can be at most frontend.coursesPoolHeight items in one stack.
        // The following two var's ensure this.
        var currentPool = 1;
        var coursesInCurrentPool = 0;

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
    adjustPoolHeight: function(shownCourses) {
        // count all visible courses
        f.coursesPoolHeight = Math.ceil(shownCourses / 6);
    },
    /* used to display informationen from an array in a nice way, used for tooltips */
    displayArray: function(value, headline) {
        if (value === undefined || !Array.isArray(value) || value.length === 0 || value[0] === "")
            return "";
        var row = "<tr><td>" + headline + "</td><td>";
        row += value.join(", ");
        row += "</td></tr>";
        return row;
    },
    /* used to initialize jquery-sortable (drag'n'drop) */
    initializeSortable: function () {
        /* apply jquery drag'n'dropping */
        $(f.coursesList).sortable({
            connectWith: f.coursesList,        // specifies lists where li's can be dropped
            placeholder: "placeholder-highlight",    // css class for placeholder when drag'n dropping
            cancel: "." + f.disabledClass,        // elements matching this selector cannot be dropped
            update: f.update,            // raised, when there was a change while sorting
            start: f.startSorting,            // raised, when sorting starts
            stop: f.endSorting            // raised, when sorting is finished
        }).disableSelection();                // disableSelection makes text selection impossible
    },
    /* used to initialize course pool filter with correct selectors */
    initializeFilter: function() {
        // build semester list
        var semesterList = "<ul id='semester-filter'>";
        for (var semester in f.filterManager.possibleSemesters) {
            if (!f.filterManager.possibleSemesters.hasOwnProperty(semester)) continue;
            var selected = f.filterManager.selectedSemesters.indexOf(f.filterManager.possibleSemesters[semester]) === - 1 ? "": " class='selected'";
            semesterList += "<li" + selected + ">" + f.filterManager.possibleSemesters[semester] + "</li>";
        }
        semesterList += "</ul>";

        // build module list
        var moduleList = "<ul id='module-filter'>";
        for (var modul in f.filterManager.possibleModule) {
            if (!f.filterManager.possibleModule.hasOwnProperty(modul)) continue;
            var selected = f.filterManager.selectedModule.indexOf(f.filterManager.possibleModule[modul]) === - 1 ? "": " class='selected'";
            moduleList += "<li" + selected + ">" + f.filterManager.possibleModule[modul] + "</li>";
        }
        moduleList += "</ul>";

        // build vertiefungsgebiete list
        var vertiefungsgebieteList = "<ul id='vertiefungsgebiete-filter'>";
        for (var vertiefungsgebiet in f.filterManager.possibleVertiefungsgebiete) {
            if (!f.filterManager.possibleVertiefungsgebiete.hasOwnProperty(vertiefungsgebiet)) continue;
            var selected = f.filterManager.selectedVertiefungsgebiete.indexOf(f.filterManager.possibleVertiefungsgebiete[vertiefungsgebiet]) === - 1 ? "": " class='selected'";
            vertiefungsgebieteList += "<li" + selected + ">" + f.filterManager.possibleVertiefungsgebiete[vertiefungsgebiet] + "</li>";
        }
        vertiefungsgebieteList += ' <a href="fragen.html#vertiefungsgebiete">Wofür stehen die Abkürzungen?</a></ul>';

        // build wahlpflicht list
        var wahlpflichtList = "<ul id='wahlpflicht-filter'>";
        for (var wahlpflicht in f.filterManager.possibleWahlpflicht) {
            if (!f.filterManager.possibleWahlpflicht.hasOwnProperty(wahlpflicht)) continue;
            var selected = f.filterManager.selectedWahlpflicht.indexOf(f.filterManager.possibleWahlpflicht[wahlpflicht]) === - 1 ? "": " class='selected'";
            wahlpflichtList += "<li" + selected + ">" + f.filterManager.possibleWahlpflicht[wahlpflicht] + "</li>";
        }
        wahlpflichtList += "</ul>";

        // append built uls to correct div
        $("#semester_wahlpflicht").html(semesterList + wahlpflichtList);
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
    copyCharacter: "⎘",
    /* caching stuff */
    messageDiv: null,
    slideMessagesDiv: null,
    coursesPoolUl: null,
    coursesUl: null
};

// declare shorthand f for frontend
var f = frontend;

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
        change: function(selected, id) {
            if (selected.length === 1) {
                f.checkPermanently = true;
                $("#button-div").fadeOut(100);
                f.checkRules();
                f.slideMessages();
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
        f.checkRules();
        f.slideMessages();
        f.checkPermanently = true;
        $("#permacheck").find("li").attr("class", "selected");
        $("#checkbox-div").css("visibility", "visible");
        $("#button-div").css("visibility", "visible");
        localStorage.onehundredandeighty_alreadyChecked = true;
        f.saveManager.save();
    });

    /* apply check routine on button click */
    $("#recheck").click(function() {
        f.checkRules();
        f.slideMessages();
        f.saveManager.save();
    });

    /* add click handler for slide button to show messages */
    f.slideMessagesDiv.click(function() {
        f.allMessagesVisible = ! f.allMessagesVisible;
        f.slideMessages();
        f.saveManager.save();
    });

    f.initializeSortable();


    var filtering = false;
    /* apply filter routine on filter-button-div click */
    $("#filter-button").click(function() {
        if (filtering) {
            $(this).find("h2").text("Filter");
            $("#filter").animate({
                width: '0'
            },
            250);
        }
        else {
            $(this).find("h2").text("Fertig");
            $("#filter").animate({
                width: '100%'
            },
            250);
        }
        filtering = ! filtering;
    });

    if (localStorage.onehundredandeighty_hasData === "true") {
        f.checkPermanently = localStorage.onehundredandeighty_checkPermanently === "true";
        if (localStorage.onehundredandeighty_checkPermanently === "null")
            f.checkPermanently = null;
        f.allMessagesVisible = localStorage.onehundredandeighty_allMessagesVisible === "true";

        semesterManager.shownSemesters = JSON.parse(localStorage.onehundredandeighty_semesters);
        // if there are more than six semester, we need a special row
        if (semesterManager.shownSemesters.length > 6) {
            f.addSemester(semesterManager.shownSemesters.length - 6);
        }

        f.filterManager = $.extend(f.filterManager, JSON.parse(localStorage.onehundredandeighty_filterManager));
        f.repetitionManager = $.extend(f.repetitionManager, JSON.parse(localStorage.onehundredandeighty_repetitionManager));
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
        change: function(selected, id) {
            // according to the ul, where the selection change happened, update selected
            if (id === "semester-filter") {
                f.filterManager.selectedSemesters = selected;
            } else if (id === "wahlpflicht-filter") {
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

    var coursesPoolItems = "";
    // for each course in data
    for (var key in data) {
        if (!data.hasOwnProperty(key)) continue;
        var course = data[key];

        // build list item and associated .info for tooltip
        var html = f.buildCourseData(key);

        // now the element has been created, decide where to put it on the page

        // lookup, if there is localStorage data for this semester
        // if this is the case, use this information
        if (localStorage.onehundredandeighty_courseToSemester !== undefined && localStorage.onehundredandeighty_courseToSemester !== null) {
            var semester = JSON.parse(localStorage.onehundredandeighty_courseToSemester)[key];
            if (semester === undefined || semester === - 1) coursesPoolItems += html;
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

    for (var repetition in f.repetitionManager.repetitions) {
        if (!f.repetitionManager.repetitions.hasOwnProperty(repetition)) continue;
        var courseRepetition = f.repetitionManager.repetitions[repetition];
        f.repetitionManager.repetitions[repetition].list = courseRepetition.list.filter(function (value) {
            return value.semester !== -1;
        });
        if (courseRepetition.list.length === 0) {
            delete f.repetitionManager.repetitions[repetition];
            continue;
        }
        for (var i = 0; i < courseRepetition.list.length; i += 1) {
            var id = courseRepetition.list[i].id;
            var key = f.repetitionManager.cloneIdToCourseId(id);

            var html = f.buildCourseData(key, id);
            $("#semester" + courseRepetition.list[i].semester).append(html);
            /* add rule */
            ruleManager.rules.unshift(Object.create(cloneRule).init(id));
        }
    }
    // data of repetitionManager has changed, so save changes
    f.saveManager.save();

    /* apply click routine for buttons which clone a course */
    //f.coursesUl.find("li:not(.clone)").find("button").click(function() { // see next line, which is faster
    f.coursesUl.find("li:not(.clone)").delegate("button", "click", function() {
        f.repetitionManager.cloneNode(this.parentNode);
        f.saveManager.save();
    });
    /* apply click routine for buttons to remove a cloned course */
    //f.coursesUl.find("li.clone").find("button").click(function() {
    f.coursesUl.find("li.clone").delegate("button", "click", function() {
        // substr(7) to crop leading "course-"
        f.repetitionManager.deleteNode(this.parentNode, this.parentNode.id.substr(7));
        f.saveManager.save();
    });

    /* initialize tooltips for all courses */
    f.coursesUl.find("li").knubtip("init"); // activate tooltip for li elements (see jquery.knubtip.js)
    f.coursesUl.find("li button").knubtip("init"); // activate tooltip for button elements (see jquery.knubtip.js)
    f.filterManager.filter();

    /* adjust #semester-view1 height */
    f.adjustSemesterViewHeight();

    if (localStorage.onehundredandeighty_alreadyChecked === "true") {
        f.checkRules();
        f.slideMessages();
        $("#checkbox-div").css("visibility", "visible");
        $("#button-div").css("visibility", "visible");
    }

    $("#reset").click(function() {
        /* localStorage.clear() may remove too much data, e.g. 120 data hosted on the same server */
        localStorage.removeItem("onehundredandeighty_hasData");
        localStorage.removeItem("onehundredandeighty_courseToSemester");
        localStorage.removeItem("onehundredandeighty_repetitionManager");
        localStorage.removeItem("onehundredandeighty_filterManager");
        localStorage.removeItem("onehundredandeighty_semesters");
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
        if (f.checkPermanently === true) {
            f.checkRules();
            f.slideMessages();
        }
        f.saveManager.save();
    });
    //addling lock-handlers to the existing 6 semesters
    for (var s = 1; s <= 6; s++) {
        f.addSemesterLockHandler(s);
    }
});
