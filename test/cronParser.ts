import "mocha";
import { assert } from "chai";
import { CronParser } from "../src/cronParser";

describe("CronParser", function () {
  describe("parse", function () {
    it("should parse 5 part cron", function () {
      assert.equal(new CronParser("* * * * *").parse().length, 7);
    });

    it("should parse 6 part cron with year", function () {
      assert.equal(new CronParser("* * * * * 2015").parse()[6], "2015");
      assert.equal(new CronParser("* * * * * 2015").parse()[0], "");
      assert.equal(new CronParser("0/5 8-17 ? * MON-FRI *").parse()[2], "8-17");
      assert.equal(new CronParser("0 8 1 * ? *").parse()[2], "8");
    });

    it("should error if expression is not a cron schedule", function () {
      assert.throws(function () {
        new CronParser("sdlksCRAPdlkskl- dds").parse();
      }, "Expression has only 2 parts. At least 5 parts are required.");
    });

    it("should error if DOW part is not valid", function () {
      assert.throws(function () {
        new CronParser("* * * * MO").parse();
      }, `Expression contains invalid values: 'MO'`);
    });

    it("does not allow unexpected characters or statements in any part", function () {
      const maliciousStatement = "\nDROP\tDATABASE\tusers;";

      for (let i = 0; i <= 6; i++) {
        const cleanCronParts = ["*", "*", "*", "*", "*", "*", "*"];
        cleanCronParts[i] = maliciousStatement;
        const cronToTest = cleanCronParts.join(" ");
        assert.throws(function () {
          new CronParser(cronToTest).parse();
        }, `Expression contains invalid values:`);
      }

    });

    it("should parse cron with multiple spaces between parts", function () {
      assert.equal(new CronParser("30  2  *    *  *").parse().length, 7);
      assert.equal(new CronParser("* *  * *  * 2015").parse().length, 7);
    });

    it("should parse cron with multiple commas", function () {
      assert.equal(new CronParser("5-45/10,*/5,9 * * * *").parse().length, 7);
    });

    it("should normalize zero-based months without changing step values", function () {
      const cases = [
        ["*/10", "*/10"],
        ["*/11", "*/11"],
        ["2/11", "3-12/11"],
        ["1/2", "2-12/2"],
        ["0/2", "*/2"],
        ["0/10", "*/10"],
        ["0-11/10", "1-12/10"],
        ["0,10,11", "1,11,12"],
        ["JAN/10", "1-12/10"],
      ];

      for (const [month, expected] of cases) {
        assert.equal(new CronParser(`30 * * ${month} *`, true, true).parse()[4], expected);
      }
    });

    it("should preserve one-based month step normalization", function () {
      const cases = [
        ["*/10", "*/10"],
        ["1/2", "*/2"],
        ["1/10", "*/10"],
        ["2/11", "2-12/11"],
        ["1-12/10", "1-12/10"],
      ];

      for (const [month, expected] of cases) {
        assert.equal(new CronParser(`30 * * ${month} *`).parse()[4], expected);
      }
    });

    it("dayOfWeek specified as comma", function () {
      assert.equal(new CronParser("*/5 * * * * ,").parse()[5], "*");
    });

    it("dayOfWeek dangling comma", function () {
      assert.equal(new CronParser("*/5 * * * * ,2").parse()[5], "2");
    });

    it("should parse cron @ expression", function () {
      assert.equal(new CronParser("@weekly").parse().length, 7);
    });

    it("should parse @reboot expression", function () {
      const parsedReboot = new CronParser("@reboot").parse();
      assert.equal(parsedReboot.length, 7);
      assert.equal(parsedReboot[0], "@reboot");
    });
  });
});
