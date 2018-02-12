
function applyCourseInfo(name, semester, grade) {
    const courseKey = findBestMatchingCourse(name);
    if (courseKey === undefined) return;

    Semester.fromName(semester).take(courseKey);
    if (grade !== undefined) {
        gradeManager.set(courseKey, grade);
        Course.get(courseKey).updateGradeButton();
    }
}

function findBestMatchingCourse(name) {
    let matchCandidates = generateMatchCandidates();

    console.log(matchCandidates);
    for (const [nameString, courseKey] of matchCandidates) {
        if (nameString.startsWith(name)) {
            return courseKey;
        }
    }
    console.error("No match for '" + name + "'!");
}

function generateMatchCandidates() {
    //list of [nameString, courseKey]
    let candidates = [];
    for (const courseKey in data) {
        if (!data.hasOwnProperty(courseKey)) continue;
        const coursedata = data[courseKey];
        candidates.push([coursedata.kurz, courseKey]);
        candidates.push([coursedata.nameLV, courseKey]);

        for (let semester in coursedata.specific) {
            if (!coursedata.specific.hasOwnProperty(semester)) continue;
            const specificName = coursedata.specific[semester].nameLV;
            if (specificName !== undefined) {
                candidates.push([specificName, courseKey]);
            }
        }
    }
    return candidates;
}




let abortTimer;
let dragTimer;

$(document).on('dragover', function(e) {
    const dt = e.originalEvent.dataTransfer;
    if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') !== -1 : dt.types.contains('Files'))) {
        window.clearTimeout(dragTimer);
        window.clearTimeout(abortTimer);
        $("#dropHint").css('display', 'initial');
        dragTimer = setTimeout(function() {
            $("#dropHint").addClass('dropHintActive');
        }, 50);
    }
    e.preventDefault();
    return false;
});

function hideDropOverlay() {
    window.clearTimeout(dragTimer);
    window.clearTimeout(abortTimer);
    abortTimer = window.setTimeout(function() {
        $("#dropHint").removeClass('dropHintActive');
        setTimeout(function() {
            $("#dropHint").css('display', 'none');
        }, 500)
    }, 25);
    return false;
}

$(document).on('dragleave', hideDropOverlay);
$(document).on('dragend', function(ev) {
    // Remove all of the drag data
    const dt = ev.dataTransfer;
    console.log(dt);
    if (dt.items) {
        // Use DataTransferItemList interface to remove the drag data
        for (let i = 0; i < dt.items.length; i++) {
            dt.items.remove(i);
        }
    } else {
        // Use DataTransfer interface to remove the drag data
        ev.dataTransfer.clearData();
    }
});

$(document).on('drop', function(e) {
    e.preventDefault();
    hideDropOverlay();
    const files = e.originalEvent.dataTransfer.files; // Array of all files
    if (files.length !== 1) {
        return false;
    }
    let file = files[0];
    console.log(file);
    loadPDF(file, function(textContent) {
        const transcriptOfRecordsRegex = /(.+) (?:V|V\/Ü|V\/U|P|S|PS|K|U|Ü|BS|BP) .{5,100} (BL|\d,\d) \d\d? \d (SoSe|WiSe) (\d{4}|\d\d\/\d\d)/g;

        for (let match; (match = transcriptOfRecordsRegex.exec(textContent)) !== null;) {
            const name = match[1];
            const grade = match[2].replace(',', '.');
            const SSWS = match[3] === 'SoSe' ? 'SS' : 'WS';
            const semesterYear = match[4].length === 5 ? match[4] : match[4].substr(2);
            const semester = SSWS + semesterYear;
            if (grade === 'BL') {
                applyCourseInfo(name, semester);
            } else {
                applyCourseInfo(name, semester, parseFloat(grade));
            }
        }
        //reload the page to apply all changes
        f.saveManager.save();
        window.location.href = window.location.href;
    });
    return false;
});

function loadPDF(file, resolve) {
    let reader = new FileReader();

    reader.onload = function(fileReadEvent) {

        let loadingTask = PDFJS.getDocument(fileReadEvent.target.result);
        loadingTask.promise.then(function(pdf) {
            const pageAmount = pdf.pdfInfo.numPages;
            let resultString = '';

            const loadPage = function(pageNumber) {
                pdf.getPage(pageNumber).then(function(page) {

                    page.getTextContent().then(function (textContent) {
                        let textItems = textContent.items;
                        console.log(textItems);

                        let lineContents = new MultiMap();

                        // aggregate items into lines
                        for (let i = 0, item; item = textItems[i]; i++) {
                            //check for fitting line
                            let foundLine = false;
                            for (let line of lineContents.keys()) {
                                if (itemIsInLine(item, line)) {
                                    lineContents.push(line, item);
                                    foundLine = true;
                                    break;
                                }
                            }
                            if (!foundLine) {
                                lineContents.push(coordsOf(item).y, item);
                            }
                        }

                        //concat lines in sorted way
                        for (const lineInfo of lineContents.entries()) {
                            const lineContent = lineInfo[1];
                            lineContent.sort((a, b) => coordsOf(a).x >= coordsOf(b).x);
                            for (const item of lineContent) {
                                resultString += item.str + ' ';
                            }
                            resultString += "\n";
                        }

                        if (pageNumber < pageAmount) {
                            loadPage(pageNumber + 1);
                        } else {
                            resultString = resultString.replace(/ +/g, ' ');
                            resolve(resultString);
                        }
                    });
                });
            };
            loadPage(1);

        });
    };
    reader.readAsDataURL(file); // start reading the file data.
}


const LINE_HEIGHT_TOLERANCE = 1; //pdf-space pixels

function itemIsInLine(item, line) {
    const itemHeight = coordsOf(item).y;
    return Math.abs(itemHeight - line) <= LINE_HEIGHT_TOLERANCE;
}

function coordsOf(item) {
    return ({
        x: item.transform[4],
        y: item.transform[5]
    });
}
