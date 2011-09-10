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
/*
 * Given an arbitrary number of arrays, these function calculates the Cartesian Product
 * Taken from: http://gotochriswest.com/blog/2011/05/02/cartesian-product-of-multiple-arrays/
 *
 * Note: It is very elegant, but hard to grasp at the first moment.
 * Maybe helpful to understand:
 * -	https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/reduce
 * -	https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/call
 * -	https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/foreach
 */
Array.cartesianProduct = function () {
	return Array.prototype.reduce.call(arguments, function(previousValue, currentValue) {
		var ret = [];
		previousValue.forEach(function(previousValue) {
			currentValue.forEach(function(currentValue) {
				ret.push(previousValue.concat([currentValue]));
			});
		});
		return ret;
	}, [[]]);
};


// Not the best implementation, because [1, 2, 1].subsetOf([1, 2, 3]) is true but enough for what we need.
Array.prototype.subsetOf = function (other) {
	for (var i = 0; i < this.length; i += 1) {
		if (other.indexOf(this[i]) === -1)
			return false;
	}
	return true;
};
