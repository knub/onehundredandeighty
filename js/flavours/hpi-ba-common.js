function loadItseBaCommon() {
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
}