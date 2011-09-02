(function ($) {
	"use strict";
	$.fn.knubselect = function (options) {
		var settings = {
			selectClass: "selected",
			change: function (selected, id) {}
		};

		// if options exist, lets merge them with our default settings
		if (options) {
			$.extend(settings, options);
		}

		return this.each(function () {
			$(this).children("li").disableSelection().click(function () {
				$(this).toggleClass(settings.selectClass);
				var selected = [];
				$(this).parent().children(".selected").each(function () {
					selected.push($(this).text());
				});
				settings.change(selected, $(this).parent().attr("id"));
			});
		});
	};
})(jQuery);
