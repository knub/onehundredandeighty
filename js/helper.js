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
        function F() {}
        F.prototype = o;
        return new F();
    };
})();


if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/) {
    'use strict';
    if (this === null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }

    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}



/*
 * Given an arbitrary number of arrays, these function calculates the Cartesian Product
 * Taken from: http://gotochriswest.com/blog/2011/05/02/cartesian-product-of-multiple-arrays/
 *
 * Note: It is very elegant, but hard to grasp at the first moment.
 * Maybe helpful to understand:
 * -    https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/reduce
 * -    https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/call
 * -    https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/foreach
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


// specifically for arrays sorted using the same order
Array.prototype.subsetOfSorted = function (other) {
    var j = 0;
    for (var i = 0; i < this.length; i += 1) {
        while (this[i] !== other[j]) {
            ++j;
            if (j >= other.length) {
                return false
            }
        }
    }
    return true;
};

/* returns an array's last element */
Array.prototype.last = function () {
    return this[this.length - 1];
};

(function() {
    function sum(a, b) {
        return a + b;
    }
    Array.prototype.sumElements = function () {
        return this.reduce(sum, 0);
    };
})();

// shallow equality check
Array.prototype.equals = function(other) {
    if (this.length !== other.length) {
        return false;
    }
    for(var i = 0; i < this.length; i++) {
        if (this[i] !== other[i]) {
            return false;
        }
    }
    return true;
};