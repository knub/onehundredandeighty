// https://hpi.de/fileadmin/user_upload/hpi/navigation/80_intern/05_studium/StudOrd_Bachelor_2016.pdf

function grades() {
    const toGradeAndWeight = function (weight) {
        return function (course) {
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
    }, {
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
            grade: (gradeManager.get(best31) + gradeManager.get(best32)) / 2,
            weight: 6
        });
    } else if (best32 === undefined || best31 === undefined) {
        courseGradeWeights.push({
            grade: gradeManager.get(best6cp),
            weight: 6
        });
    } else {
        courseGradeWeights.push({
            grade: Math.min(gradeManager.get(best6cp), (gradeManager.get(best31) + gradeManager.get(best32)) / 2),
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

let ba2016Creator = function () {
    ruleManager.rules.push(function vertiefungsgebieteRule(getSemester) {
        return [{
            type: "lolaRule",
            message: "2016 not implemented yet"
        }]
    });
};
flavourRegistry.register('hpi-ba-2016', 'ITSE Bachelor 2016', ba2016Creator, [
    ['Studienordnung 2016', 'https://hpi.de/fileadmin/user_upload/hpi/navigation/80_intern/05_studium/StudOrd_Bachelor_2016.pdf'],
    ['hpi.de - Bachelorstudium', 'https://hpi.de/studium/studienangebot/bachelor.html']
]);