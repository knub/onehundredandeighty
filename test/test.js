var data = require('../js/data.js');
var assert = require('assert');

describe('Data', function() {
    it('should contain PT1', function () {
		assert.equal(data["pt1"].kurz, "PT I");
    });
});
