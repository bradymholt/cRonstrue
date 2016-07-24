var assert = require('chai').assert;
var ExpressionDescriptor = require('../build/expressionDescriptor').ExpressionDescriptor;

describe('ExpressionDescriptor', function () {
    it('should handle * * * * ', function () {
        assert.equal(ExpressionDescriptor.getDescription("* * * * *"), "Every minute");
    });
});