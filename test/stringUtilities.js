var assert = require('chai').assert;
var StringUtilities = require('../dist/cronstrue').StringUtilities;

describe('StringUtilities', function () {
    describe('format', function () {
        it('should format a string with no replacements', function () {
            assert.equal(StringUtilities.format("Test"), "Test");
        });

        it('should format a string with one replacement', function () {
            assert.equal(StringUtilities.format("Test %s", "one"), "Test one");
        });

        it('should format a string with multiple replacements', function () {
            assert.equal(StringUtilities.format("Test %s %s %s", "one", "two", "three"), "Test one two three");
        });
    });

    describe('toProperCase', function () {
        it('should properly case a sentence', function () {
            assert.equal(StringUtilities.toProperCase("this is a test, only a test.  the case should be proper."), "This Is A Test, Only A Test.  The Case Should Be Proper.");
        });
    });
});