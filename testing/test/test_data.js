const expect = require('chai').expect;

describe('data.js', function() {
    const data = require('../../js/data.js');
    it('has more than 50 LVs', () => {
        expect(Object.keys(data).length).to.be.greaterThan(50);
    });
    describe('required LVs', () => {
        const requiredLVs = ['gds', 'mathematik1','mod1', 'pt1', 'wirtschaft', 'mathematik2', 'mod2', 'mathematik2', 'recht1', 'bs', 'recht2', 'swa', 'ti1', 'swt1', 'ti2'];
        for (let i = 0; i < requiredLVs.length; i++) {
            const lv = requiredLVs[i];
            it('contains ' + lv, () => {
                expect(data[lv]).to.not.be.undefined;
            });
        }
    });
});
