(function ($) {
	"use strict";
	$.fn.knubtip = function (method) {
		var settings = {
			'duration'	: 200,
			'wait-time'	: 1000
		};

		// counter, counts tooltips so an unique id (for the div) can be built with this number
		var i = 0;
		// timer will save what setTimeout returns
		var timer;

		var methods = {
			init: function (options) {
				// if options exist, lets merge them with our default settings
				if (options) {
					$.extend(settings, options);
				}
				return this.each(function () {
					// detach element from li's and append to body (needed for free absolute positioning)
					var info = $(this).children(".info");
					info.detach();
					$("body").append(info);
					// save, which div belonged to which li via css-class
					var tooltipDivSelector = "knubtip" + i.toString();
					info.attr("class", tooltipDivSelector + " info");
					$(this).data("knubtip", { info: "." + tooltipDivSelector });
					$(this).data("enabled", true);
					i += 1;

					$(this).mousemove(function () {
						// save references, because setTimeout forces context change (this refering to DOMWINDOW then)
						// $this now refers to the jquerified-element (e. g. li element) for which the tooltip shall be displayed
						var $this = $(this);
						clearTimeout(timer);
						timer = setTimeout(function () {
							// only display tooltip, if whole plugin is enabled
							if($this.data('enabled') !== true)
								return;
							// only display tooltip, if element is not disabled (is this useful? - think about it)
							if($this.hasClass("disabled"))
								return;
							// get corresponding div
							var tooltipDivSelector = $this.data('knubtip')['info'];
							// position of the current li
							var offset = $this.offset();
							//
							// now we have to search for the best place to display the tooltip in relation to the current element
							// below, over, right, left?

							// first we test, we can display it below the item
							// offset.top: start at the position of the top-right corner of the element
							// $this.outerHeight: add the height (including padding and border) of the element, so now we are at the bottom left corner of the element
							// add a little offset, so we do not stick right to the element's corner
							// $(tooltipDivSelector).outerHeight: add the height of the tooltip to be displayed, so now we are at the bottom left corner of the tooltip
							// if this is less than bottom of the viewport (top of viewport + height of viewport) ..
							if (offset.top + $this.outerHeight() + 5 + $(tooltipDivSelector).outerHeight() < $(window).scrollTop() + $(window).height()) {
								// .. display it

								// calculate left offset, so that center of li matches center of div
								// li :            |     c     |                       (c for center of block element)
								// div: |                c               |
								//      ^: calculate this left-offset
								// the formula comes from the following main idea:
								// li-left + li-width / 2 = div-left + div-width / 2 (the center of the li element is the same like the center of the div element)
								var left = offset.left + ($this.width() - $(".info").width()) / 2;
								if (left <= $(window).scrollLeft()) left = $(window).scrollLeft();
								else if (left > $(window).scrollLeft() + $(window).width() - $(".info").outerWidth()) left = $(window).scrollLeft() + $(window).width() - $(".info").outerWidth();
								$(tooltipDivSelector).css({ top: offset.top + $this.outerHeight() + 5, left: left }).fadeIn(settings['duration']);
							}
							// now we test, whether it can be displayed over the element
							// same procedure as before, with slightly different logic
							else if ($(window).scrollTop() < offset.top - 5 - $(tooltipDivSelector).outerHeight()) {
								var left = offset.left + ($this.width() - $(".info").width()) / 2;
								if (left <= $(window).scrollLeft()) left = $(window).scrollLeft();
								else if (left > $(window).scrollLeft() + $(window).width() - $(".info").outerWidth()) left = $(window).scrollLeft() + $(window).width() - $(".info").outerWidth();
								$(tooltipDivSelector).css({ top: offset.top - 5 - $(tooltipDivSelector).outerHeight(), left: left }).fadeIn(settings['duration']);
							}
							// now we test, whether we can display it right next to the element
							// logic is the same as in the first case, left replaced by top, and height replaced by width
							else if (offset.left + $this.outerWidth() + 5 + $(tooltipDivSelector).outerWidth() < $(window).scrollLeft() + $(window).width()) {
								var top = offset.top + ($this.outerHeight() - $(".info").outerHeight()) / 2;
								if (top <= $(window).scrollTop()) top = $(window).scrollTop();
								else if (top > $(window).scrollTop() + $(window).height() - $(".info").outerHeight() - 30) top = $(window).scrollTop() + $(window).height() - $(".info").outerHeight() - 30;
								$(tooltipDivSelector).css({ top: top, left: offset.left + $this.outerWidth() + 5}).fadeIn(settings['duration']);
							}
							// and finally test, whether it can be displayed on the element's left
							else if ($(window).scrollLeft() < offset.left - 5 - $(tooltipDivSelector).outerWidth()) {
								var top = offset.top + ($this.outerHeight() - $(".info").outerHeight()) / 2;
								if (top <= $(window).scrollTop()) top = $(window).scrollTop();
								else if (top > $(window).scrollTop() + $(window).height() - $(".info").outerHeight() - 30) top = $(window).scrollTop() + $(window).height() - $(".info").outerHeight() - 30;
								$(tooltipDivSelector).css({ top: top, left: offset.left - 5 - $(tooltipDivSelector).outerWidth()}).fadeIn(settings['duration']);
							}
							else {
								// else, display it below, as in the first case
								var left = offset.left + ($this.width() - $(".info").width()) / 2;
								if (left <= $(window).scrollLeft()) left = $(window).scrollLeft();
								else if (left > $(window).scrollLeft() + $(window).width() - $(".info").outerWidth()) left = $(window).scrollLeft() + $(window).width() - $(".info").outerWidth();
								$(tooltipDivSelector).css({ top: offset.top + $this.outerHeight() + 5, left: left }).fadeIn(settings['duration']);
							}
						}, settings['wait-time']);
					}).mouseout(function () {
						clearTimeout(timer);
						var tooltipDivSelector = $(this).data('knubtip')['info'];
						$(tooltipDivSelector).fadeOut(settings['duration']);
					});
				});
			},
			enable: function () {
				this.each(function () {
					$(this).data("enabled", true);
				});
			},
			disable: function () {
				this.each(function () {
					$(this).data("enabled", false);
				});
			}
		};

		// when the window is scrolled, stop the timer
		// fixes a bug that even though document is scrolled, the tooltip appears (because there is no mouse move obviously)
		$(window).scroll(function () {
			clearTimeout(timer);
		});

		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.tooltip');
		}
	};
})(jQuery);
