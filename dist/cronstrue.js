(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cronstrue", [], factory);
	else if(typeof exports === 'object')
		exports["cronstrue"] = factory();
	else
		root["cronstrue"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var stringUtilities_1 = __webpack_require__(3);
var cronParser_1 = __webpack_require__(1);
var ExpressionDescriptor = (function () {
    function ExpressionDescriptor(expression, options) {
        this.expression = expression;
        this.options = options;
        this.expressionParts = new Array(5);
        if (ExpressionDescriptor.locales[options.locale]) {
            this.i18n = ExpressionDescriptor.locales[options.locale];
        }
        else {
            console.warn("Locale '" + options.locale + "' could not be found; falling back to 'en'.");
            this.i18n = ExpressionDescriptor.locales["en"];
        }
        if (options.use24HourTimeFormat === undefined) {
            options.use24HourTimeFormat = this.i18n.use24HourTimeFormatByDefault();
        }
    }
    ExpressionDescriptor.toString = function (expression, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.throwExceptionOnParseError, throwExceptionOnParseError = _c === void 0 ? true : _c, _d = _b.verbose, verbose = _d === void 0 ? false : _d, _e = _b.dayOfWeekStartIndexZero, dayOfWeekStartIndexZero = _e === void 0 ? true : _e, use24HourTimeFormat = _b.use24HourTimeFormat, _f = _b.locale, locale = _f === void 0 ? "en" : _f;
        var options = {
            throwExceptionOnParseError: throwExceptionOnParseError,
            verbose: verbose,
            dayOfWeekStartIndexZero: dayOfWeekStartIndexZero,
            use24HourTimeFormat: use24HourTimeFormat,
            locale: locale
        };
        var descripter = new ExpressionDescriptor(expression, options);
        return descripter.getFullDescription();
    };
    ExpressionDescriptor.initialize = function (localesLoader) {
        ExpressionDescriptor.specialCharacters = ["/", "-", ",", "*"];
        localesLoader.load(ExpressionDescriptor.locales);
    };
    ExpressionDescriptor.prototype.getFullDescription = function () {
        var description = "";
        try {
            var parser = new cronParser_1.CronParser(this.expression, this.options.dayOfWeekStartIndexZero);
            this.expressionParts = parser.parse();
            var timeSegment = this.getTimeOfDayDescription();
            var dayOfMonthDesc = this.getDayOfMonthDescription();
            var monthDesc = this.getMonthDescription();
            var dayOfWeekDesc = this.getDayOfWeekDescription();
            var yearDesc = this.getYearDescription();
            description +=
                timeSegment + dayOfMonthDesc + dayOfWeekDesc + monthDesc + yearDesc;
            description = this.transformVerbosity(description, this.options.verbose);
            description =
                description.charAt(0).toLocaleUpperCase() + description.substr(1);
        }
        catch (ex) {
            if (!this.options.throwExceptionOnParseError) {
                description = this.i18n.anErrorOccuredWhenGeneratingTheExpressionD();
            }
            else {
                throw "" + ex;
            }
        }
        return description;
    };
    ExpressionDescriptor.prototype.getTimeOfDayDescription = function () {
        var secondsExpression = this.expressionParts[0];
        var minuteExpression = this.expressionParts[1];
        var hourExpression = this.expressionParts[2];
        var description = "";
        if (!stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters) &&
            !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters) &&
            !stringUtilities_1.StringUtilities.containsAny(secondsExpression, ExpressionDescriptor.specialCharacters)) {
            description +=
                this.i18n.atSpace() +
                    this.formatTime(hourExpression, minuteExpression, secondsExpression);
        }
        else if (minuteExpression.indexOf("-") > -1 &&
            !(minuteExpression.indexOf(",") > -1) &&
            !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters)) {
            var minuteParts = minuteExpression.split("-");
            description += stringUtilities_1.StringUtilities.format(this.i18n.everyMinutebetweenX0AndX1(), this.formatTime(hourExpression, minuteParts[0], ""), this.formatTime(hourExpression, minuteParts[1], ""));
        }
        else if (hourExpression.indexOf(",") > -1 &&
            hourExpression.indexOf("-") == -1 &&
            !stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters)) {
            var hourParts = hourExpression.split(",");
            description += this.i18n.at();
            for (var i = 0; i < hourParts.length; i++) {
                description += " ";
                description += this.formatTime(hourParts[i], minuteExpression, "");
                if (i < hourParts.length - 2) {
                    description += ",";
                }
                if (i == hourParts.length - 2) {
                    description += this.i18n.spaceAnd();
                }
            }
        }
        else {
            var secondsDescription = this.getSecondsDescription();
            var minutesDescription = this.getMinutesDescription();
            var hoursDescription = this.getHoursDescription();
            description += secondsDescription;
            if (description.length > 0) {
                description += ", ";
            }
            description += minutesDescription;
            if (description.length > 0) {
                description += ", ";
            }
            description += hoursDescription;
        }
        return description;
    };
    ExpressionDescriptor.prototype.getSecondsDescription = function () {
        var _this = this;
        var description = this.getSegmentDescription(this.expressionParts[0], this.i18n.everysecond(), function (s) {
            return s;
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Seconds(), s);
        }, function (s) {
            return _this.i18n.secondsX0ThroughX1PastTheMinute();
        }, function (s) {
            return s == "0"
                ? ""
                : parseInt(s) < 20
                    ? _this.i18n.atX0SecondsPastTheMinute()
                    : _this.i18n.atX0SecondsPastTheMinuteGt20() ||
                        _this.i18n.atX0SecondsPastTheMinute();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getMinutesDescription = function () {
        var _this = this;
        var description = this.getSegmentDescription(this.expressionParts[1], this.i18n.everyMinute(), function (s) {
            return s;
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Minutes(), s);
        }, function (s) {
            return _this.i18n.minutesX0ThroughX1PastTheHour();
        }, function (s) {
            try {
                return s == "0"
                    ? ""
                    : parseInt(s) < 20
                        ? _this.i18n.atX0MinutesPastTheHour()
                        : _this.i18n.atX0MinutesPastTheHourGt20() ||
                            _this.i18n.atX0MinutesPastTheHour();
            }
            catch (e) {
                return _this.i18n.atX0MinutesPastTheHour();
            }
        });
        return description;
    };
    ExpressionDescriptor.prototype.getHoursDescription = function () {
        var _this = this;
        var expression = this.expressionParts[2];
        var description = this.getSegmentDescription(expression, this.i18n.everyHour(), function (s) {
            return _this.formatTime(s, "0", "");
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Hours(), s);
        }, function (s) {
            return _this.i18n.betweenX0AndX1();
        }, function (s) {
            return _this.i18n.atX0();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getDayOfWeekDescription = function () {
        var _this = this;
        var daysOfWeekNames = this.i18n.daysOfTheWeek();
        var description = null;
        if (this.expressionParts[5] == "*") {
            description = "";
        }
        else {
            description = this.getSegmentDescription(this.expressionParts[5], this.i18n.commaEveryDay(), function (s) {
                var exp = s;
                if (s.indexOf("#") > -1) {
                    exp = s.substr(0, s.indexOf("#"));
                }
                else if (s.indexOf("L") > -1) {
                    exp = exp.replace("L", "");
                }
                return daysOfWeekNames[parseInt(exp)];
            }, function (s) {
                return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0daysOfTheWeek(), s);
            }, function (s) {
                return _this.i18n.commaX0ThroughX1();
            }, function (s) {
                var format = null;
                if (s.indexOf("#") > -1) {
                    var dayOfWeekOfMonthNumber = s.substring(s.indexOf("#") + 1);
                    var dayOfWeekOfMonthDescription = null;
                    switch (dayOfWeekOfMonthNumber) {
                        case "1":
                            dayOfWeekOfMonthDescription = _this.i18n.first();
                            break;
                        case "2":
                            dayOfWeekOfMonthDescription = _this.i18n.second();
                            break;
                        case "3":
                            dayOfWeekOfMonthDescription = _this.i18n.third();
                            break;
                        case "4":
                            dayOfWeekOfMonthDescription = _this.i18n.fourth();
                            break;
                        case "5":
                            dayOfWeekOfMonthDescription = _this.i18n.fifth();
                            break;
                    }
                    format =
                        _this.i18n.commaOnThe() +
                            dayOfWeekOfMonthDescription +
                            _this.i18n.spaceX0OfTheMonth();
                }
                else if (s.indexOf("L") > -1) {
                    format = _this.i18n.commaOnTheLastX0OfTheMonth();
                }
                else {
                    format = _this.i18n.commaOnlyOnX0();
                }
                return format;
            });
        }
        return description;
    };
    ExpressionDescriptor.prototype.getMonthDescription = function () {
        var _this = this;
        var monthNames = this.i18n.monthsOfTheYear();
        var description = this.getSegmentDescription(this.expressionParts[4], "", function (s) {
            return monthNames[parseInt(s) - 1];
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0Months(), s);
        }, function (s) {
            return (_this.i18n.commaMonthX0ThroughMonthX1() || _this.i18n.commaX0ThroughX1());
        }, function (s) {
            return _this.i18n.commaOnlyInX0();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getDayOfMonthDescription = function () {
        var _this = this;
        var description = null;
        var expression = this.expressionParts[3];
        switch (expression) {
            case "L":
                description = this.i18n.commaOnTheLastDayOfTheMonth();
                break;
            case "WL":
            case "LW":
                description = this.i18n.commaOnTheLastWeekdayOfTheMonth();
                break;
            default:
                var matches = expression.match(/(\d{1,2}W)|(W\d{1,2})/);
                if (matches) {
                    var dayNumber = parseInt(matches[0].replace("W", ""));
                    var dayString = dayNumber == 1
                        ? this.i18n.firstWeekday()
                        : stringUtilities_1.StringUtilities.format(this.i18n.weekdayNearestDayX0(), dayNumber.toString());
                    description = stringUtilities_1.StringUtilities.format(this.i18n.commaOnTheX0OfTheMonth(), dayString);
                    break;
                }
                else {
                    description = this.getSegmentDescription(expression, this.i18n.commaEveryDay(), function (s) {
                        return s == "L" ? _this.i18n.lastDay() : s;
                    }, function (s) {
                        return s == "1"
                            ? _this.i18n.commaEveryDay()
                            : _this.i18n.commaEveryX0Days();
                    }, function (s) {
                        return _this.i18n.commaBetweenDayX0AndX1OfTheMonth();
                    }, function (s) {
                        return _this.i18n.commaOnDayX0OfTheMonth();
                    });
                    break;
                }
        }
        return description;
    };
    ExpressionDescriptor.prototype.getYearDescription = function () {
        var _this = this;
        var description = this.getSegmentDescription(this.expressionParts[6], "", function (s) {
            return /^\d+$/.test(s)
                ? new Date(parseInt(s), 1).getFullYear().toString()
                : s;
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0Years(), s);
        }, function (s) {
            return (_this.i18n.commaYearX0ThroughYearX1() || _this.i18n.commaX0ThroughX1());
        }, function (s) {
            return _this.i18n.commaOnlyInX0();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getSegmentDescription = function (expression, allDescription, getSingleItemDescription, getIntervalDescriptionFormat, getBetweenDescriptionFormat, getDescriptionFormat) {
        var _this = this;
        var description = null;
        if (!expression) {
            description = "";
        }
        else if (expression === "*") {
            description = allDescription;
        }
        else if (!stringUtilities_1.StringUtilities.containsAny(expression, ["/", "-", ","])) {
            description = stringUtilities_1.StringUtilities.format(getDescriptionFormat(expression), getSingleItemDescription(expression));
        }
        else if (expression.indexOf("/") > -1) {
            var segments = expression.split("/");
            description = stringUtilities_1.StringUtilities.format(getIntervalDescriptionFormat(segments[1]), getSingleItemDescription(segments[1]));
            if (segments[0].indexOf("-") > -1) {
                var betweenSegmentDescription = this.generateBetweenSegmentDescription(segments[0], getBetweenDescriptionFormat, getSingleItemDescription);
                if (betweenSegmentDescription.indexOf(", ") != 0) {
                    description += ", ";
                }
                description += betweenSegmentDescription;
            }
            else if (!stringUtilities_1.StringUtilities.containsAny(segments[0], ["*", ","])) {
                var rangeItemDescription = stringUtilities_1.StringUtilities.format(getDescriptionFormat(segments[0]), getSingleItemDescription(segments[0]));
                rangeItemDescription = rangeItemDescription.replace(", ", "");
                description += stringUtilities_1.StringUtilities.format(this.i18n.commaStartingX0(), rangeItemDescription);
            }
        }
        else if (expression.indexOf(",") > -1) {
            var segments = expression.split(",");
            var descriptionContent = "";
            for (var i = 0; i < segments.length; i++) {
                if (i > 0 && segments.length > 2) {
                    descriptionContent += ",";
                    if (i < segments.length - 1) {
                        descriptionContent += " ";
                    }
                }
                if (i > 0 &&
                    segments.length > 1 &&
                    (i == segments.length - 1 || segments.length == 2)) {
                    descriptionContent += this.i18n.spaceAndSpace();
                }
                if (segments[i].indexOf("-") > -1) {
                    var betweenSegmentDescription = this.generateBetweenSegmentDescription(segments[i], function (s) {
                        return _this.i18n.commaX0ThroughX1();
                    }, getSingleItemDescription);
                    betweenSegmentDescription = betweenSegmentDescription.replace(", ", "");
                    descriptionContent += betweenSegmentDescription;
                }
                else {
                    descriptionContent += getSingleItemDescription(segments[i]);
                }
            }
            description = stringUtilities_1.StringUtilities.format(getDescriptionFormat(expression), descriptionContent);
        }
        else if (expression.indexOf("-") > -1) {
            description = this.generateBetweenSegmentDescription(expression, getBetweenDescriptionFormat, getSingleItemDescription);
        }
        return description;
    };
    ExpressionDescriptor.prototype.generateBetweenSegmentDescription = function (betweenExpression, getBetweenDescriptionFormat, getSingleItemDescription) {
        var description = "";
        var betweenSegments = betweenExpression.split("-");
        var betweenSegment1Description = getSingleItemDescription(betweenSegments[0]);
        var betweenSegment2Description = getSingleItemDescription(betweenSegments[1]);
        betweenSegment2Description = betweenSegment2Description.replace(":00", ":59");
        var betweenDescriptionFormat = getBetweenDescriptionFormat(betweenExpression);
        description += stringUtilities_1.StringUtilities.format(betweenDescriptionFormat, betweenSegment1Description, betweenSegment2Description);
        return description;
    };
    ExpressionDescriptor.prototype.formatTime = function (hourExpression, minuteExpression, secondExpression) {
        var hour = parseInt(hourExpression);
        var period = "";
        if (!this.options.use24HourTimeFormat) {
            period = hour >= 12 ? " PM" : " AM";
            if (hour > 12) {
                hour -= 12;
            }
            if (hour === 0) {
                hour = 12;
            }
        }
        var minute = minuteExpression;
        var second = "";
        if (secondExpression) {
            second = ":" + ("00" + secondExpression).substring(secondExpression.length);
        }
        return ("00" + hour.toString()).substring(hour.toString().length) + ":" + ("00" + minute.toString()).substring(minute.toString().length) + second + period;
    };
    ExpressionDescriptor.prototype.transformVerbosity = function (description, useVerboseFormat) {
        if (!useVerboseFormat) {
            description = description.replace(new RegExp(this.i18n.commaEveryMinute(), "g"), "");
            description = description.replace(new RegExp(this.i18n.commaEveryHour(), "g"), "");
            description = description.replace(new RegExp(this.i18n.commaEveryDay(), "g"), "");
        }
        return description;
    };
    ExpressionDescriptor.locales = {};
    return ExpressionDescriptor;
}());
exports.ExpressionDescriptor = ExpressionDescriptor;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CronParser = (function () {
    function CronParser(expression, dayOfWeekStartIndexZero) {
        if (dayOfWeekStartIndexZero === void 0) { dayOfWeekStartIndexZero = true; }
        this.expression = expression;
        this.dayOfWeekStartIndexZero = dayOfWeekStartIndexZero;
    }
    CronParser.prototype.parse = function () {
        var parsed = this.extractParts(this.expression);
        this.normalize(parsed);
        this.validate(parsed);
        return parsed;
    };
    CronParser.prototype.extractParts = function (expression) {
        if (!this.expression) {
            throw new Error("Expression is empty");
        }
        var parsed = expression.trim().split(" ");
        if (parsed.length < 5) {
            throw new Error("Expression has only " + parsed.length + " part" + (parsed.length == 1
                ? ""
                : "s") + ". At least 5 parts are required.");
        }
        else if (parsed.length == 5) {
            parsed.unshift("");
            parsed.push("");
        }
        else if (parsed.length == 6) {
            if (/\d{4}$/.test(parsed[5])) {
                parsed.unshift("");
            }
            else {
                parsed.push("");
            }
        }
        else if (parsed.length > 7) {
            throw new Error("Expression has " + parsed.length + " parts; too many!");
        }
        return parsed;
    };
    CronParser.prototype.normalize = function (expressionParts) {
        var _this = this;
        expressionParts[3] = expressionParts[3].replace("?", "*");
        expressionParts[5] = expressionParts[5].replace("?", "*");
        if (expressionParts[0].indexOf("0/") == 0) {
            expressionParts[0] = expressionParts[0].replace("0/", "*/");
        }
        if (expressionParts[1].indexOf("0/") == 0) {
            expressionParts[1] = expressionParts[1].replace("0/", "*/");
        }
        if (expressionParts[2].indexOf("0/") == 0) {
            expressionParts[2] = expressionParts[2].replace("0/", "*/");
        }
        if (expressionParts[3].indexOf("1/") == 0) {
            expressionParts[3] = expressionParts[3].replace("1/", "*/");
        }
        if (expressionParts[4].indexOf("1/") == 0) {
            expressionParts[4] = expressionParts[4].replace("1/", "*/");
        }
        if (expressionParts[5].indexOf("1/") == 0) {
            expressionParts[5] = expressionParts[5].replace("1/", "*/");
        }
        if (expressionParts[6].indexOf("1/") == 0) {
            expressionParts[6] = expressionParts[6].replace("1/", "*/");
        }
        expressionParts[5] = expressionParts[5].replace(/(^\d)|([^#/\s]\d)/g, function (t) {
            var dowDigits = t.replace(/\D/, "");
            var dowDigitsAdjusted = dowDigits;
            if (_this.dayOfWeekStartIndexZero) {
                if (dowDigits == "7") {
                    dowDigitsAdjusted = "0";
                }
            }
            else {
                dowDigitsAdjusted = (parseInt(dowDigits) - 1).toString();
            }
            return t.replace(dowDigits, dowDigitsAdjusted);
        });
        if (expressionParts[5] == "L") {
            expressionParts[5] = "6";
        }
        if (expressionParts[3] == "?") {
            expressionParts[3] = "*";
        }
        if (expressionParts[3].indexOf("W") > -1 &&
            (expressionParts[3].indexOf(",") > -1 ||
                expressionParts[3].indexOf("-") > -1)) {
            throw new Error("The 'W' character can be specified only when the day-of-month is a single day, not a range or list of days.");
        }
        var days = {
            SUN: 0,
            MON: 1,
            TUE: 2,
            WED: 3,
            THU: 4,
            FRI: 5,
            SAT: 6
        };
        for (var day in days) {
            expressionParts[5] = expressionParts[5].replace(new RegExp(day, "g"), days[day].toString());
        }
        var months = {
            JAN: 1,
            FEB: 2,
            MAR: 3,
            APR: 4,
            MAY: 5,
            JUN: 6,
            JUL: 7,
            AUG: 8,
            SEP: 9,
            OCT: 10,
            NOV: 11,
            DEC: 12
        };
        for (var month in months) {
            expressionParts[4] = expressionParts[4].replace(new RegExp(month, "g"), months[month].toString());
        }
        if (expressionParts[0] == "0") {
            expressionParts[0] = "";
        }
        for (var i = 0; i < expressionParts.length; i++) {
            if (expressionParts[i] == "*/1") {
                expressionParts[i] = "*";
            }
            if (expressionParts[i].indexOf("/") > -1 &&
                !/^\*|\-|\,/.test(expressionParts[i])) {
                var stepRangeThrough = null;
                switch (i) {
                    case 4:
                        stepRangeThrough = "12";
                        break;
                    case 5:
                        stepRangeThrough = "6";
                        break;
                    case 6:
                        stepRangeThrough = "9999";
                        break;
                    default:
                        stepRangeThrough = null;
                        break;
                }
                if (stepRangeThrough != null) {
                    var parts = expressionParts[i].split("/");
                    expressionParts[i] = parts[0] + "-" + stepRangeThrough + "/" + parts[1];
                }
            }
        }
    };
    CronParser.prototype.validate = function (parsed) {
        this.assertNoInvalidCharacters("DOW", parsed[5]);
        this.assertNoInvalidCharacters("DOM", parsed[3]);
    };
    CronParser.prototype.assertNoInvalidCharacters = function (partDescription, expression) {
        var invalidChars = expression.match(/[A-KM-VX-Z]+/gi);
        if (invalidChars && invalidChars.length) {
            throw new Error(partDescription + " part contains invalid values: '" + invalidChars.toString() + "'");
        }
    };
    return CronParser;
}());
exports.CronParser = CronParser;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var en = (function () {
    function en() {
    }
    en.prototype.atX0SecondsPastTheMinuteGt20 = function () { return null; };
    en.prototype.atX0MinutesPastTheHourGt20 = function () { return null; };
    en.prototype.commaMonthX0ThroughMonthX1 = function () { return null; };
    en.prototype.commaYearX0ThroughYearX1 = function () { return null; };
    en.prototype.use24HourTimeFormatByDefault = function () { return false; };
    en.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "An error occured when generating the expression description.  Check the cron expression syntax.";
    };
    ;
    en.prototype.everyMinute = function () {
        return "every minute";
    };
    ;
    en.prototype.everyHour = function () {
        return "every hour";
    };
    ;
    en.prototype.atSpace = function () {
        return "At ";
    };
    ;
    en.prototype.everyMinutebetweenX0AndX1 = function () {
        return "Every minute between %s and %s";
    };
    ;
    en.prototype.at = function () {
        return "At";
    };
    ;
    en.prototype.spaceAnd = function () {
        return " and";
    };
    ;
    en.prototype.everysecond = function () {
        return "every second";
    };
    ;
    en.prototype.everyX0Seconds = function () {
        return "every %s seconds";
    };
    ;
    en.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "seconds %s through %s past the minute";
    };
    ;
    en.prototype.atX0SecondsPastTheMinute = function () {
        return "at %s seconds past the minute";
    };
    ;
    en.prototype.everyX0Minutes = function () {
        return "every %s minutes";
    };
    ;
    en.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minutes %s through %s past the hour";
    };
    ;
    en.prototype.atX0MinutesPastTheHour = function () {
        return "at %s minutes past the hour";
    };
    ;
    en.prototype.everyX0Hours = function () {
        return "every %s hours";
    };
    ;
    en.prototype.betweenX0AndX1 = function () {
        return "between %s and %s";
    };
    ;
    en.prototype.atX0 = function () {
        return "at %s";
    };
    ;
    en.prototype.commaEveryDay = function () {
        return ", every day";
    };
    ;
    en.prototype.commaEveryX0daysOfTheWeek = function () {
        return ", every %s days of the week";
    };
    ;
    en.prototype.commaX0ThroughX1 = function () {
        return ", %s through %s";
    };
    ;
    en.prototype.first = function () {
        return "first";
    };
    ;
    en.prototype.second = function () {
        return "second";
    };
    ;
    en.prototype.third = function () {
        return "third";
    };
    ;
    en.prototype.fourth = function () {
        return "fourth";
    };
    ;
    en.prototype.fifth = function () {
        return "fifth";
    };
    ;
    en.prototype.commaOnThe = function () {
        return ", on the ";
    };
    ;
    en.prototype.spaceX0OfTheMonth = function () {
        return " %s of the month";
    };
    ;
    en.prototype.lastDay = function () {
        return "the last day";
    };
    ;
    en.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", on the last %s of the month";
    };
    ;
    en.prototype.commaOnlyOnX0 = function () {
        return ", only on %s";
    };
    ;
    en.prototype.commaEveryX0Months = function () {
        return ", every %s months";
    };
    ;
    en.prototype.commaOnlyInX0 = function () {
        return ", only in %s";
    };
    ;
    en.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", on the last day of the month";
    };
    ;
    en.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", on the last weekday of the month";
    };
    ;
    en.prototype.firstWeekday = function () {
        return "first weekday";
    };
    ;
    en.prototype.weekdayNearestDayX0 = function () {
        return "weekday nearest day %s";
    };
    ;
    en.prototype.commaOnTheX0OfTheMonth = function () {
        return ", on the %s of the month";
    };
    ;
    en.prototype.commaEveryX0Days = function () {
        return ", every %s days";
    };
    ;
    en.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", between day %s and %s of the month";
    };
    ;
    en.prototype.commaOnDayX0OfTheMonth = function () {
        return ", on day %s of the month";
    };
    ;
    en.prototype.spaceAndSpace = function () {
        return " and ";
    };
    ;
    en.prototype.commaEveryMinute = function () {
        return ", every minute";
    };
    ;
    en.prototype.commaEveryHour = function () {
        return ", every hour";
    };
    ;
    en.prototype.commaEveryX0Years = function () {
        return ", every %s years";
    };
    ;
    en.prototype.commaStartingX0 = function () {
        return ", starting %s";
    };
    ;
    en.prototype.daysOfTheWeek = function () {
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    };
    en.prototype.monthsOfTheYear = function () {
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    };
    return en;
}());
exports.en = en;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StringUtilities = (function () {
    function StringUtilities() {
    }
    StringUtilities.format = function (template) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        return template.replace(/%s/g, function () {
            return values.shift();
        });
    };
    StringUtilities.containsAny = function (text, searchStrings) {
        return searchStrings.some(function (c) {
            return text.indexOf(c) > -1;
        });
    };
    return StringUtilities;
}());
exports.StringUtilities = StringUtilities;


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = __webpack_require__(2);
var enLocaleLoader = (function () {
    function enLocaleLoader() {
    }
    enLocaleLoader.prototype.load = function (availableLocales) {
        availableLocales["en"] = new en_1.en();
    };
    return enLocaleLoader;
}());
exports.enLocaleLoader = enLocaleLoader;


/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var expressionDescriptor_1 = __webpack_require__(0);
var enLocaleLoader_1 = __webpack_require__(5);
expressionDescriptor_1.ExpressionDescriptor.initialize(new enLocaleLoader_1.enLocaleLoader());
exports.default = expressionDescriptor_1.ExpressionDescriptor;
var toString = expressionDescriptor_1.ExpressionDescriptor.toString;
exports.toString = toString;


/***/ })
/******/ ]);
});