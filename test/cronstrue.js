"use strict";
var assert = require('chai').assert;
var construe = require('../build/cronstrue');

describe('ExpressionDescriptor', function () {
    describe('every', function () {
        it('* * * * * *', function () {
            assert.equal(construe.toString("* * * * * *"), "Every second");
        });

        it('* * * * *', function () {
            assert.equal(construe.toString("* * * * *"), "Every minute");
        });

        it('*/1 * * * *', function () {
            assert.equal(construe.toString("*/1 * * * *"), "Every minute");
        });

        it('0 0/1 * * * ?', function () {
            assert.equal(construe.toString("0 0/1 * * * ?"), "Every minute");
        });

        it('0 0 * * * ?', function () {
            assert.equal(construe.toString("0 0 * * * ?"), "Every hour");
        });

        it('0 0 0/1 * * ?', function () {
            assert.equal(construe.toString("0 0 0/1 * * ?"), "Every hour");
        });

        it('* * * 3 *', function () {
            assert.equal(construe.toString("* * * 3 *"), "Every minute, only in March");
        });

        it('* * * 3,6 *', function () {
            assert.equal(construe.toString("* * * 3,6 *"), "Every minute, only in March and June");
        });

        it('* * * * * * 2013', function () {
            assert.equal(construe.toString("* * * * * * 2013"), "Every second, only in 2013");
        });

        it('* * * * * 2013', function () {
            assert.equal(construe.toString("* * * * * 2013"), "Every minute, only in 2013");
        });

        it('* * * * * 2013,2014', function () {
            assert.equal(construe.toString("* * * * * 2013,2014"), "Every minute, only in 2013 and 2014");
        });
    });

    describe('interval', function () {
        it('*/45 * * * * *', function () {
            assert.equal(construe.toString("*/45 * * * * *"), "Every 45 seconds");
        });

        it('*/5 * * * *', function () {
            assert.equal(construe.toString("*/5 * * * *"), "Every 5 minutes");
        });

        it('*/10 * * * *', function () {
            assert.equal(construe.toString("*/10 * * * *"), "Every 10 minutes");
        });

        it('0 */5 * * * *', function () {
            assert.equal(construe.toString("0 */5 * * * *"), "Every 5 minutes");
        });
    });

    describe('ranges', function () {
        it('0 23 ? * MON-FRI', function () {
            assert.equal(construe.toString("0 23 ? * MON-FRI"), "At 11:00 PM, Monday through Friday");
        });

        it('30 11 * * 1-5', function () {
            assert.equal(construe.toString("30 11 * * 1-5"), "At 11:30 AM, Monday through Friday");
        });

        it('0-10 11 * * *', function () {
            assert.equal(construe.toString("0-10 11 * * *"), "Every minute between 11:00 AM and 11:10 AM");
        });

        it('23 12 * JAN-MAR *', function () {
            assert.equal(construe.toString("23 12 * JAN-MAR *"), "At 12:23 PM, January through March");
        });

        it('23 12 * JAN-FEB *', function () {
            assert.equal(construe.toString("23 12 * JAN-FEB *"), "At 12:23 PM, January through February");
        });
    });

    describe('at', function () {
        it('30 11 * * *', function () {
            assert.equal(construe.toString("30 11 * * *"), "At 11:30 AM");
        });

        it('23 12 * * SUN', function () {
            assert.equal(construe.toString("23 12 * * SUN"), "At 12:23 PM, only on Sunday");
        });

        it('30 02 14 * * *', function () {
            assert.equal(construe.toString("30 02 14 * * *"), "At 02:02:30 PM");
        });

        it('0 0 6 1/1 * ? ?', function () {
            assert.equal(construe.toString("0 0 6 1/1 * ?"), "At 06:00 AM");
        });

        it('0 5 0/1 * * ?', function () {
            assert.equal(construe.toString("0 5 0/1 * * ?"), "At 5 minutes past the hour");
        });

        it('46 9 * * 1', function () {
            assert.equal(construe.toString("46 9 * * 1"), "At 09:46 AM, only on Monday");
        });

        it('23 12 15 * *', function () {
            assert.equal(construe.toString("23 12 15 * *"), "At 12:23 PM, on day 15 of the month");
        });

        it('23 12 * JAN *', function () {
            assert.equal(construe.toString("23 12 * JAN *"), "At 12:23 PM, only in January");
        });

        it('23 12 ? JAN *', function () {
            assert.equal(construe.toString("23 12 ? JAN *"), "At 12:23 PM, only in January");
        });

        it('0 7 * * * (trailing space)', function () {
            assert.equal(construe.toString("0 7 * * * "), "At 07:00 AM");
        });

        it('30 14,16 * * *', function () {
            assert.equal(construe.toString("30 14,16 * * *"), "At 02:30 PM and 04:30 PM");
        });

        it('30 6,14,16 * * *', function () {
            assert.equal(construe.toString("30 6,14,16 * * *"), "At 06:30 AM, 02:30 PM and 04:30 PM");
        });
    });

    describe('weekday', function () {
        it('* * LW * *', function () {
            assert.equal(construe.toString("* * LW * *"), "Every minute, on the last weekday of the month");
        });

        it('* * WL * *', function () {
            assert.equal(construe.toString("* * WL * *"), "Every minute, on the last weekday of the month");
        });

        it('* * 1W * *', function () {
            assert.equal(construe.toString("* * 1W * *"), "Every minute, on the first weekday of the month");
        });

        it('* * 13W * *', function () {
            assert.equal(construe.toString("* * 13W * *"), "Every minute, on the weekday nearest day 13 of the month");
        });

        it('* * W1 * *', function () {
            assert.equal(construe.toString("* * W1 * *"), "Every minute, on the first weekday of the month");
        });

        it('* * 5W * *', function () {
            assert.equal(construe.toString("* * 5W * *"), "Every minute, on the weekday nearest day 5 of the month");
        });

        it('* * W5 * *', function () {
            assert.equal(construe.toString("* * W5 * *"), "Every minute, on the weekday nearest day 5 of the month");
        });
    });

    describe('last', function () {
        it('* * * * 4L', function () {
            assert.equal(construe.toString("* * * * 4L"), "Every minute, on the last Thursday of the month");
        });

        it('*/5 * L JAN *', function () {
            assert.equal(construe.toString("*/5 * L JAN *"), "Every 5 minutes, on the last day of the month, only in January");
        });
    });

    describe('DayOfWeekStartIndexZero=false', function () {
        it('23 12 * * 1#2', function () {
            assert.equal(construe.toString("23 12 * * 1#2", { dayOfWeekStartIndexZero: false }), "At 12:23 PM, on the second Sunday of the month");
        });

        it('* * * ? * 2-6/2', function () {
            assert.equal(construe.toString("* * * ? * 2-6/2", { dayOfWeekStartIndexZero: false }), "Every second, every 2 days of the week, Monday through Friday");
        });
    });

    describe('non-trival expressions', function () {


        it('*/5 15 * * MON-FRI', function () {
            assert.equal(construe.toString("*/5 15 * * MON-FRI"), "Every 5 minutes, at 03:00 PM, Monday through Friday");
        });

        it('* * * * MON#3', function () {
            assert.equal(construe.toString("* * * * MON#3"), "Every minute, on the third Monday of the month");
        });

        it('5-10 * * * * *', function () {
            assert.equal(construe.toString("5-10 * * * * *"), "Seconds 5 through 10 past the minute");
        });

        it('5-10 30-35 10-12 * * *', function () {
            assert.equal(construe.toString("5-10 30-35 10-12 * * *"), "Seconds 5 through 10 past the minute, minutes 30 through 35 past the hour, between 10:00 AM and 12:59 PM");
        });

        it('30 */5 * * * *', function () {
            assert.equal(construe.toString("30 */5 * * * *"), "At 30 seconds past the minute, every 5 minutes");
        });

        it('10 0/5 * * * ?', function () {
            assert.equal(construe.toString("10 0/5 * * * ?"), "At 10 seconds past the minute, every 5 minutes");
        });

        it('2-59/3 1,9,22 11-26 1-6 ?', function () {
            assert.equal(construe.toString("2-59/3 1,9,22 11-26 1-6 ?"), "Every 3 minutes, minutes 2 through 59 past the hour, at 01:00 AM, 09:00 AM, and 10:00 PM, between day 11 and 26 of the month, January through June");
        });

        it('23 12 * JAN-FEB * 2013-2014', function () {
            assert.equal(construe.toString("23 12 * JAN-FEB * 2013-2014"), "At 12:23 PM, January through February, 2013 through 2014");
        });

        it('23 12 * JAN-MAR * 2013-2015', function () {
            assert.equal(construe.toString("23 12 * JAN-MAR * 2013-2015"), "At 12:23 PM, January through March, 2013 through 2015");
        });

        it('0 0/30 8-9 5,20 * ?', function () {
            assert.equal(construe.toString("0 0/30 8-9 5,20 * ?"), "Every 30 minutes, between 08:00 AM and 09:59 AM, on day 5 and 20 of the month");
        });

        it('23 12 * * SUN#2', function () {
            assert.equal(construe.toString("23 12 * * SUN#2"), "At 12:23 PM, on the second Sunday of the month");
        });

        it('0 25 7-19/8 ? * *', function () {
            assert.equal(construe.toString("0 25 7-19/8 ? * *"), "At 25 minutes past the hour, every 8 hours, between 07:00 AM and 07:59 PM");
        });

        it('0 25 7-20/13 ? * *', function () {
            assert.equal(construe.toString("0 25 7-20/13 ? * *"), "At 25 minutes past the hour, every 13 hours, between 07:00 AM and 08:59 PM");
        });

        it('0 0 8 1/3 * ? *', function () {
            assert.equal(construe.toString("0 0 8 1/3 * ? *"), "At 08:00 AM, every 3 days");
        });

        it('0 15 10 ? * */3', function () {
            assert.equal(construe.toString("0 15 10 ? * */3"), "At 10:15 AM, every 3 days of the week");
        });

        it('* * * ? * 1-5/2', function () {
            assert.equal(construe.toString("* * * ? * 1-5/2"), "Every second, every 2 days of the week, Monday through Friday");
        });

        it('0 5 7 2 1/3 ? *', function () {
            assert.equal(construe.toString("0 5 7 2 1/3 ? *"), "At 07:05 AM, on day 2 of the month, every 3 months");
        });

        it('0 15 6 1 1 ? 1/2', function () {
            assert.equal(construe.toString("0 15 6 1 1 ? 1/2"), "At 06:15 AM, on day 1 of the month, only in January, every 2 years");
        });

        it('2,4-5 1 * * *', function () {
            assert.equal(construe.toString("2,4-5 1 * * *"), "At 2 and 4 through 5 minutes past the hour, at 01:00 AM");
        });

        it('2,26-28 18 * * *', function () {
            assert.equal(construe.toString("2,26-28 18 * * *"), "At 2 and 26 through 28 minutes past the hour, at 06:00 PM");
        });

        it('5/30 * * * * ?', function () {
            assert.equal(construe.toString("5/30 * * * * ?"), "Every 30 seconds, starting at 5 seconds past the minute");
        });

        it('0 5/30 * * * ?', function () {
            assert.equal(construe.toString("0 5/30 * * * ?"), "Every 30 minutes, starting at 5 minutes past the hour");
        });

        it('* * 5/8 * * ?', function () {
            assert.equal(construe.toString("* * 5/8 * * ?"), "Every second, every 8 hours, starting at 05:00 AM");
        });

        it('0 5 7 2/3 * ? *', function () {
            assert.equal(construe.toString("0 5 7 2/3 * ? *"), "At 07:05 AM, every 3 days, starting on day 2 of the month");
        });

        it('0 5 7 ? 3/2 ? *', function () {
            assert.equal(construe.toString("0 5 7 ? 3/2 ? *"), "At 07:05 AM, every 2 months, March through December");
        });

        it('0 5 7 ? * 2/3 *', function () {
            assert.equal(construe.toString("0 5 7 ? * 2/3 *"), "At 07:05 AM, every 3 days of the week, Tuesday through Saturday");
        });

        it('0 5 7 ? * ? 2016/4', function () {
            assert.equal(construe.toString("0 5 7 ? * ? 2016/4"), "At 07:05 AM, every 4 years, 2016 through 9999");
        });

        it('0 30 10-13 ? * WED,FRI', function () {
            assert.equal(construe.toString("0 30 10-13 ? * WED,FRI"), "At 30 minutes past the hour, between 10:00 AM and 01:59 PM, only on Wednesday and Friday");
        });

        it('0 00 10 ? * MON-THU,SUN *', function () {
            assert.equal(construe.toString("0 00 10 ? * MON-THU,SUN *"), "At 10:00 AM, only on Monday through Thursday and Sunday");
        });

        it('0 0 0 1,2,3 * WED,FRI', function () {
            assert.equal(construe.toString("0 0 0 1,2,3 * WED,FRI"), "At 00:00 AM, on day 1, 2, and 3 of the month, only on Wednesday and Friday");
        });

        it('0 2,16 1,8,15,22 * 1,2', function () {
            assert.equal(construe.toString("0 2,16 1,8,15,22 * 1,2"), "At 02:00 AM and 04:00 PM, on day 1, 8, 15, and 22 of the month, only on Monday and Tuesday");
        });
    });























});
