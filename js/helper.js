/* use strict-mode provided by ecma-script5, see http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/ for details */
"use strict";

/*
 * checks, whether two arrays (this and parameter that) have elements in common
 * true, when this is the case
 */
Array.prototype.haveIntersection = function (that) {
	var intersect = false;
	for (var i in this) {
		for (var j in that) {
			if (this[i] === that[j] && this.hasOwnProperty(i) && that.hasOwnProperty(j)) {
				intersect = true;
				break;
			}
		}
		if (intersect) break;
	}
	return intersect;
};
/*
 * create Object.create method, if not already existing
 * mainly neccessary because of Opera, which does not implement it yet
 */
(function () {
	if (Object.create)
		return;
	Object.create = function (o) {
		if (arguments.length > 1) {
			throw new Error('Object.create implementation only accepts the first parameter.');
		}
		function F() {};
		F.prototype = o;
		return new F();
	};
})();
