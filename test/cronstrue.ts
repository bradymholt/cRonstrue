import "mocha";
import chai = require("chai");
import cronstrue from "../src/cronstrue";
let assert = chai.assert;

describe("Cronstrue", function () {
  describe("every", function () {
    it("* * * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every second");
    });

    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every minute");
    });

    it("0 * * * * (verbose)", function () {
      assert.equal(cronstrue.toString("0 * * * *", { verbose: true }), "Every hour, every day");
    });

    it("* * * * * (verbose)", function () {
      assert.equal(cronstrue.toString("* * * * *", { verbose: true }), "Every minute, every hour, every day");
    });

    it("*/1 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every minute");
    });

    it("*/5 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every 5th minutes");
    });

    it("*/45 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every 45th minutes");
    });

    it("0 0/1 * * * ?", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every minute");
    });

    it("0 0 * * * ?", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every hour");
    });

    it("0 0 0/1 * * ?", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every hour");
    });

    it("* * * 3 *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every minute, only in March");
    });

    it("* * * 3,6 *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every minute, only in March and June");
    });

    it("* * * * * * 2013", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every second, only in 2013");
    });

    it("* * * * * 2013", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every minute, only in 2013");
    });

    it("* * * * * 2013,2014", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every minute, only in 2013 and 2014");
    });
  });

  describe("interval", function () {
    it("*/45 * * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every 45th seconds");
    });

    it("*/5 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every 5th minutes");
    });

    it("*/10 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every 10th minutes");
    });

    it("0 */5 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every 5th minutes");
    });

    it("0 */51 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every 51st minutes");
    });

    it("0 9-17 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every hour, between 09:00 AM and 05:59 PM");
    });

    it("0 * ? * 2/1 *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every hour, Tuesday through Saturday");
    });

    it("0 * ? * 1/1", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every hour, Monday through Saturday");
    });

    it("0 * ? * 2/1", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every hour, Tuesday through Saturday");
    });

    it("0 52 13 ? * 3/1", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 01:52 PM, Wednesday through Saturday");
    });
  });

  describe("ranges", function () {
    it("0 23 ? * MON-FRI", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 11:00 PM, Monday through Friday");
    });

    it("30 11 * * 1-5", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 11:30 AM, Monday through Friday");
    });

    it("0-10 11 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every minute between 11:00 AM and 11:10 AM");
    });

    it("23 12 * Jan-Mar *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 12:23 PM, January through March");
    });

    it("23 12 * JAN-FEB *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 12:23 PM, January through February");
    });

    it("1 1,3-4 * * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 1 minutes past the hour, at 01:00 AM and 03:00 AM through 04:59 AM"
      );
    });

    it("* 0 */4 * * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Every second, at 0 minutes past the hour, every 4th hours"
      );
    });

    it("*/10 0 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every 10th seconds, at 0 minutes past the hour");
    });

    it("* 0 0 * * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Every second, at 0 minutes past the hour, between 12:00 AM and 12:59 AM"
      );
    });

    it("* 0 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every minute, between 12:00 AM and 12:59 AM");
    });

    it("* 0 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every second, at 0 minutes past the hour");
    });
  });

  describe("at", function () {
    it("30 11 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 11:30 AM");
    });

    it("23 12 * * SUN", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 12:23 PM, only on Sunday");
    });

    it("30 02 14 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 02:02:30 PM");
    });

    it("0 0 6 1/1 * ?", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 06:00 AM");
    });

    it("0 5 0/1 * * ?", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 5 minutes past the hour");
    });

    it("46 9 * * 1", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 09:46 AM, only on Monday");
    });

    it("46 9 * * 7", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 09:46 AM, only on Sunday",
        "7 should mean Sunday"
      );
    });

    it("23 12 15 * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 12:23 PM, on day 15 of the month");
    });

    it("23 12 * JAN *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 12:23 PM, only in January");
    });

    it("23 12 ? JAN *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 12:23 PM, only in January");
    });

    it("0 7 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 07:00 AM", "trailing space");
    });

    it("30 14,16 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 02:30 PM and 04:30 PM");
    });

    it("30 6,14,16 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 06:30 AM, 02:30 PM and 04:30 PM");
    });

    it("0 * 31 * 1", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every hour, on day 31 of the month, and on Monday");
    });
  });

  describe("weekday", function () {
    it("* * LW * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every minute, on the last weekday of the month");
    });

    it("* * WL * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every minute, on the last weekday of the month");
    });

    it("* * 1W * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every minute, on the first weekday of the month");
    });

    it("* * 13W * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Every minute, on the weekday nearest day 13 of the month"
      );
    });

    it("* * W1 * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every minute, on the first weekday of the month");
    });

    it("* * 5W * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Every minute, on the weekday nearest day 5 of the month"
      );
    });

    it("* * W5 * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Every minute, on the weekday nearest day 5 of the month"
      );
    });
  });

  describe("last", function () {
    it("* * * * 4L", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every minute, on the last Thursday of the month");
    });

    it("*/5 * L JAN *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Every 5th minutes, on the last day of the month, only in January"
      );
    });

    it("0 20 15,L * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 08:00 PM, on day 15 and the last day of the month"
      );
    });

    it("0 20 1-10,20-L * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 08:00 PM, on day 1 through 10 and 20 through the last day of the month"
      );
    });

    it("0 15 10 * * L", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 10:15 AM, only on Saturday");
    });

    it("0 15 10 L * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 10:15 AM, on the last day of the month");
    });

    it("0 0 0 L-5 * ?", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 12:00 AM, 5 days before the last day of the month"
      );
    });
  });

  describe("dayOfWeekStartIndexZero=false", function () {
    it("23 12 * * 1#2", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { dayOfWeekStartIndexZero: false }),
        "At 12:23 PM, on the second Sunday of the month"
      );
    });

    it("* * * ? * 2-6/2", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { dayOfWeekStartIndexZero: false }),
        "Every second, every 2nd days of the week, Monday through Friday"
      );
    });

    it("* * * ? * 7", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { dayOfWeekStartIndexZero: false }),
        "Every second, only on Saturday"
      );
    });

    it("* * * ? * 1,2,3,4,5", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { dayOfWeekStartIndexZero: false }),
        "Every second, only on Sunday, Monday, Tuesday, Wednesday, and Thursday"
      );
    });

    it("0 * ? * 1/1", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { dayOfWeekStartIndexZero: false }),
        "Every hour, Sunday through Saturday"
      );
    });

    it("0 * ? * 2/1", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { dayOfWeekStartIndexZero: false }),
        "Every hour, Monday through Saturday"
      );
    });
  });

  describe("monthStartIndexZero=true", function () {
    it("* * * 7 *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { monthStartIndexZero: true }),
        "Every minute, only in August"
      );
    });

    it("30 * * 6-8 *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { monthStartIndexZero: true }),
        "At 30 minutes past the hour, July through September"
      );
    });

    it("30 * * 1-10/2 *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { monthStartIndexZero: true }),
        "At 30 minutes past the hour, every 2nd months, February through November"
      );
    });

    it("30 * * 4,5,6 *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { monthStartIndexZero: true }),
        "At 30 minutes past the hour, only in May, June, and July"
      );
    });

    it("30 * * JAN *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { monthStartIndexZero: true }),
        "At 30 minutes past the hour, only in January"
      );
    });
  });

  describe("non-trivial expressions", function () {
    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Every 5th minutes, between 03:00 PM and 03:59 PM, Monday through Friday"
      );
    });

    it("* * * * MON#3", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Every minute, on the third Monday of the month");
    });

    it("5-10 * * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Seconds 5 through 10 past the minute");
    });

    it("5-10 30-35 10-12 * * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Seconds 5 through 10 past the minute, minutes 30 through 35 past the hour, between 10:00 AM and 12:59 PM"
      );
    });

    it("30 */5 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 30 seconds past the minute, every 5th minutes");
    });

    it("10 0/5 * * * ?", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 10 seconds past the minute, every 5th minutes");
    });

    it("2-59/3 1,9,22 11-26 1-6 ?", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Every 3rd minutes, minutes 2 through 59 past the hour, at 01:00 AM, 09:00 AM, and 10:00 PM, between day 11 and 26 of the month, January through June"
      );
    });

    it("23 12 * JAN-FEB * 2013-2014", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 12:23 PM, January through February, 2013 through 2014"
      );
    });

    it("23 12 * JAN-MAR * 2013-2015", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 12:23 PM, January through March, 2013 through 2015"
      );
    });

    it("12-50 0-10 6 * * * 2022", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Seconds 12 through 50 past the minute, minutes 0 through 10 past the hour, at 06:00 AM, only in 2022"
      );
    });

    it("0 0/30 8-9 5,20 * ?", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Every 30th minutes, between 08:00 AM and 09:59 AM, on day 5 and 20 of the month"
      );
    });

    it("23 12 * * SUN#2", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 12:23 PM, on the second Sunday of the month");
    });

    it("0 25 7-19/8 ? * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 25 minutes past the hour, every 8th hours, between 07:00 AM and 07:59 PM"
      );
    });

    it("0 25 7-20/13 ? * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 25 minutes past the hour, every 13th hours, between 07:00 AM and 08:59 PM"
      );
    });

    it("0 0 8 1/3 * ? *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 08:00 AM, every 3rd days");
    });

    it("0 15 10 ? * */3", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 10:15 AM, every 3rd days of the week");
    });

    it("* * * ? * 1-5/2", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Every second, every 2nd days of the week, Monday through Friday"
      );
    });

    it("0 5 7 2 1/3 ? *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 07:05 AM, on day 2 of the month, every 3rd months"
      );
    });

    it("0 15 6 1 1 ? 1/2", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 06:15 AM, on day 1 of the month, only in January, every 2 years"
      );
    });

    it("2,4-5 1 * * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 2 and 4 through 5 minutes past the hour, at 01:00 AM"
      );
    });

    it("2,26-28 18 * * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 2 and 26 through 28 minutes past the hour, at 06:00 PM"
      );
    });

    it("5/30 * * * * ?", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Every 30th seconds, starting at 5 seconds past the minute"
      );
    });

    it("0 5/30 * * * ?", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Every 30th minutes, starting at 5 minutes past the hour"
      );
    });

    it("* * 5/8 * * ?", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Every second, every 8th hours, starting at 05:00 AM"
      );
    });

    it("0 5 7 2/3 * ? *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 07:05 AM, every 3rd days, starting on day 2 of the month"
      );
    });

    it("0 5 7 ? 3/2 ? *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 07:05 AM, every 2nd months, March through December"
      );
    });

    it("0 5 7 ? * 2/3 *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 07:05 AM, every 3rd days of the week, Tuesday through Saturday"
      );
    });

    it("0 5 7 ? * ? 2016/4", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "At 07:05 AM, every 4 years, 2016 through 9999");
    });

    it("0 30 10-13 ? * wed,FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 30 minutes past the hour, between 10:00 AM and 01:59 PM, only on Wednesday and Friday"
      );
    });

    it("0 00 10 ? * MON-THU,SUN *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 10:00 AM, only on Monday through Thursday and Sunday"
      );
    });

    it("0 0 0 1,2,3 * WED,FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 12:00 AM, on day 1, 2, and 3 of the month, and on Wednesday and Friday"
      );
    });

    it("0 2,16 1,8,15,22 * 1,2", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 02:00 AM and 04:00 PM, on day 1, 8, 15, and 22 of the month, and on Monday and Tuesday"
      );
    });

    it("0 */4,6 * * * ", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 0 minutes past the hour, every 4th hours and at 06:00 AM"
      );
    });

    it("5 30 6,14,16 5 * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "At 5 seconds past the minute, at 30 minutes past the hour, at 06:00 AM, 02:00 PM, and 04:00 PM, on day 5 of the month"
      );
    });

    it("0-20/3 9 * * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Every 3rd minutes, minutes 0 through 20 past the hour, between 09:00 AM and 09:59 AM"
      );
    });

    it("5-45/10,*/5,9 * * * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string),
        "Every 10th minutes, minutes 5 through 45 past the hour, every 5th minutes, and at 9 minutes past the hour"
      );
    });
  });

  describe("verbose", function () {
    it("30 4 1 * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { verbose: true }),
        "At 04:30 AM, on day 1 of the month"
      );
    });

    it("0 13 * * 1", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { verbose: true }), "At 01:00 PM, only on Monday");
    });
  });

  describe("errors", function () {
    it("second out of range", function () {
      assert.throws(function () {
        cronstrue.toString("61 * * * * *");
      }, "seconds part must be >= 0 and <= 59");
    });

    it("minute out of range", function () {
      assert.throws(function () {
        cronstrue.toString("0 -1 * * * *");
      }, "minutes part must be >= 0 and <= 59");
    });

    it("hour out of range", function () {
      assert.throws(function () {
        cronstrue.toString("0 0 24 * * *");
      }, "hours part must be >= 0 and <= 23");
    });

    it("dayOfMonth out of range", function () {
      assert.throws(function () {
        cronstrue.toString("0 0 0 32 * *");
      }, "DOM part must be >= 1 and <= 31");
    });

    it("month out of range", function () {
      assert.throws(function () {
        cronstrue.toString("0 0 0 1 13 *", { monthStartIndexZero: false });
      }, "month part must be >= 1 and <= 12");

      assert.throws(function () {
        cronstrue.toString("0 0 0 1 13 *", { monthStartIndexZero: true });
      }, "month part must be >= 0 and <= 11");
    });

    it("dayOfWeek out of range", function () {
      assert.throws(function () {
        cronstrue.toString("0 0 0 1 12 8", { dayOfWeekStartIndexZero: true });
      }, "DOW part must be >= 0 and <= 6");

      assert.throws(function () {
        cronstrue.toString("0 0 0 1 12 8", { dayOfWeekStartIndexZero: false });
      }, "DOW part must be >= 1 and <= 7");
    });

    it("garbage expression", function () {
      assert.throws(function () {
        cronstrue.toString("sdlksldksldksd");
      }, "Error: Expression has only 1 part. At least 5 parts are required.");
    });

    it("empty expression", function () {
      assert.throws(function () {
        cronstrue.toString("");
      }, "Error: Expression is empty");
    });

    it("null expression", function () {
      assert.throws(function () {
        cronstrue.toString(null as any as string);
      }, "Error: Expression is empty");
    });

    it("undefined expression", function () {
      assert.throws(function () {
        cronstrue.toString("");
      }, "Error: Expression is empty");
    });

    it("'W' list is invalid", function () {
      assert.throws(function () {
        cronstrue.toString("0 30 14 1W,15W * ? *");
      }, "Error: The 'W' character can be specified only when the day-of-month is a single day, not a range or list of days.");
    });

    it("garbage expression with option (throwExceptionOnParseError = false)", function () {
      assert.equal(
        cronstrue.toString("garbage", { throwExceptionOnParseError: false }),
        "An error occured when generating the expression description.  Check the cron expression syntax."
      );
    });
  });
});
