var assert = require('chai').assert;
var CronParser = require('../dist/cronstrue').CronParser;

describe('CronParser', function() {
  describe('parse', function () {
    it('should parse 5 part cron', function () {
      assert.equal(new CronParser("* * * * *").parse().length, 7);
    });

    it('should parse 6 part cron with year', function () {
      assert.equal(new CronParser("* * * * * 2015").parse()[6], "2015");
      assert.equal(new CronParser("* * * * * 2015").parse()[0], "");
    });

    it('should parse 6 part cron with year', function () {
      assert.equal(new CronParser("* * * * * 2015").parse()[6], "2015");
      assert.equal(new CronParser("* * * * * 2015").parse()[0], "");
    });

    it('should blow up if expression is crap', function () {
      assert.throws(function() {new CronParser("sdlksCRAPdlkskl- dds").parse()}, 'Expression only has 2 parts.  At least 5 part are required.');
    });
  });
});