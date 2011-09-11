// The term "semester-view" refer to the upper list, the list of courses which are currently chosen in a specific semester
// The term "courses-pool" refers to the lists of courses, that are currently not chosen, so the lower list

/* use strict-mode provided by ecma-script5, see http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/ for details */
"use strict";

$("#debug").click(function () {
	alert($(window).height());
	//$(this).css("display", "none");
});

//alert([1, 2, 1].subsetOf([1, 2, 3]));

/*
var a = [1, 2, 3, 4, 5];
var b = a.slice();

//for (var i = 0; i < a.length; i += 1) {
a.forEach(function (element, i) {
	alert(a[i]);
	if (a[i] === 3)
		a.remove(i);
});
alert(b);
*/

var frontend = {
	filterManager: {
		/* saves the semesters, which are currently selected by the filter */
		selectedSemester: semesterManager.shownSemesters,
		/* saves the modules, which are currently selected by the filter */
		selectedModule: studyRegulations.module,
		/* saves the vertiefungsgebiete, which are currently selected by the filter */
		selectedVertiefungsgebiete: studyRegulations.vertiefungsgebiete,
		/* saves whether 'Wahl' or 'Pflicht' courses should be displayed */
		selectedWahlpflicht: ["Pflicht", "Wahl"],
		/*
		 * Used to determine, whether a special course should be displayed according to its semester.
		 * That means, there is at least one course selected the current course is/was offered in.
		 * True, when course should be displayed.
		 */
		checkSemester: function (key) {
			// key is the array index to one course in data

			return this.selectedSemester.haveIntersection(data[key].semester);
		},
		/* see checkSemester for documentation, same procedure */
		checkModule: function (key) {
			return this.selectedModule.haveIntersection(data[key].modul);
		},
		/* see checkSemester for documentation, same procedure */
		checkVertiefungsgebiete: function (key) {
			if (data[key].vertiefung[0] === "")
				return true;
			return this.selectedVertiefungsgebiete.haveIntersection(data[key].vertiefung);
		},
		checkWahlpflicht: function (key) {
			// if both 'Wahl' and 'Pflicht' are in the array, its always true
			if (this.selectedWahlpflicht.indexOf("Wahl") !== -1 && this.selectedWahlpflicht.indexOf("Pflicht") !== -1)
				return true;
			// if its only 'Pflicht' return true, when the course is 'Pflicht'
			else if (this.selectedWahlpflicht[0] === "Pflicht")
				return data[key].pflicht;
			// if its only 'Wahl' return true, when the course is not 'Pflicht'
			else if (this.selectedWahlpflicht[0] === "Wahl")
				return !data[key].pflicht;
			// if nothing is selected, return false
			return false;
		}
	},
	/* used to check all rules and display them in div#messages */
	checkRules: function () {
		var failedRules = ruleManager.checkAll();
		$("#message ul").empty();
		if (failedRules.length === 0) {
			$("#message ul").append("<li>Der Belegungsplan ist gültig!</li>");
			// animate to green
			//$("#message").animate( { backgroundColor: '#008000' }, 150);
			$("#message").animate( { backgroundColor: '#026400' }, 150);
		}
		else {
			for (var rule = 0; rule < failedRules.length; rule += 1) {
				var extra = '';
				if (failedRules[rule].type === 'sbsRule')
					extra = ' <a href="studienordnung.html#Softwarebasissysteme">Was bedeutet das?</a>';
				else if (failedRules[rule].type === 'softskillsRule')
					extra = ' <a href="studienordnung.html#Softskills">Was bedeutet das?</a>';
				$("#message ul").append("<li>" + failedRules[rule].message + extra + "</li>");
			}
			// animate to red
			//$("#message").animate( { backgroundColor: '#FF0000' }, 150);
			$("#message").animate( { backgroundColor: '#9F0606' }, 150);
			
		}

	},
	slideMessages: function () {
		if (frontend.allMessagesVisible === true) {
			$("#slide-messages").text("△");
			// each li is 2em high
			var ulheight= $("#message li").length * 2;
			//$("#message").animate({ height: ulheight + 'em' }, 300);
			$("#message").css("height", "auto");
		} else {
			$("#slide-messages").text("▽");
			//$("#message").animate({ height: '2em' }, 300);
			$("#message").css("height", "2em");
		}
		if ($("#message li").length > 1) {
			$("#slide-messages").css("visibility", "visible");
		}
		else {
			$("#slide-messages").css("visibility", "hidden");
		}
	},
	/* used when app is initializied to fill <select>s with semester-<option>s according to settings in logic.js */
	organizeSemesters: function () {
		// for the first semester displayed, start with the in semesterManager.startswith specified semester
		var currentSemesterIndex = semesterManager.semesters.indexOf(semesterManager.startswith);
		// for all six semester ..
		for (var i = 1; i <= 6; i++) {
			// .. build options and select the correct one
			var options = "", selected = "";
			// fill selects with all possible semesters (possible semesters specified in semesterManager.semesters)
			for (var j = 0; j < semesterManager.semesters.length; j++) {
				// check whether the current <option> must be selected
				selected = j === currentSemesterIndex ? " selected" : "";
				options += "<option" + selected + ">" + semesterManager.semesters[j] + "</option>";
			}
			// assume, that there are no breaks while studying and go on with the following semester
			currentSemesterIndex += 1;
			$("#selectSemester" + i).append(options);
		}
	},
	/* returns the currently chosen semester for a given course */
	getSemester: function (course) {
		var parent = $("#course-" + course).parent();
		if (parent.attr("id") === undefined) {
			console.log(course);
			console.log(parent);
		}
		if (parent.attr("id").substr(0, 5) === "extra") {
			return -1;
		}
		else if (parent.attr("id").substr(0, 8) === "semester") {
			return parseInt(parent.attr("id").substr(8, 1));
		}
		alert("Shouldnt be here!");
	},
	/* used, when user starts drag'n'dropping courses */
	startSorting: function (event, ui) {
		$(".courses li").knubtip("disable");
	},
	/* used, when user finished drag'n'dropping courses */
	endSorting: function (event, ui) {
		if (frontend.checkPermanently === true) {
			frontend.checkRules();
			frontend.slideMessages();
		}
		$(".courses li").knubtip("enable");
		//frontend.sortPool(event, ui);
	},
	/* used to sort courses pool, ensures that each stack has the same height (frontend.coursesPoolHeight) */
	sortPool : function (event, ui) {
		frontend.adjustPoolHeight();
		var listitems = $("#courses-pool > ul li:not(.hidden)");

		// There can be at most frontend.coursesPoolHeight items in one stack.
		// The following to var's ensure this.
		var currentPool = 1;
		var coursesInCurrentPool = 0;

		// for each listitem
		listitems.each(function (index, listitem) {
			// listitem is li dom element, jquerify it
			listitem = $(listitem);

			// detach it from wherever it is at the moment
			listitem.detach();
			// .. put it in the courses pool taking care of frontend.coursesPoolHeight
			$("#extra" + currentPool).append(listitem);
			coursesInCurrentPool += 1;
			if (coursesInCurrentPool === frontend.coursesPoolHeight) {
				coursesInCurrentPool = 0;
				currentPool += 1;
			}
		});
	},
	/* used to adjust the height of one stack in courses-pool */
	adjustPoolHeight: function () {
		// count all visible courses
		var shownCourses = $("#courses-pool > ul li:not(.hidden)").length;
		// there are seven ul's but try to use the first six only (seventh is there, but normally not used)
		frontend.coursesPoolHeight = Math.ceil(shownCourses / 6);
		// but if showCourses is one more than a multiple of six, avoid 'Hurenkind' and use seventh as well
		//if (shownCourses % 6 === 1)
		//	frontend.coursesPoolHeight = Math.ceil(shownCourses / 6) + 1;
	},
	/* used to display informationen from an array in a nice way, used for tooltips */
	displayArray: function (value) {
		if (Array.isArray(value) && value[0] !== "") {
			return value.join(", ");
		}
		return "<em>Information fehlt</em>";
	},
	/* used to initialize course pool filter with correct selectors */
	initializeFilter: function () {
		// build semester list
		var semesterList = "<ul id='semester-filter'>";
		for (var semester in frontend.filterManager.selectedSemester) {
			if (!frontend.filterManager.selectedSemester.hasOwnProperty(semester)) continue;
			semesterList += "<li class='selected'>" + frontend.filterManager.selectedSemester[semester] + "</li>";
		}
		semesterList += "</ul>";
		semesterList = $(semesterList);

		// build module list
		var moduleList = "<ul id='module-filter'>";
		for (var modul in frontend.filterManager.selectedModule) {
			// only own properties matter
			// if the following line wouldnt be there things like Array.prototype.haveIntersection would also count
			if (!frontend.filterManager.selectedModule.hasOwnProperty(modul)) continue;
			moduleList += "<li class='selected'>" + frontend.filterManager.selectedModule[modul] + "</li>";
		}
		moduleList += "</ul>";
		moduleList = $(moduleList);

		// build vertiefungsgebiete list
		var vertiefungsgebieteList = "<ul id='vertiefungsgebiete-filter'>";
		for (var vertiefungsgebiet in frontend.filterManager.selectedVertiefungsgebiete) {
			if (!frontend.filterManager.selectedVertiefungsgebiete.hasOwnProperty(vertiefungsgebiet)) continue;
			vertiefungsgebieteList += "<li class='selected'>" + frontend.filterManager.selectedVertiefungsgebiete[vertiefungsgebiet] + "</li>";
		}
		vertiefungsgebieteList += "</ul>";
		vertiefungsgebieteList = $(vertiefungsgebieteList);


		// append built ul to correct div
		$("#semester_wahlpflicht").append(semesterList)
		                    .append("<ul id='wahlpflicht-filter'><li class='selected'>Pflicht</li><li class='selected'>Wahl</li></ul>");
		$("#module_vertiefungsgebiete").append(moduleList)
				    .append(vertiefungsgebieteList);
	},
	/* selector for droppables */
	coursesList: ".courses",
	/* when a li has this class it cannot be dragged */
	disabledClass: "disabled",
	/* true, when all error messages are visible in drop down list */
	allMessagesVisible: false,
	/* when true, rules are checked permanently */
	checkPermanently: false,
	/* number of list items in one list in unchosen lists */
	coursesPoolHeight: 8
};

/*
 * here starts real execution
 */
// note: $(function () ...) is the same as $(document).ready(function () ..)
$(function () {
	/* initialize rule manager with function, which returns the currently chosen semester for a specific course */
	ruleManager.init(frontend.getSemester);
	/* apply check routine on button click */
	$("button#check").click(function () {
		frontend.checkRules();
		frontend.slideMessages();
		frontend.checkPermanently = true;
	});

	/* add click handler for slide button to show messages */
	$("#slide-messages").click(function () {
		frontend.allMessagesVisible= !frontend.allMessagesVisible;
		frontend.slideMessages();
	});

	/* initialize <select>'s with correct semesters from logic (see logic.js) */
	frontend.organizeSemesters();

	/* initialize filter with correct settings */
	frontend.initializeFilter();

	/* apply jquery drag'n'dropping */
	$(frontend.coursesList).sortable({
		connectWith: frontend.coursesList,		// specifies lists where li's can be dropped
		placeholder: "placeholder-highlight",		// css class for placeholder when drag'n dropping
		cancel: "." + frontend.disabledClass,		// elements matching this selector cannot be dropped
		update: frontend.sortPool,			// raised, when there was a change while sorting
		start: frontend.startSorting,			// raised, when sorting starts
		stop: frontend.endSorting			// raised, when sorting is finished
	}).disableSelection();					// disableSelection makes text selection impossible

	/*
	 * Information:
	 * var data is imported from data.js
	 * It is an object containing all relevant informationen about courses.
	 */

	// for each course in data
	for (var e in data) {
		if (!data.hasOwnProperty(e)) continue;
		// build list item and associated .info for tooltip
		var course = data[e];
		var courseInfo = 	"<div class='info'>" +
					"<h3>" + course['nameLV'] + "</h3>" +
					"<div>" +
					"<table>" +
					"<tr><td>Modul</td><td>" + frontend.displayArray(course['modul']) + "</td></tr>" +
					"<tr><td>Dozent/en</td><td>" + frontend.displayArray(course['dozent'])+ "</td></tr>" + 
					"<tr><td>Credit Points</td><td>" + course['cp'] + " Leistungspunkte</td></tr>" +
					"<tr><td>Lehrform</td><td>" + frontend.displayArray(course['lehrform']) + "</td></tr>" + 
					"<tr><td>Vertiefungsgebiet/e</td><td>" + frontend.displayArray(course['vertiefung']) + "</td></tr>" +
					"</table>" +
					"</div>" +
					"</div>";
		var oneliner = "";
		// if item contains no newline break, apply specific css class (which sets line-height higher, so text is vertically aligned)
		if (course['kurz'].indexOf("<br />") === -1) {
			oneliner = " class='oneliner'";
		}
		var html = $("<li" + oneliner + " id='course-" + e + "'>" + course['kurz'] + "<button>ⴲ</button>" + courseInfo + "</li>");
		// now the element has been created, decide where to put it on the page
		// if it is not recommended for a specific semester ..
		if (course['empfohlen'] === "") {
			// .. put it in the courses pool
			// for now, putting in the first ul is ok, because whole courses-pool will be rearranged afterwards
			$("#extra1").append(html);
		}
		// if it is recommended for a specific semester ..
		else {
			// .. just put it there.
			$("#semester" + course['empfohlen']).append(html);
		}
	}
	// until now, all courses are in the first ul. now adjust pool height and sort pool.
	frontend.sortPool();

	/* apply click routine for buttons which disable possibility to drag it */
	$(".courses li button").click(function () {
		$(this).parent().toggleClass("disabled"); 	// disable list element, when button in list element is clicked
	});


	var filtering = false;
	/* apply filter routine on filter-button-div click */
	$("#filter-button").click(function () {
		if (filtering) {
			$(this).children("h2").text("Filter");
			$("#filter").animate({ width: '0' }, 250);
		}
		else {
			$(this).children("h2").text("Fertig");
			$("#filter").animate({ width: '100%' }, 250);
		}
		filtering = !filtering;
	});
	
	/* initialize tooltips for all courses */
	$(".courses li").knubtip("init");			// activate tooltip for li elements (see jquery.knubtip.js)

	/* initialize selectables for filter div */
	$("#filter-options ul").knubselect({
		// change is raised when the selection changed
		change: function (selected, id) {
			// TODO: Filter when dropped to #courses-pool.
			var key;
			// according to the ul, where the selection change happened, update selected
			if (id === "semester-filter") {
				frontend.filterManager.selectedSemester = selected;
			} else if (id === "wahlpflicht-filter") {
				frontend.filterManager.selectedWahlpflicht = selected;
			} else if (id === "module-filter") {
				frontend.filterManager.selectedModule = selected;
			} else if (id === "vertiefungsgebiete-filter") {
				frontend.filterManager.selectedVertiefungsgebiete = selected;
			}

			$("#courses-pool > ul li").each(function () {
				// .slice(7) to remove foregoing "course-" from id
				key = $(this).attr("id").slice(7);

				var show = frontend.filterManager.checkSemester(key) && frontend.filterManager.checkWahlpflicht(key) &&
					   frontend.filterManager.checkModule(key) && frontend.filterManager.checkVertiefungsgebiete(key);
				if (show === false) {
					$(this).addClass("hidden");
				}
				else {
					$(this).removeClass("hidden");
				}
			});
			frontend.sortPool();
		}
	});
});
