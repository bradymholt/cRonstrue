"use strict";
var stringUtilities_1 = require('./stringUtilities');
var options_1 = require('./options');
var descriptionTypeEnum_1 = require('./descriptionTypeEnum');
var casingTypeEnum_1 = require('./casingTypeEnum');
var ExpressionDescriptor = (function () {
    function ExpressionDescriptor(expression) {
        this.parsed = false;
        this.expression = expression;
        this.parsed = false;
        this.options = new options_1.default();
        this.text = {
            "EveryMinute": "every minute",
            "EveryHour": "every hour",
            "AnErrorOccuredWhenGeneratingTheExpressionD": "An error occured when generating the expression description.  Check the cron expression syntax.",
            "AtSpace": "At ",
            "EveryMinuteBetweenX0AndX1": "Every minute between {0} and {1}",
            "At": "At",
            "SpaceAnd": " and",
            "EverySecond": "every second",
            "EveryX0Seconds": "every {0} seconds",
            "SecondsX0ThroughX1PastTheMinute": "seconds {0} through {1} past the minute",
            "AtX0SecondsPastTheMinute": "at {0} seconds past the minute",
            "EveryX0Minutes": "every {0} minutes",
            "MinutesX0ThroughX1PastTheHour": "minutes {0} through {1} past the hour",
            "AtX0MinutesPastTheHour": "at {0} minutes past the hour",
            "EveryX0Hours": "every {0} hours",
            "BetweenX0AndX1": "between {0} and {1}",
            "AtX0": "at {0}",
            "ComaEveryDay": ", every day",
            "ComaEveryX0DaysOfTheWeek": ", every {0} days of the week",
            "ComaX0ThroughX1": ", {0} through {1}",
            "First": "first",
            "Second": "second",
            "Third": "third",
            "Forth": "forth",
            "Fifth": "fifth",
            "ComaOnThe": ", on the ",
            "SpaceX0OfTheMonth": " {0} of the month",
            "ComaOnTheLastX0OfTheMonth": ", on the last {0} of the month",
            "ComaOnlyOnX0": ", only on {0}",
            "ComaEveryX0Months": ", every {0} months",
            "ComaOnlyInX0": ", only in {0}",
            "ComaOnTheLastDayOfTheMonth": ", on the last day of the month",
            "ComaOnTheLastWeekdayOfTheMonth": ", on the last weekday of the month",
            "FirstWeekday": "first weekday",
            "WeekdayNearestDayX0": "weekday nearest day {0}",
            "ComaOnTheX0OfTheMonth": ", on the {0} of the month",
            "ComaEveryX0Days": ", every {0} days",
            "ComaBetweenDayX0AndX1OfTheMonth": ", between day {0} and {1} of the month",
            "ComaOnDayX0OfTheMonth": ", on day {0} of the month",
            "SpaceAndSpace": " and ",
            "ComaEveryMinute": ", every minute",
            "ComaEveryHour": ", every hour",
            "ComaEveryX0Years": ", every {0} years",
            "CommaStartingX0": ", starting {0}"
        };
    }
    ExpressionDescriptor.prototype.getDescription = function (type) {
        var description = "";
        try {
            if (!this.parsed) {
            }
            switch (type) {
                case descriptionTypeEnum_1.default.FULL:
                    description = this.getFullDescription();
                    break;
                case descriptionTypeEnum_1.default.TIMEOFDAY:
                    description = this.getTimeOfDayDescription();
                    break;
                case descriptionTypeEnum_1.default.HOURS:
                    description = this.getHoursDescription();
                    break;
                case descriptionTypeEnum_1.default.MINUTES:
                    description = this.getMinutesDescription();
                    break;
                case descriptionTypeEnum_1.default.SECONDS:
                    description = this.getSecondsDescription();
                    break;
                case descriptionTypeEnum_1.default.DAYOFMONTH:
                    description = this.getDayOfMonthDescription();
                    break;
                case descriptionTypeEnum_1.default.MONTH:
                    description = this.getMonthDescription();
                    break;
                case descriptionTypeEnum_1.default.DAYOFWEEK:
                    description = this.getDayOfWeekDescription();
                    break;
                case descriptionTypeEnum_1.default.YEAR:
                    description = this.getYearDescription();
                    break;
                default:
                    description = this.getSecondsDescription();
                    break;
            }
        }
        catch (ex) {
            description = ex.Message;
            throw new Error("error!");
        }
        return description;
    };
    ExpressionDescriptor.prototype.getFullDescription = function () {
        var description;
        try {
            var timeSegment = this.getTimeOfDayDescription();
            var dayOfMonthDesc = this.getDayOfMonthDescription();
            var monthDesc = this.getMonthDescription();
            var dayOfWeekDesc = this.getDayOfWeekDescription();
            var yearDesc = this.getYearDescription();
            description = "" + timeSegment + dayOfMonthDesc + dayOfWeekDesc + monthDesc + yearDesc;
            description = this.transformVerbosity(description, this.options.verbose);
            description = this.transformCase(description, this.options.casingType);
        }
        catch (ex) {
            description = this.text.AnErrorOccuredWhenGeneratingTheExpressionD;
            if (this.options.throwExceptionOnParseError) {
                throw new Error("Invalid format: " + description);
            }
        }
        return description;
    };
    ExpressionDescriptor.prototype.getTimeOfDayDescription = function () {
        return "";
    };
    ExpressionDescriptor.prototype.getHoursDescription = function () {
        return "";
    };
    ExpressionDescriptor.prototype.getMinutesDescription = function () {
        return "";
    };
    ExpressionDescriptor.prototype.getSecondsDescription = function () {
        return "";
    };
    ExpressionDescriptor.prototype.getDayOfMonthDescription = function () {
        return "";
    };
    ExpressionDescriptor.prototype.getMonthDescription = function () {
        return "";
    };
    ExpressionDescriptor.prototype.getDayOfWeekDescription = function () {
        return "";
    };
    ExpressionDescriptor.prototype.getYearDescription = function () {
        return "";
    };
    ExpressionDescriptor.prototype.transformVerbosity = function (description, useVerboseFormat) {
        if (!useVerboseFormat) {
            description = description.replace(this.text.ComaEveryMinute, "");
            description = description.replace(this.text.CommaEveryHour, "");
            description = description.replace(this.text.ComaEveryDay, "");
        }
        return description;
    };
    ExpressionDescriptor.prototype.transformCase = function (description, caseType) {
        switch (caseType) {
            case casingTypeEnum_1.default.SENTENCE:
                description = description.toLocaleUpperCase();
                break;
            case casingTypeEnum_1.default.TITLE:
                description = stringUtilities_1.default.toProperCase(description);
                break;
            default:
                description = description.toLocaleLowerCase();
                break;
        }
        return description;
    };
    return ExpressionDescriptor;
}());
