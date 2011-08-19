// The term "#semester-view" refer to the upper list, the list of courses which are currently chosen in a specific semester
// The term "#courses-pool" refers to the lists of courses, that are currently not chosen, so the lower list


var settings = {
	// number of list items in one list in unchosen lists
	coursesPoolHeight: 8
};

var frontend = {
	poolSorting : function (event, ui) {
			"use strict";
			var pool = $("#courses-pool");
			var course = pool.children().first();
			// while (course.hasNext()) - loop as long as there is another sibling
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
		}
};
$(function() {
	$(".courses").sortable({
		connectWith: ".courses",		// specifies lists where li's can be dropped
		placeholder: "placeholder-highlight",	// css class for placeholder when drag'n dropping
		cancel: ".disabled",
		change: frontend.poolSorting,
		stop: frontend.poolSorting
	}).disableSelection();				// disableSelection makes text selection impossible

	$(".courses li a").click(function () {
		$(this).parent().toggleClass("disabled"); 
	});

	$("#semester1 li").knubtip();

	$("#head a").click(function () {
		$(this).hide();
		$(this).parent().find("select").show();
	});
});
