// The term "#semester-view" refer to the upper list, the list of courses which are currently chosen in a specific semester
// The term "#courses-pool" refers to the lists of courses, that are currently not chosen, so the lower list

"use strict";

var settings = {
	// number of list items in one list in unchosen lists
	coursesPoolHeight: 8
};

var frontend = {
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
		stop: frontend.poolSorting			// raised, when sorting is finished
	}).disableSelection();					// disableSelection makes text selection impossible

	$(".courses li button").click(function () {
		$(this).parent().toggleClass("disabled"); 	// disable list element, when button in list element is clicked
	});

	$("#semester1 li").knubtip();				// activate tooltip for li elements (see jquery.knubtip.js)

	//$("select").sSelect();
});
