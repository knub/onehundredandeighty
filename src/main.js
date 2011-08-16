// The term "chosen list" and thinks like that refer to the upper list, the list of courses which are currently chosen
// Accordingly, the term "unchosen list" refers to the lists of courses, that are currently not chosen, so the lower list

var settings = {
	// number of list items in one list in unchosen lists
	"unchosen-list-height": 8
};

$(function() {
	$(".courses").sortable({
		connectWith: ".courses",		// specifies lists where li's can be dropped
		placeholder: "placeholder-highlight",	// css class for placeholder when drag'n dropping
		stop: function (event, ui) {
			"use strict";
			var e, courses;
			e = ui.item;
			// check if list under mouse is list of unchosen courses
			if (e.parent().parent().attr("id") === "extra-courses") {
				courses = e.parent();
				if (courses.children().size() > settings["unchosen-list-height"]) {
					var last = courses.children().last();
					alert(last.html());
					// TODO: move list items, so that there are no more than settings["unchosen-list-height"] items in one list
				}
			}
		},
		over: function(event, ui) {
			;
		}
	}).disableSelection();				// disableSelection makes text selection impossible
});
