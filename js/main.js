// The term "#semester-view" refer to the upper list, the list of courses which are currently chosen in a specific semester
// The term "#courses-pool" refers to the lists of courses, that are currently not chosen, so the lower list

"use strict";

var settings = {
	// number of list items in one list in unchosen lists
	coursesPoolHeight: 8
};

var frontend = {
	startSorting: function(event, ui) {
			$("#semester1 li").knubtip("disable");
		},
	endSorting: function(event, ui) {
			$("#semester1 li").knubtip("enable");
			frontend.poolSorting(event, ui);
		},
	poolSorting : function (event, ui) {
			"use strict";
			var pool = $("#courses-pool");
			var course = pool.children().first();
			// "while (course.hasNext())" - loop as long as there is another sibling
			while (course.get(0).tagName !== "BR") {
				if (course.children().size() > settings["coursesPoolHeight"]) {
					var last = course.children().last();
					last.detach();
					course.next().prepend(last);
				}
				else if (course.children().size() < settings["coursesPoolHeight"] && course.next().get(0).tagName !== "BR") {
					var nextFirst = course.next().children().first();
					nextFirst.detach();
					course.append(nextFirst);
				}
				course = course.next();
			}
		},
	coursesList: ".courses",
	disabledClass: "disabled"
};
$(function() {
	$(".courses").sortable({
		connectWith: frontend.coursesList,		// specifies lists where li's can be dropped
		placeholder: "placeholder-highlight",		// css class for placeholder when drag'n dropping
		cancel: "." + frontend.disabledClass,		// elements matching this selector cannot be dropped
		change: frontend.poolSorting,			// raised, when there was a change while sorting
		start: frontend.startSorting,			// raised, when sorting starts
		stop: frontend.endSorting			// raised, when sorting is finished
	}).disableSelection();					// disableSelection makes text selection impossible

	// data is imported from data.js

	var currentPool = 1;
	var coursesInCurrentPool = 0;
	for (var e in data) {
		var course = data[e];
		var courseInfo = 	"<div class='info'>" +
					"<h3>" + course['nameLV'] + "</h3>" +
					"<div>" +
					course['modul'] + "<br />" +
					course['dozent'].join(", ") + "<br />" + 
					course['cp'] + " Leistungspunkte<br />" +
					course['lehrform'].join(" + ") + "<br />" + 
					course['vertiefung'].join(", ") + "<br />" +
					"</div>" +
					"</div>";
		var oneliner = "";
		if (e.indexOf("<br />") === -1) {
			oneliner = " class='oneliner'";
		}
		var html = $("<li" + oneliner + ">" + e + "<button>ⴲ</button>" + courseInfo + "</li>");
		if (course['empfohlen'] === "") {
			$("#extra" + currentPool).append(html);
			coursesInCurrentPool += 1;
			if (coursesInCurrentPool === settings.coursesPoolHeight) {
				coursesInCurrentPool = 0;
				currentPool += 1;
			}
		}
		else {
			$("#semester" + course['empfohlen']).append(html);
		}
	}

	$(".courses li button").click(function () {
		$(this).parent().toggleClass("disabled"); 	// disable list element, when button in list element is clicked
	});

	$(".courses li").knubtip("init");			// activate tooltip for li elements (see jquery.knubtip.js)
});
