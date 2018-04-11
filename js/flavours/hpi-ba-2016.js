// https://hpi.de/fileadmin/user_upload/hpi/navigation/80_intern/05_studium/StudOrd_Bachelor_2016.pdf

let ba2016Creator = function () {
    loadItseBaCommon();

    ruleManager.rules.push(function vertiefungsgebieteRule(getSemester) {
        function returnValue(data, errorMessage, type = "vertiefungsgebieteRule") {
            wahlpflichtManager.possibleCombinations = data;
            if (errorMessage === undefined) {
                return [];
            }
            return [{
                type: type,
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
         * SB* is treated equally to HCGT, OSIS, ...
         * NONE means that this LV is not used at all
         * eventually, only those options with exactly 3 SBS are used further
         */
        const vertiefungenWithOptions = currentlyBelegteVertiefungen.map(function (course) {
            const vertiefungen = getCourseParameter(course, 'vertiefung').slice(0);
            for (const sb of getCourseParameter(course, 'modul')) {
                if (sb.startsWith('SB')) {
                    vertiefungen.push(sb);
                }
            }
            vertiefungen.push("NONE");
            return vertiefungen.map(function (vertiefung) {
                return {key: course, vertiefung: vertiefung}
            });
        });


        // Normally, cartesianProduct expects a list of Arrays to be given, so it is usually called like:
        // Array.cartesianProduct([1, 2, 3], ['a', 'b', 'c'], [true, false]).
        // As we have an array, which contains all parameters, we have to use cartesianProduct.apply

        // So now we calculate all possibilites how the current plan could be interpreted (called combination)
        // This gives us an array, which says: One possibility is to interpret 'hci2' as 'HCGT' and 'pois2' as 'BPET'.
        // Another is to interpret 'hci2' as 'HCGT' and 'pois2' as 'SAMT'
        // Another is to interpret 'hci2' as 'SAMT' ... and so on.
        // Of course this normally happens with more courses than two.
        // a combination is a list of key+vertiefung - objects (ech key only once), called interpretation
        // TODO performance here (filter on combination creation)
        const allCombinations = new CartesianProduct(vertiefungenWithOptions);
        console.info(`Testing a total of ${allCombinations.totalAmount()} possible combinations.`);

        // multiple steps are necessary to filter out valid combinations
        const streamProcessingSteps = [
            {
                filter: threeSBS,
                errorMessage: "Es müssen mindestens drei Softwarebasissysteme neben BS belegt werden.",
                type: "sbsRule"
            },
            {
                filter: totalOf24,
                errorMessage: "Es müssen mindestens Vertiefungen im Umfang von 24 Leistungspunkten belegt werden."
            },
            {
                filter: twoVertiefungen,
                errorMessage: "Es müssen mindestens 2 verschiedene Vertiefungsgebiete gewählt werden."
            },
            {
                filter: onlyDifferentSBS,
                errorMessage: "Es können nicht 2 Softwarebasissysteme aus der gleichen Modulgruppe belegt werden.",
                type: "other"
            }
        ];

        let possibleCombinations = [];

        let combination;
        let maxStep = 0;
        while ((combination = allCombinations.next()) !== undefined) {
            let valid = true;
            for (let s = 0; s < streamProcessingSteps.length; s++) {
                maxStep = Math.max(maxStep, s);
                const step = streamProcessingSteps[s];
                if (!step.filter(combination)) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                possibleCombinations.push(combination);
            }
        }
        console.info(`After initial filtering, ${possibleCombinations.length} combinations survived.`);

        // save the error message instead of instantly returning the error,
        // so that data transformation steps can still be performed
        let currentError = undefined;
        let currentErrorType = undefined;
        if (possibleCombinations.length === 0) {
            currentError = streamProcessingSteps[maxStep].errorMessage;
            currentErrorType = streamProcessingSteps[maxStep].type;
        }


        // multiple steps are necessary to convert them to a meaningful format
        const processingSteps = [
            {converter: addVertiefungCombos},
            {
                filter: twoTimesNine,
                errorMessage: "Es müssen mindestens zwei unterschiedliche Vertiefungsgebiete mit jeweils mindestens 9 Leistungspunkten belegt werden, die zusammen 24 Leistungspunkte ergeben."
            },
            {cleaner: expandAndTruncateVertiefungen},
            {converter: removeNotEingebrachteLVs},
            {converter: addSBS},
            {cleaner: removeSubsets},
            {cleaner: removeDoubles},
            {converter: classifyVertiefungen},
            {
                filter: oneLecturePerVertiefung,
                errorMessage: "In jedem Vertiefungsgebiet muss mindestens eine Vorlesung belegt werden."
            },
            {converter: createVertiefungComboList},
            {cleaner: mergeOnlyDifferentVertiefungsgebiete},
            {converter: calculateGrades}
        ];
        for (let s = 0; s < processingSteps.length; s++) {
            const step = processingSteps[s];
            if (step.filter !== undefined) {
                if (currentError === undefined) {
                    const oldCombinations = possibleCombinations;
                    possibleCombinations = oldCombinations.filter(step.filter);
                    if (possibleCombinations.length === 0) {
                        possibleCombinations = oldCombinations;
                        currentError = step.errorMessage;
                        currentErrorType = step.type;
                    }
                }
            } else if (step.cleaner !== undefined) {
                const cleaned = [];
                const emit = function (combination) {
                    cleaned.push(combination);
                };
                for (let c = 0; c < possibleCombinations.length; c++) {
                    step.cleaner(possibleCombinations[c], emit, c, possibleCombinations);
                }
                possibleCombinations = cleaned;
            } else if (step.converter !== undefined) {
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
            return returnValue(possibleCombinations, currentError, currentErrorType); // error occurred in progress
        }
        /////////////////////////////////////////////////////////////////////////////////////////////


        //helpers
        function isSBS(interpretation) {
            return interpretation.vertiefung.startsWith('SB');
        }

        function isEingebracht(interpretation) {
            return interpretation.vertiefung !== 'NONE';
        }

        function toCourse(interpretation) {
            return interpretation.key;
        }

        function toUsage(interpretation) {
            return interpretation.vertiefung;
        }

        function getVertiefungenSet(combination) {
            const vertiefungen = new Set();
            for (let i = 0; i < combination.length; i++) {
                const interpretation = combination[i];
                if (!isSBS(interpretation) && isEingebracht(interpretation)) {
                    vertiefungen.add(interpretation.vertiefung);
                }
            }
            return vertiefungen;
        }

        function isSSK(course) {
            return getCourseParameter(course, 'modul').includes('Softskills');
        }


        //converter methods
        function addVertiefungCombos(combination) {
            // "In VT1 und VT2 sind jeweils mindestens 9 LP zu erbringen. In VT1 und VT2 müssen mindestens je eine Vorlesung im Umfang von 6 LP erbracht werden (not checked in this rule). Weiter müssen ergänzende Lehrveranstaltungen im Umfang von 12 LP absolviert werden, die sich auf beide Vertiefungsgebiete in den möglichen Kombinationen 3+9 LP, 6+6 LP oder 9+3 LP verteilen.
            const vertiefungsgebiete = Array.from(getVertiefungenSet(combination));
            const cpPerVertiefung = Array.from(new Array(vertiefungsgebiete.length), function () {
                return 0
            }); //array with same length, filled with zeros
            combination.forEach(function (interpretation) {
                // calculate index as described above
                if (!isSBS(interpretation)) {
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
            combination.forEach(function (interpretation) {
                if (getCourseParameter(interpretation.key, 'lehrform').includes("Vorlesung")) {
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

        function createVertiefungComboList(combination) {
            const combo1 = combination.vertiefungCombo;
            combination.vertiefungCombo = [combo1];
        }

        function calculateGrades(combination) {
            //calculate the final grade for these combinations

            let total = 0;

            function accumulate(acc, {grade, weight}) {
                total += weight;
                return acc + grade * weight;
            }

            const toGradeAndWeight = function (weight) {
                return function(course) {
                    return {
                        grade: gradeManager.get(course),
                        weight: weight * getCourseParameter(course, 'cp')
                    };
                };
            };

            const einsgewichtet = [
                'pt1', 'pt2', 'gds', 'swa',
                'mod1', 'mod2', 'swt1',
                'mathematik1', 'mathematik2', 'ti1', 'ti2',
                'wirtschaft', 'recht1', 'recht2',
                'pem',
                'bs'].concat(combination.filter(isSBS).map(toCourse));

            let courseGradeWeights = einsgewichtet.map(toGradeAndWeight(1));
            courseGradeWeights.push({
                grade: gradeManager.get('bp'),
                weight: 30
            },{
                grade: gradeManager.get('ba'),
                weight: 12
            });

            //find the best 6cp of softskills
            let ssks = allBelegteCourses(getSemester).filter(isSSK);
            ssks.sort(function (a, b) {
                return gradeManager.get(a) >= gradeManager.get(b);
            });
            let best6cp;
            let best31, best32;
            for (let i = 0; i < ssks.length; i++) {
                if (best6cp === undefined && getCourseParameter(ssks[i], 'cp') === 6)
                    best6cp = ssks[i];
                else if (getCourseParameter(ssks[i], 'cp') === 3) {
                    if (best31 === undefined)
                        best31 = ssks[i];
                    else if (best32 === undefined)
                        best32 = ssks[i];
                }
            }
            if (best6cp === undefined) {
                courseGradeWeights.push({
                    grade: (gradeManager.get(best31) + gradeManager.get(best32))/2,
                    weight: 6
                });
            } else if (best32 === undefined || best31 === undefined){
                courseGradeWeights.push({
                    grade: gradeManager.get(best6cp),
                    weight: 6
                });
            } else {
                courseGradeWeights.push({
                    grade: Math.min(gradeManager.get(best6cp), (gradeManager.get(best31) + gradeManager.get(best32))/2),
                    weight: 6
                });
            }


            //now the Vertiefungsgebiete
            for (let i = 0; i < combination.length; i++) {
                const interpretation = combination[i];
                if (!isSBS(interpretation))
                    courseGradeWeights.push(toGradeAndWeight(1.5)(toCourse(interpretation)));
            }


            combination.grade = courseGradeWeights.reduce(accumulate, 0) / total;
        }

        function addSBS(combination) {
            combination.sbs = combination.filter(isSBS);
        }

        function removeNotEingebrachteLVs(combination) {
            for (let c = 0; c < combination.length; c++) {
                const interpretation = combination[c];
                if (!isEingebracht(interpretation)) {
                    combination.splice(c, 1);
                    c--;
                }
            }
        }


        //filter methods
        function threeSBS(combination) {
            return combination.filter(isSBS).length === 3;
        }

        function onlyDifferentSBS(combination) {
            return (new Set(combination.filter(isSBS).map(toUsage))).size === 3;
        }

        function twoVertiefungen(combination) {
            return getVertiefungenSet(combination).size >= 2;
        }

        function totalOf24(combination) {
            return combination
                .filter(not(isSBS))
                .filter(isEingebracht)
                .map(toCourse)
                .map(courseToCP)
                .sumElements() === 24;
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
        function expandAndTruncateVertiefungen(combination, emit, _i, _allCombinations) {
            // expand combinations with multiple Vertiefungen-combos to single ones,
            // omitting all LVs which do not contribute to this combo
            const possible = combination.possibleVertiefungen;
            // For each combination, there are possible Vertiefungen-combos
            possible.forEach(function (possibleVertiefung) {
                const cleanedCombination = [];
                // Walk through all courses ..
                combination.forEach(function (course) {
                    // add only those, which are important for the current Vertiefungen-combo
                    if (possibleVertiefung.includes(course.vertiefung) || isSBS(course)) {
                        cleanedCombination.push(course);
                    }
                });
                // save Vertiefung combo
                cleanedCombination.vertiefungCombo = possibleVertiefung;
                emit(cleanedCombination);
            });
        }

        function removeSubsets(combination, emit, _i, allCombinations) {
            // remove all combinations, which are a subset of another one
            const hasSuperCombination = allCombinations.some(function (superCombination) {
                return combination.vertiefungCombo.equals(superCombination.vertiefungCombo)
                    && combination.length < superCombination.length
                    && combination.every(function (interpretation) {
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

        function removeDoubles(combination, emit, i, allCombinations) {
            // remove all doubles
            const hasDuplicate = allCombinations.some(function (otherCombination, o) {
                return o > i
                    && combination.vertiefungCombo.equals(otherCombination.vertiefungCombo)
                    && combination.length === otherCombination.length
                    && combination.every(function (interpretation) {
                        return otherCombination.some(function (otherInterpretation) {
                            return otherInterpretation.key === interpretation.key
                                && otherInterpretation.vertiefung === interpretation.vertiefung;
                        })
                    });
            });
            if (!hasDuplicate) {
                emit(combination);
            }
        }

        function mergeOnlyDifferentVertiefungsgebiete(combination, emit, i, allCombinations) {
            //merge together these combinations, that only differ in the Vertiefungsgebiete selected
            const merged = allCombinations.some(function (otherCombination, o) {
                if (o > i
                    && combination.length === otherCombination.length
                    && combination.every(function (interpretation) {
                        return otherCombination.some(function (otherInterpretation) {
                            return otherInterpretation.key === interpretation.key
                        })
                    })
                    //&& false
                    && new Set(combination.firstVertiefungLectures).equals(new Set(otherCombination.firstVertiefungLectures))
                    && new Set(combination.secondVertiefungLectures).equals(new Set(otherCombination.secondVertiefungLectures))) {
                    const newCombos = combination.vertiefungCombo;
                    for (let c = 0; c < newCombos.length; c++) {
                        otherCombination.vertiefungCombo.push(newCombos[c]);
                    }
                    return true;
                } else {
                    return false;
                }
            });
            if (!merged) {
                emit(combination);
            }
        }
    });
};
flavourRegistry.register('hpi-ba-2016', 'ITSE Bachelor 2016', ba2016Creator, [
    ['Studienordnung 2016', 'https://hpi.de/fileadmin/user_upload/hpi/navigation/80_intern/05_studium/StudOrd_Bachelor_2016.pdf'],
    ['hpi.de - Bachelorstudium', 'https://hpi.de/studium/studienangebot/bachelor.html']
]);
