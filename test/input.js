describe('input cartesian product', function() {
    var foo = require('../js/helper.js');
    var assert = require('assert');

    is_same = function(array1, array2){
        return (array1.length == array2.length) && array1.every(function(element, index) {
            return (element.length == array2[index].length) && element.every(function(innerelement, innerindex) {
                return innerelement === array2[index][innerindex];})  
     });}

    it('|A1| undefined und |A2| undefined', function () {
        var array = new Array();
        try{
            var cartesianProduct = Array.cartesianProduct(undefined, undefined);
            assert(false);
        } catch(err){
            assert(true);
        }
    });

    it('|A1| undefined und |A2| >= 0', function(){
        var array = new Array('A');
        try{
            var cartesianProduct = Array.cartesianProduct(undefined, array);
            assert(false);
        } catch(err){
            assert(true);
        }
    })

    it('|A1| >= 0 und |A2| undefined', function(){
        var array = new Array('A');
        try{
            var cartesianProduct = Array.cartesianProduct(array, undefined);
            assert(false);
        } catch(err){
            assert(true);
        }
    })


    it('|A1| = 0 und |A2| = 0', function(){
        var array = new Array();
        var cartesianProduct = Array.cartesianProduct(array, array);
        assert(is_same(cartesianProduct, []));
    });

    it('|A1| = 1 und |A2| = 0', function(){
        var array = new Array();
        var array2 = new Array('A');
        var cartesianProduct = Array.cartesianProduct(array2, array);
        assert(is_same(cartesianProduct, []));
    });

    it('|A1| >= 2 und |A2| = 0', function(){
        var array = new Array();
        var array2 = new Array('A', 'B');
        var cartesianProduct = Array.cartesianProduct(array2, array);
        assert(is_same(cartesianProduct, []));
    });

    it('|A1| = 0 und |A2| = 1', function(){
        var array = [];
        var array2 = [1];
        var cartesianProduct = Array.cartesianProduct(array, array2);
        assert(is_same(cartesianProduct, []));
    });


    it('|A1| = 1 und |A2| = 1', function(){
        var array = [1];
        var array2 = [1];
        var cartesianProduct = Array.cartesianProduct(array, array2);
        assert(is_same(cartesianProduct, [[1,1]]));
    });

    it('|A1| >= 2 und |A2| = 1', function(){
        var array = [1, 2, 3];
        var array2 = [4];
        var cartesianProduct = Array.cartesianProduct(array, array2);
        assert(is_same(cartesianProduct, [[1,4], [2,4], [3,4]]));
    });

    it('|A1| = 0 und |A2| >=  2', function(){
        var array = [];
        var array2 = [1,2];
        var cartesianProduct = Array.cartesianProduct(array, array2);
        assert(is_same(cartesianProduct, []));
    });

    it('|A1| = 1 und |A2| >=  2', function(){
        var array = [3];
        var array2 = [1,2];
        var cartesianProduct = Array.cartesianProduct(array, array2);
        assert(is_same(cartesianProduct, [[3, 1], [3, 2]]));
    });

    it('|A1| >= 2 und |A2| >=  2', function(){
        var array = [3, 4];
        var array2 = [1,2];
        var cartesianProduct = Array.cartesianProduct(array, array2);
        assert(is_same(cartesianProduct, [[3, 1], [3, 2], [4,1], [4,2]]));
    });
});
