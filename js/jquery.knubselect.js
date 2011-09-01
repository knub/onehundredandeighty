(function ($) {
	"use strict";
	$.fn.knubselect = function (options) {
		var settings = {
			selectClass: "selected",
			change: function (selected) {
				for (var s in selected)
					alert(selected[s]);
			}
		};

		// if options exist, lets merge them with our default settings
		if (options) {
			$.extend(settings, options);
		}

		var $ul = this;

		return this.each(function () {
			$ul.children("li").disableSelection().click(function () {
				$(this).toggleClass(settings.selectClass);
				var selected = [];
				$(this).parent().children().filter(".selected").each(function () {
					selected.push($(this).text());
				});
				/* TODO: selected Dinger ermitteln */
				settings.change(selected);
			});
		});
	};
})(jQuery);
