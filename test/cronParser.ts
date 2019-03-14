import chai = require("chai");
import { CronParser } from "../src/cronParser";
let assert = chai.assert;

describe("CronParser", function() {
  describe("parse", function() {
    it("should parse 5 part cron", function() {
      assert.equal(new CronParser("* * * * *").parse().length, 7);
    });

    it("should parse 6 part cron with year", function() {
      assert.equal(new CronParser("* * * * * 2015").parse()[6], "2015");
      assert.equal(new CronParser("* * * * * 2015").parse()[0], "");
    });

    it("should parse 6 part cron with year", function() {
      assert.equal(new CronParser("* * * * * 2015").parse()[6], "2015");
      assert.equal(new CronParser("* * * * * 2015").parse()[0], "");
    });

    it("should error if expression is not a cron schedule", function() {
      assert.throws(function() {
        new CronParser("sdlksCRAPdlkskl- dds").parse();
      }, "Expression has only 2 parts. At least 5 parts are required.");
    });

    it("should error if DOW part is not valid", function() {
      assert.throws(function() {
        new CronParser("* * * * MO").parse();
      }, `DOW part contains invalid values: 'MO'`);
    });

    it("should parse cron with multiple spaces between parts", function() {
      assert.equal(new CronParser("30  2  *    *  *").parse().length, 7);
      assert.equal(new CronParser("* *  * *  * 2015").parse().length, 7);
    });
  });
});
