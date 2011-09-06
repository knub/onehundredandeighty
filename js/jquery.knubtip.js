(function ($) {
	"use strict";
	$.fn.knubtip = function (method) {
		var settings = {
			'duration'	: 200,
			'wait-time'	: 1200
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
					var cssClass = "knubtip" + i.toString();
					info.attr("class", cssClass + " info");
					$(this).data("knubtip", { info: "." + cssClass });
					$(this).data("enabled", true);
					i += 1;

					$(this).mousemove(function () {
						// save references, because setTimeout forces context change (this refering to DOMWINDOW then)
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
							var cssClass = $this.data('knubtip')['info'];
							// position of the current li
							var offset = $this.offset();
							// if displayed tooltip would still be in viewport ..
							if (offset.top + $this.height() + 5 + $(cssClass).height() < $(window).height() + $(window).scrollTop()) {
								// .. display it

								// calculate left offset, so that center of li matches center of div
								// li :            |     c     |                       (c for center of block element)
								// div: |                c               |
								//      ^: calculate this left-offset
								// the formula comes from the following main idea:
								// li-left + li-width / 2 = div-left + div-width / 2 (the center of the li element is the same like the center of the div element)
								var left = offset.left + ($this.width() - $(".info").width()) / 2;
								$(cssClass).css({ top: offset.top + $this.height() + 5, left: left }).fadeIn(settings['duration']);
							}
						}, settings['wait-time']);
					}).mouseout(function () {
						clearTimeout(timer);
						var cssClass = $(this).data('knubtip')['info'];
						$(cssClass).fadeOut(settings['duration']);
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
