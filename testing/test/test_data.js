const expect = require('chai').expect;

describe('data.js', function() {
    const data = require('../../js/data.js');
    it('has more than 50 LVs', () => {
        expect(Object.keys(data).length).to.be.greaterThan(50);
    });
});
