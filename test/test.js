var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});


var assert = require('assert');
// Create a test suite (group) called Math
describe('Math', function() {
    // Test One: A string explanation of what we're testing
    it('should test if 3*3 = 9', function(){
      // Our actual test: 3*3 SHOULD EQUAL 9
      assert.equal(9, 3*3);
    });
    // Test Two: A string explanation of what we're testing
    it('should test if (3-4)*8 = -8', function(){
      // Our actual test: (3-4)*8 SHOULD EQUAL -8
      assert.equal(-8, (3-4)*8);
    });
});