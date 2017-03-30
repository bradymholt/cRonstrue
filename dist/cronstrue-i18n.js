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
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
            description += (timeSegment + dayOfMonthDesc + dayOfWeekDesc + monthDesc + yearDesc);
            description = this.transformVerbosity(description, this.options.verbose);
            description = description.charAt(0).toLocaleUpperCase() + description.substr(1);
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
        if (!stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters)
            && !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters)
            && !stringUtilities_1.StringUtilities.containsAny(secondsExpression, ExpressionDescriptor.specialCharacters)) {
            description += this.i18n.atSpace() + this.formatTime(hourExpression, minuteExpression, secondsExpression);
        }
        else if (minuteExpression.indexOf("-") > -1
            && !(minuteExpression.indexOf(",") > -1)
            && !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters)) {
            var minuteParts = minuteExpression.split("-");
            description += stringUtilities_1.StringUtilities.format(this.i18n.everyMinutebetweenX0AndX1(), this.formatTime(hourExpression, minuteParts[0], ""), this.formatTime(hourExpression, minuteParts[1], ""));
        }
        else if (hourExpression.indexOf(",") > -1
            && hourExpression.indexOf("-") == -1
            && !stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters)) {
            var hourParts = hourExpression.split(",");
            description += this.i18n.at();
            for (var i = 0; i < hourParts.length; i++) {
                description += " ";
                description += this.formatTime(hourParts[i], minuteExpression, "");
                if (i < (hourParts.length - 2)) {
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
        var description = this.getSegmentDescription(this.expressionParts[0], this.i18n.everysecond(), function (s) { return s; }, function (s) { return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Seconds(), s); }, function (s) { return _this.i18n.secondsX0ThroughX1PastTheMinute(); }, function (s) {
            return s == "0" ? "" : parseInt(s) < 20
                ? _this.i18n.atX0SecondsPastTheMinute()
                : _this.i18n.atX0SecondsPastTheMinuteGt20() || _this.i18n.atX0SecondsPastTheMinute();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getMinutesDescription = function () {
        var _this = this;
        var description = this.getSegmentDescription(this.expressionParts[1], this.i18n.everyMinute(), function (s) { return s; }, function (s) { return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Minutes(), s); }, function (s) { return _this.i18n.minutesX0ThroughX1PastTheHour(); }, function (s) {
            try {
                return s == "0" ? "" : parseInt(s) < 20
                    ? _this.i18n.atX0MinutesPastTheHour()
                    : _this.i18n.atX0MinutesPastTheHourGt20() || _this.i18n.atX0MinutesPastTheHour();
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
        var description = this.getSegmentDescription(expression, this.i18n.everyHour(), function (s) { return _this.formatTime(s, "0", ""); }, function (s) { return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Hours(), s); }, function (s) { return _this.i18n.betweenX0AndX1(); }, function (s) { return _this.i18n.atX0(); });
        return description;
    };
    ExpressionDescriptor.prototype.getDayOfWeekDescription = function () {
        var _this = this;
        var daysOfWeekNames = this.i18n.daysOfTheWeek();
        var description = null;
        if (this.expressionParts[5] == "*" && this.expressionParts[3] != "*") {
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
            }, function (s) { return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0daysOfTheWeek(), s); }, function (s) { return _this.i18n.commaX0ThroughX1(); }, function (s) {
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
                            dayOfWeekOfMonthDescription = _this.i18n.forth();
                            break;
                        case "5":
                            dayOfWeekOfMonthDescription = _this.i18n.fifth();
                            break;
                    }
                    format = _this.i18n.commaOnThe() + dayOfWeekOfMonthDescription + _this.i18n.spaceX0OfTheMonth();
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
        var description = this.getSegmentDescription(this.expressionParts[4], "", function (s) { return monthNames[(parseInt(s) - 1)]; }, function (s) { return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0Months(), s); }, function (s) { return _this.i18n.commaMonthX0ThroughMonthX1() || _this.i18n.commaX0ThroughX1(); }, function (s) { return _this.i18n.commaOnlyInX0(); });
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
                    var dayString = dayNumber == 1 ? this.i18n.firstWeekday() :
                        stringUtilities_1.StringUtilities.format(this.i18n.weekdayNearestDayX0(), dayNumber.toString());
                    description = stringUtilities_1.StringUtilities.format(this.i18n.commaOnTheX0OfTheMonth(), dayString);
                    break;
                }
                else {
                    description = this.getSegmentDescription(expression, this.i18n.commaEveryDay(), function (s) { return s; }, function (s) {
                        return s == "1" ? _this.i18n.commaEveryDay() :
                            _this.i18n.commaEveryX0Days();
                    }, function (s) { return _this.i18n.commaBetweenDayX0AndX1OfTheMonth(); }, function (s) { return _this.i18n.commaOnDayX0OfTheMonth(); });
                    break;
                }
        }
        return description;
    };
    ExpressionDescriptor.prototype.getYearDescription = function () {
        var _this = this;
        var description = this.getSegmentDescription(this.expressionParts[6], "", function (s) { return /^\d+$/.test(s) ? new Date(parseInt(s), 1).getFullYear().toString() : s; }, function (s) { return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0Years(), s); }, function (s) { return _this.i18n.commaYearX0ThroughYearX1() || _this.i18n.commaX0ThroughX1(); }, function (s) { return _this.i18n.commaOnlyInX0(); });
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
            var segments = expression.split(',');
            var descriptionContent = "";
            for (var i = 0; i < segments.length; i++) {
                if (i > 0 && segments.length > 2) {
                    descriptionContent += ",";
                    if (i < segments.length - 1) {
                        descriptionContent += " ";
                    }
                }
                if (i > 0 && segments.length > 1 && (i == segments.length - 1 || segments.length == 2)) {
                    descriptionContent += this.i18n.spaceAndSpace();
                }
                if (segments[i].indexOf("-") > -1) {
                    var betweenSegmentDescription = this.generateBetweenSegmentDescription(segments[i], (function (s) { return _this.i18n.commaX0ThroughX1(); }), getSingleItemDescription);
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
        var betweenSegments = betweenExpression.split('-');
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
            period = (hour >= 12) ? " PM" : " AM";
            if (hour > 12) {
                hour -= 12;
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
            description = description.replace(new RegExp(this.i18n.commaEveryMinute(), 'g'), "");
            description = description.replace(new RegExp(this.i18n.commaEveryHour(), 'g'), "");
            description = description.replace(new RegExp(this.i18n.commaEveryDay(), 'g'), "");
        }
        return description;
    };
    return ExpressionDescriptor;
}());
ExpressionDescriptor.locales = {};
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
        if (!this.expression) {
            throw new Error("Expression is empty");
        }
        var parsed = this.expression.trim().split(' ');
        if (parsed.length < 5) {
            throw new Error("Expression only has " + parsed.length + " parts.  At least 5 part are required.");
        }
        else if (parsed.length == 5) {
            parsed.unshift("");
            parsed.push("");
        }
        else if (parsed.length == 6) {
            if (/\d{4}$/.test(parsed[5])) {
                parsed.unshift('');
            }
            else {
                parsed.push('');
            }
        }
        else if (parsed.length > 7) {
            throw new Error("Expression has " + parsed.length + " parts; too many!");
        }
        this.normalizeExpression(parsed);
        return parsed;
    };
    CronParser.prototype.normalizeExpression = function (expressionParts) {
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
        if (expressionParts[3] == "?") {
            expressionParts[3] = "*";
        }
        if (expressionParts[3].indexOf('W') > -1 && (expressionParts[3].indexOf(',') > -1 || expressionParts[3].indexOf('-') > -1)) {
            throw new Error("The 'W' character can be specified only when the day-of-month is a single day, not a range or list of days.");
        }
        var days = {
            "SUN": 0, "MON": 1, "TUE": 2, "WED": 3, "THU": 4, "FRI": 5, "SAT": 6
        };
        for (var day in days) {
            expressionParts[5] = expressionParts[5].replace(new RegExp(day, "g"), days[day].toString());
        }
        var months = {
            "JAN": 1, "FEB": 2, "MAR": 3, "APR": 4, "MAY": 5, "JUN": 6, "JUL": 7, "AUG": 8, "SEP": 9, "OCT": 10, "NOV": 11, "DEC": 12
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
            if (expressionParts[i].indexOf("/") > -1
                && !(/^\*|\-|\,/.test(expressionParts[i]))) {
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
    en.prototype.forth = function () {
        return "forth";
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
        return searchStrings.some(function (c) { return text.indexOf(c) > -1; });
    };
    return StringUtilities;
}());
exports.StringUtilities = StringUtilities;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var allLocales = __webpack_require__(8);
var allLocalesLoader = (function () {
    function allLocalesLoader() {
    }
    allLocalesLoader.prototype.load = function (availableLocales) {
        for (var property in allLocales) {
            if (allLocales.hasOwnProperty(property)) {
                availableLocales[property] = new (allLocales[property]);
                ;
            }
        }
    };
    return allLocalesLoader;
}());
exports.allLocalesLoader = allLocalesLoader;


/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var expressionDescriptor_1 = __webpack_require__(0);
var allLocalesLoader_1 = __webpack_require__(4);
expressionDescriptor_1.ExpressionDescriptor.initialize(new allLocalesLoader_1.allLocalesLoader());
exports.default = expressionDescriptor_1.ExpressionDescriptor;
var toString = expressionDescriptor_1.ExpressionDescriptor.toString;
exports.toString = toString;


/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = __webpack_require__(2);
exports.en = en_1.en;
var de_1 = __webpack_require__(9);
exports.de = de_1.de;
var es_1 = __webpack_require__(10);
exports.es = es_1.es;
var fr_1 = __webpack_require__(11);
exports.fr = fr_1.fr;
var it_1 = __webpack_require__(12);
exports.it = it_1.it;
var nl_1 = __webpack_require__(14);
exports.nl = nl_1.nl;
var nb_1 = __webpack_require__(13);
exports.nb = nb_1.nb;
var sv_1 = __webpack_require__(19);
exports.sv = sv_1.sv;
var pl_1 = __webpack_require__(15);
exports.pl = pl_1.pl;
var pt_BR_1 = __webpack_require__(16);
exports.pt_BR = pt_BR_1.pt_BR;
var ro_1 = __webpack_require__(17);
exports.ro = ro_1.ro;
var ru_1 = __webpack_require__(18);
exports.ru = ru_1.ru;
var tr_1 = __webpack_require__(20);
exports.tr = tr_1.tr;
var uk_1 = __webpack_require__(21);
exports.uk = uk_1.uk;
var zh_CN_1 = __webpack_require__(22);
exports.zh_CN = zh_CN_1.zh_CN;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var de = (function () {
    function de() {
    }
    de.prototype.atX0SecondsPastTheMinuteGt20 = function () { return null; };
    de.prototype.atX0MinutesPastTheHourGt20 = function () { return null; };
    de.prototype.commaMonthX0ThroughMonthX1 = function () { return null; };
    de.prototype.commaYearX0ThroughYearX1 = function () { return null; };
    de.prototype.use24HourTimeFormatByDefault = function () { return true; };
    de.prototype.everyMinute = function () {
        return "jede Minute";
    };
    de.prototype.everyHour = function () {
        return "jede Stunde";
    };
    de.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "An error occured when generating the expression description.  Check the cron expression syntax.";
    };
    de.prototype.atSpace = function () {
        return "Um ";
    };
    de.prototype.everyMinutebetweenX0AndX1 = function () {
        return "Jede Minute zwischen %s und %s";
    };
    de.prototype.at = function () {
        return "Um";
    };
    de.prototype.spaceAnd = function () {
        return " und";
    };
    de.prototype.everysecond = function () {
        return "Jede Sekunde";
    };
    de.prototype.everyX0Seconds = function () {
        return "alle %s Sekunden";
    };
    de.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "Sekunden %s bis %s";
    };
    de.prototype.atX0SecondsPastTheMinute = function () {
        return "bei Sekunde %s";
    };
    de.prototype.everyX0Minutes = function () {
        return "alle %s Minuten";
    };
    de.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "Minuten %s bis %s";
    };
    de.prototype.atX0MinutesPastTheHour = function () {
        return "bei Minute %s";
    };
    de.prototype.everyX0Hours = function () {
        return "alle %s Stunden";
    };
    de.prototype.betweenX0AndX1 = function () {
        return "zwischen %s und %s";
    };
    de.prototype.atX0 = function () {
        return "um %s";
    };
    de.prototype.commaEveryDay = function () {
        return ", jeden Tag";
    };
    de.prototype.commaEveryX0daysOfTheWeek = function () {
        return ", every %s days of the week";
    };
    de.prototype.commaX0ThroughX1 = function () {
        return ", %s bis %s";
    };
    de.prototype.first = function () {
        return "ersten";
    };
    de.prototype.second = function () {
        return "zweiten";
    };
    de.prototype.third = function () {
        return "dritten";
    };
    de.prototype.forth = function () {
        return "vierten";
    };
    de.prototype.fifth = function () {
        return "fünften";
    };
    de.prototype.commaOnThe = function () {
        return ", am ";
    };
    de.prototype.spaceX0OfTheMonth = function () {
        return " %s des Monats";
    };
    de.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", am letzten %s des Monats";
    };
    de.prototype.commaOnlyOnX0 = function () {
        return ", nur am %s";
    };
    de.prototype.commaEveryX0Months = function () {
        return ", alle %s Monate";
    };
    de.prototype.commaOnlyInX0 = function () {
        return ", nur im %s";
    };
    de.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", am letzten Tag des Monats";
    };
    de.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", am letzten Werktag des Monats";
    };
    de.prototype.firstWeekday = function () {
        return "ersten Werktag";
    };
    de.prototype.weekdayNearestDayX0 = function () {
        return "Werktag am nächsten zum %s Tag";
    };
    de.prototype.commaOnTheX0OfTheMonth = function () {
        return ", am %s des Monats";
    };
    de.prototype.commaEveryX0Days = function () {
        return ", alle %s Tage";
    };
    de.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", zwischen Tag %s und %s des Monats";
    };
    de.prototype.commaOnDayX0OfTheMonth = function () {
        return ", am %s Tag des Monats";
    };
    de.prototype.spaceAndSpace = function () {
        return " und ";
    };
    de.prototype.commaEveryMinute = function () {
        return ", jede Minute";
    };
    de.prototype.commaEveryHour = function () {
        return ", jede Stunde";
    };
    de.prototype.commaEveryX0Years = function () {
        return ", alle %s Jahre";
    };
    de.prototype.commaStartingX0 = function () {
        return ", beginnend %s";
    };
    de.prototype.daysOfTheWeek = function () {
        return ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    };
    de.prototype.monthsOfTheYear = function () {
        return ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    };
    return de;
}());
exports.de = de;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var es = (function () {
    function es() {
    }
    es.prototype.atX0SecondsPastTheMinuteGt20 = function () { return null; };
    es.prototype.atX0MinutesPastTheHourGt20 = function () { return null; };
    es.prototype.commaMonthX0ThroughMonthX1 = function () { return null; };
    es.prototype.commaYearX0ThroughYearX1 = function () { return null; };
    es.prototype.use24HourTimeFormatByDefault = function () { return false; };
    es.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Ocurrió un error mientras se generaba la descripción de la expresión. Revise la sintaxis de la expresión de cron.";
    };
    ;
    es.prototype.at = function () {
        return "A las";
    };
    ;
    es.prototype.atSpace = function () {
        return "A las ";
    };
    ;
    es.prototype.atX0 = function () {
        return "a las %s";
    };
    ;
    es.prototype.atX0MinutesPastTheHour = function () {
        return "a los %s minutos de la hora";
    };
    ;
    es.prototype.atX0SecondsPastTheMinute = function () {
        return "a los %s segundos del minuto";
    };
    ;
    es.prototype.betweenX0AndX1 = function () {
        return "entre las %s y las %s";
    };
    ;
    es.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", entre los días %s y %s del mes";
    };
    ;
    es.prototype.commaEveryDay = function () {
        return ", cada día";
    };
    ;
    es.prototype.commaEveryHour = function () {
        return ", cada hora";
    };
    ;
    es.prototype.commaEveryMinute = function () {
        return ", cada minuto";
    };
    ;
    es.prototype.commaEveryX0Days = function () {
        return ", cada %s días";
    };
    ;
    es.prototype.commaEveryX0daysOfTheWeek = function () {
        return ", cada %s días de la semana";
    };
    ;
    es.prototype.commaEveryX0Months = function () {
        return ", cada %s meses";
    };
    ;
    es.prototype.commaOnDayX0OfTheMonth = function () {
        return ", el día %s del mes";
    };
    ;
    es.prototype.commaOnlyInX0 = function () {
        return ", sólo en %s";
    };
    ;
    es.prototype.commaOnlyOnX0 = function () {
        return ", sólo el %s";
    };
    ;
    es.prototype.commaOnThe = function () {
        return ", en el ";
    };
    ;
    es.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", en el último día del mes";
    };
    ;
    es.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", en el último día de la semana del mes";
    };
    ;
    es.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", en el último %s del mes";
    };
    ;
    es.prototype.commaOnTheX0OfTheMonth = function () {
        return ", en el %s del mes";
    };
    ;
    es.prototype.commaX0ThroughX1 = function () {
        return ", de %s a %s";
    };
    ;
    es.prototype.everyHour = function () {
        return "cada hora";
    };
    ;
    es.prototype.everyMinute = function () {
        return "cada minuto";
    };
    ;
    es.prototype.everyMinutebetweenX0AndX1 = function () {
        return "cada minuto entre las %s y las %s";
    };
    ;
    es.prototype.everysecond = function () {
        return "cada segundo";
    };
    ;
    es.prototype.everyX0Hours = function () {
        return "cada %s horas";
    };
    ;
    es.prototype.everyX0Minutes = function () {
        return "cada %s minutos";
    };
    ;
    es.prototype.everyX0Seconds = function () {
        return "cada %s segundos";
    };
    ;
    es.prototype.fifth = function () {
        return "quinto";
    };
    ;
    es.prototype.first = function () {
        return "primero";
    };
    ;
    es.prototype.firstWeekday = function () {
        return "primer día de la semana";
    };
    ;
    es.prototype.forth = function () {
        return "cuarto";
    };
    ;
    es.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "del minuto %s al %s pasada la hora";
    };
    ;
    es.prototype.second = function () {
        return "segundo";
    };
    ;
    es.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "En los segundos %s al %s de cada minuto";
    };
    ;
    es.prototype.spaceAnd = function () {
        return " y";
    };
    ;
    es.prototype.spaceAndSpace = function () {
        return " y ";
    };
    ;
    es.prototype.spaceX0OfTheMonth = function () {
        return " %s del mes";
    };
    ;
    es.prototype.third = function () {
        return "tercer";
    };
    ;
    es.prototype.weekdayNearestDayX0 = function () {
        return "día de la semana más próximo al %s";
    };
    ;
    es.prototype.commaEveryX0Years = function () {
        return ", cada %s años";
    };
    ;
    es.prototype.commaStartingX0 = function () {
        return ", comenzando %s";
    };
    ;
    es.prototype.daysOfTheWeek = function () {
        return ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    };
    es.prototype.monthsOfTheYear = function () {
        return ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    };
    return es;
}());
exports.es = es;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fr = (function () {
    function fr() {
    }
    fr.prototype.atX0SecondsPastTheMinuteGt20 = function () { return null; };
    fr.prototype.atX0MinutesPastTheHourGt20 = function () { return null; };
    fr.prototype.commaMonthX0ThroughMonthX1 = function () { return null; };
    fr.prototype.commaYearX0ThroughYearX1 = function () { return null; };
    fr.prototype.use24HourTimeFormatByDefault = function () { return false; };
    fr.prototype.everyMinute = function () {
        return "toutes les minutes";
    };
    fr.prototype.everyHour = function () {
        return "toutes les heures";
    };
    fr.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Une erreur est survenue en générant la description de l'expression cron. Vérifiez sa syntaxe.";
    };
    fr.prototype.atSpace = function () {
        return "À ";
    };
    fr.prototype.everyMinutebetweenX0AndX1 = function () {
        return "Toutes les minutes entre %s et %s";
    };
    fr.prototype.at = function () {
        return "À";
    };
    fr.prototype.spaceAnd = function () {
        return " et";
    };
    fr.prototype.everysecond = function () {
        return "toutes les secondes";
    };
    fr.prototype.everyX0Seconds = function () {
        return "toutes les %s secondes";
    };
    fr.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "les secondes entre %s et %s après la minute";
    };
    fr.prototype.atX0SecondsPastTheMinute = function () {
        return "%s secondes après la minute";
    };
    fr.prototype.everyX0Minutes = function () {
        return "toutes les %s minutes";
    };
    fr.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "les minutes entre %s et %s après l'heure";
    };
    fr.prototype.atX0MinutesPastTheHour = function () {
        return "%s minutes après l'heure";
    };
    fr.prototype.everyX0Hours = function () {
        return "toutes les %s heures";
    };
    fr.prototype.betweenX0AndX1 = function () {
        return "de %s à %s";
    };
    fr.prototype.atX0 = function () {
        return "à %s";
    };
    fr.prototype.commaEveryDay = function () {
        return ", tous les jours";
    };
    fr.prototype.commaEveryX0daysOfTheWeek = function () {
        return ", every %s days of the week";
    };
    fr.prototype.commaX0ThroughX1 = function () {
        return ", de %s à %s";
    };
    fr.prototype.first = function () {
        return "premier";
    };
    fr.prototype.second = function () {
        return "second";
    };
    fr.prototype.third = function () {
        return "troisième";
    };
    fr.prototype.forth = function () {
        return "quatrième";
    };
    fr.prototype.fifth = function () {
        return "cinquième";
    };
    fr.prototype.commaOnThe = function () {
        return ", le ";
    };
    fr.prototype.spaceX0OfTheMonth = function () {
        return " %s du mois";
    };
    fr.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", le dernier %s du mois";
    };
    fr.prototype.commaOnlyOnX0 = function () {
        return ", uniquement le %s";
    };
    fr.prototype.commaEveryX0Months = function () {
        return ", tous les %s mois";
    };
    fr.prototype.commaOnlyInX0 = function () {
        return ", uniquement en %s";
    };
    fr.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", le dernier jour du mois";
    };
    fr.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", le dernier jour ouvrable du mois";
    };
    fr.prototype.firstWeekday = function () {
        return "premier jour ouvrable";
    };
    fr.prototype.weekdayNearestDayX0 = function () {
        return "jour ouvrable le plus proche du %s";
    };
    fr.prototype.commaOnTheX0OfTheMonth = function () {
        return ", le %s du mois";
    };
    fr.prototype.commaEveryX0Days = function () {
        return ", tous les %s jours";
    };
    fr.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", du %s au %s du mois";
    };
    fr.prototype.commaOnDayX0OfTheMonth = function () {
        return ", le %s du mois";
    };
    fr.prototype.spaceAndSpace = function () {
        return " et ";
    };
    fr.prototype.commaEveryMinute = function () {
        return ", toutes les minutes";
    };
    fr.prototype.commaEveryHour = function () {
        return ", toutes les heures";
    };
    fr.prototype.commaEveryX0Years = function () {
        return ", tous les %s ans";
    };
    fr.prototype.commaDaysX0ThroughX1 = function () {
        return ", du %s au %s";
    };
    fr.prototype.weekSpaceAndSpace = function () {
        return " et le ";
    };
    fr.prototype.commaStartingX0 = function () {
        return ", départ %s";
    };
    fr.prototype.daysOfTheWeek = function () {
        return ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    };
    fr.prototype.monthsOfTheYear = function () {
        return ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    };
    return fr;
}());
exports.fr = fr;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var it = (function () {
    function it() {
    }
    it.prototype.atX0SecondsPastTheMinuteGt20 = function () { return null; };
    it.prototype.atX0MinutesPastTheHourGt20 = function () { return null; };
    it.prototype.commaMonthX0ThroughMonthX1 = function () { return null; };
    it.prototype.commaYearX0ThroughYearX1 = function () { return null; };
    it.prototype.use24HourTimeFormatByDefault = function () { return true; };
    it.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "È verificato un errore durante la generazione la descrizione espressione. Controllare la sintassi delle espressioni cron.";
    };
    it.prototype.at = function () {
        return "Alle";
    };
    it.prototype.atSpace = function () {
        return "Alle ";
    };
    it.prototype.atX0 = function () {
        return "alle %s";
    };
    it.prototype.atX0MinutesPastTheHour = function () {
        return "al %s minuto passata l'ora";
    };
    it.prototype.atX0SecondsPastTheMinute = function () {
        return "al %s secondo passato il minuto";
    };
    it.prototype.betweenX0AndX1 = function () {
        return "tra le %s e le %s";
    };
    it.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", tra il giorno %s e %s del mese";
    };
    it.prototype.commaEveryDay = function () {
        return ", ogni giorno";
    };
    it.prototype.commaEveryHour = function () {
        return ", ogni ora";
    };
    it.prototype.commaEveryMinute = function () {
        return ", ogni minuto";
    };
    it.prototype.commaEveryX0Days = function () {
        return ", ogni %s giorni";
    };
    it.prototype.commaEveryX0daysOfTheWeek = function () {
        return ", ogni %s giorni della settimana";
    };
    it.prototype.commaEveryX0Months = function () {
        return ", ogni %s mesi";
    };
    it.prototype.commaEveryX0Years = function () {
        return ", ogni %s anni";
    };
    it.prototype.commaOnDayX0OfTheMonth = function () {
        return ", il giorno %s del mese";
    };
    it.prototype.commaOnlyInX0 = function () {
        return ", solo in %s";
    };
    it.prototype.commaOnlyOnX0 = function () {
        return ", solo il %s";
    };
    it.prototype.commaOnThe = function () {
        return ", il ";
    };
    it.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", l'ultimo giorno del mese";
    };
    it.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", nell'ultima settimana del mese";
    };
    it.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", l'ultimo %s del mese";
    };
    it.prototype.commaOnTheX0OfTheMonth = function () {
        return ", il %s del mese";
    };
    it.prototype.commaX0ThroughX1 = function () {
        return ", %s al %s";
    };
    it.prototype.everyHour = function () {
        return "ogni ora";
    };
    it.prototype.everyMinute = function () {
        return "ogni minuto";
    };
    it.prototype.everyMinutebetweenX0AndX1 = function () {
        return "Ogni minuto tra le %s e le %s";
    };
    it.prototype.everysecond = function () {
        return "ogni secondo";
    };
    it.prototype.everyX0Hours = function () {
        return "ogni %s ore";
    };
    it.prototype.everyX0Minutes = function () {
        return "ogni %s minuti";
    };
    it.prototype.everyX0Seconds = function () {
        return "ogni %s secondi";
    };
    it.prototype.fifth = function () {
        return "quinto";
    };
    it.prototype.first = function () {
        return "primo";
    };
    it.prototype.firstWeekday = function () {
        return "primo giorno della settimana";
    };
    it.prototype.forth = function () {
        return "quarto";
    };
    it.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuti %s al %s dopo l'ora";
    };
    it.prototype.second = function () {
        return "secondo";
    };
    it.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "secondi %s al %s oltre il minuto";
    };
    it.prototype.spaceAnd = function () {
        return " e";
    };
    it.prototype.spaceAndSpace = function () {
        return " e ";
    };
    it.prototype.spaceX0OfTheMonth = function () {
        return " %s del mese";
    };
    it.prototype.third = function () {
        return "terzo";
    };
    it.prototype.weekdayNearestDayX0 = function () {
        return "giorno della settimana più vicino al %s";
    };
    it.prototype.commaStartingX0 = function () {
        return ", a partire %s";
    };
    it.prototype.daysOfTheWeek = function () {
        return ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
    };
    it.prototype.monthsOfTheYear = function () {
        return ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
    };
    return it;
}());
exports.it = it;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nb = (function () {
    function nb() {
    }
    nb.prototype.atX0SecondsPastTheMinuteGt20 = function () { return null; };
    nb.prototype.atX0MinutesPastTheHourGt20 = function () { return null; };
    nb.prototype.commaMonthX0ThroughMonthX1 = function () { return null; };
    nb.prototype.commaYearX0ThroughYearX1 = function () { return null; };
    nb.prototype.use24HourTimeFormatByDefault = function () { return false; };
    nb.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "En feil intraff ved generering av uttrykksbeskrivelse. Sjekk cron syntaks.";
    };
    nb.prototype.at = function () {
        return "På";
    };
    nb.prototype.atSpace = function () {
        return "På ";
    };
    nb.prototype.atX0 = function () {
        return "på %s";
    };
    nb.prototype.atX0MinutesPastTheHour = function () {
        return "på %s minutter etter timen";
    };
    nb.prototype.atX0SecondsPastTheMinute = function () {
        return "på %s sekunder etter minuttet";
    };
    nb.prototype.betweenX0AndX1 = function () {
        return "mellom %s og %s";
    };
    nb.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mellom dag %s og %s av måneden";
    };
    nb.prototype.commaEveryDay = function () {
        return ", hver dag";
    };
    nb.prototype.commaEveryHour = function () {
        return ", hver time";
    };
    nb.prototype.commaEveryMinute = function () {
        return ", hvert minutt";
    };
    nb.prototype.commaEveryX0Days = function () {
        return ", hver %s dag";
    };
    nb.prototype.commaEveryX0daysOfTheWeek = function () {
        return ", hver %s ukedag";
    };
    nb.prototype.commaEveryX0Months = function () {
        return ", hver %s måned]";
    };
    nb.prototype.commaEveryX0Years = function () {
        return ", hvert %s år";
    };
    nb.prototype.commaOnDayX0OfTheMonth = function () {
        return ", på dag %s av måneden";
    };
    nb.prototype.commaOnlyInX0 = function () {
        return ", bare i %s";
    };
    nb.prototype.commaOnlyOnX0 = function () {
        return ", bare på %s";
    };
    nb.prototype.commaOnThe = function () {
        return ", på den ";
    };
    nb.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", på den siste dagen i måneden";
    };
    nb.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", på den siste ukedagen i måneden";
    };
    nb.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", på den siste %s av måneden";
    };
    nb.prototype.commaOnTheX0OfTheMonth = function () {
        return ", på den %s av måneden";
    };
    nb.prototype.commaX0ThroughX1 = function () {
        return ", %s til og med %s";
    };
    nb.prototype.everyHour = function () {
        return "hver time";
    };
    nb.prototype.everyMinute = function () {
        return "hvert minutt";
    };
    nb.prototype.everyMinutebetweenX0AndX1 = function () {
        return "Hvert minutt mellom %s og %s";
    };
    nb.prototype.everysecond = function () {
        return "hvert sekund";
    };
    nb.prototype.everyX0Hours = function () {
        return "hver %s time";
    };
    nb.prototype.everyX0Minutes = function () {
        return "hvert %s minutt";
    };
    nb.prototype.everyX0Seconds = function () {
        return "hvert %s sekund";
    };
    nb.prototype.fifth = function () {
        return "femte";
    };
    nb.prototype.first = function () {
        return "første";
    };
    nb.prototype.firstWeekday = function () {
        return "første ukedag";
    };
    nb.prototype.forth = function () {
        return "fjede";
    };
    nb.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuttene fra %s til og med %s etter timen";
    };
    nb.prototype.second = function () {
        return "sekund";
    };
    nb.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundene fra %s til og med %s etter minuttet";
    };
    nb.prototype.spaceAnd = function () {
        return " og";
    };
    nb.prototype.spaceAndSpace = function () {
        return " og ";
    };
    nb.prototype.spaceX0OfTheMonth = function () {
        return " %s av måneden";
    };
    nb.prototype.third = function () {
        return "tredje";
    };
    nb.prototype.weekdayNearestDayX0 = function () {
        return "ukedag nærmest dag %s";
    };
    nb.prototype.commaStartingX0 = function () {
        return ", starter %s";
    };
    nb.prototype.daysOfTheWeek = function () {
        return ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
    };
    nb.prototype.monthsOfTheYear = function () {
        return ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];
    };
    return nb;
}());
exports.nb = nb;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nl = (function () {
    function nl() {
    }
    nl.prototype.atX0SecondsPastTheMinuteGt20 = function () { return null; };
    nl.prototype.atX0MinutesPastTheHourGt20 = function () { return null; };
    nl.prototype.commaMonthX0ThroughMonthX1 = function () { return null; };
    nl.prototype.commaYearX0ThroughYearX1 = function () { return null; };
    nl.prototype.use24HourTimeFormatByDefault = function () { return false; };
    nl.prototype.everyMinute = function () {
        return "elke minuut";
    };
    nl.prototype.everyHour = function () {
        return "elk uur";
    };
    nl.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Er is een fout opgetreden bij het vertalen van de gegevens. Controleer de gegevens.";
    };
    nl.prototype.atSpace = function () {
        return "Op ";
    };
    nl.prototype.everyMinutebetweenX0AndX1 = function () {
        return "Elke minuut tussen %s en %s";
    };
    nl.prototype.at = function () {
        return "Op";
    };
    nl.prototype.spaceAnd = function () {
        return " en";
    };
    nl.prototype.everysecond = function () {
        return "elke seconde";
    };
    nl.prototype.everyX0Seconds = function () {
        return "elke %s seconden";
    };
    nl.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "seconden %s t/m %s na de minuut";
    };
    nl.prototype.atX0SecondsPastTheMinute = function () {
        return "op %s seconden na de minuut";
    };
    nl.prototype.everyX0Minutes = function () {
        return "elke %s minuten";
    };
    nl.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuut %s t/m %s na het uur";
    };
    nl.prototype.atX0MinutesPastTheHour = function () {
        return "op %s minuten na het uur";
    };
    nl.prototype.everyX0Hours = function () {
        return "elke %s uur";
    };
    nl.prototype.betweenX0AndX1 = function () {
        return "tussen %s en %s";
    };
    nl.prototype.atX0 = function () {
        return "op %s";
    };
    nl.prototype.commaEveryDay = function () {
        return ", elke dag";
    };
    nl.prototype.commaEveryX0daysOfTheWeek = function () {
        return ", elke %s dagen van de week";
    };
    nl.prototype.commaX0ThroughX1 = function () {
        return ", %s t/m %s";
    };
    nl.prototype.first = function () {
        return "eerste";
    };
    nl.prototype.second = function () {
        return "tweede";
    };
    nl.prototype.third = function () {
        return "derde";
    };
    nl.prototype.forth = function () {
        return "vierde";
    };
    nl.prototype.fifth = function () {
        return "vijfde";
    };
    nl.prototype.commaOnThe = function () {
        return ", op de ";
    };
    nl.prototype.spaceX0OfTheMonth = function () {
        return " %s van de maand";
    };
    nl.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", op de laatste %s van de maand";
    };
    nl.prototype.commaOnlyOnX0 = function () {
        return ", alleen op %s";
    };
    nl.prototype.commaEveryX0Months = function () {
        return ", elke %s maanden";
    };
    nl.prototype.commaOnlyInX0 = function () {
        return ", alleen in %s";
    };
    nl.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", op de laatste dag van de maand";
    };
    nl.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", op de laatste werkdag van de maand";
    };
    nl.prototype.firstWeekday = function () {
        return "eerste werkdag";
    };
    nl.prototype.weekdayNearestDayX0 = function () {
        return "werkdag dichtst bij dag %s";
    };
    nl.prototype.commaOnTheX0OfTheMonth = function () {
        return ", op de %s van de maand";
    };
    nl.prototype.commaEveryX0Days = function () {
        return ", elke %s dagen";
    };
    nl.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", tussen dag %s en %s van de maand";
    };
    nl.prototype.commaOnDayX0OfTheMonth = function () {
        return ", op dag %s van de maand";
    };
    nl.prototype.spaceAndSpace = function () {
        return " en ";
    };
    nl.prototype.commaEveryMinute = function () {
        return ", elke minuut";
    };
    nl.prototype.commaEveryHour = function () {
        return ", elk uur";
    };
    nl.prototype.commaEveryX0Years = function () {
        return ", elke %s jaren";
    };
    nl.prototype.commaStartingX0 = function () {
        return ", beginnend %s";
    };
    nl.prototype.daysOfTheWeek = function () {
        return ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
    };
    nl.prototype.monthsOfTheYear = function () {
        return ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
    };
    return nl;
}());
exports.nl = nl;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pl = (function () {
    function pl() {
    }
    pl.prototype.atX0SecondsPastTheMinuteGt20 = function () { return null; };
    pl.prototype.atX0MinutesPastTheHourGt20 = function () { return null; };
    pl.prototype.commaMonthX0ThroughMonthX1 = function () { return null; };
    pl.prototype.commaYearX0ThroughYearX1 = function () { return null; };
    pl.prototype.use24HourTimeFormatByDefault = function () { return true; };
    pl.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Wystąpił błąd podczas generowania opisu wyrażenia cron. Sprawdź składnię wyrażenia cron.";
    };
    pl.prototype.at = function () {
        return "O";
    };
    pl.prototype.atSpace = function () {
        return "O ";
    };
    pl.prototype.atX0 = function () {
        return "o %s";
    };
    pl.prototype.atX0MinutesPastTheHour = function () {
        return "w %s minucie";
    };
    pl.prototype.atX0SecondsPastTheMinute = function () {
        return "w %s sekundzie";
    };
    pl.prototype.betweenX0AndX1 = function () {
        return "od %s do %s";
    };
    pl.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", od %s-ego do %s-ego dnia miesiąca";
    };
    pl.prototype.commaEveryDay = function () {
        return ", co dzień";
    };
    pl.prototype.commaEveryHour = function () {
        return ", co godzinę";
    };
    pl.prototype.commaEveryMinute = function () {
        return ", co minutę";
    };
    pl.prototype.commaEveryX0Days = function () {
        return ", co %s dni";
    };
    pl.prototype.commaEveryX0daysOfTheWeek = function () {
        return ", co %s dni tygodnia";
    };
    pl.prototype.commaEveryX0Months = function () {
        return ", co %s miesięcy";
    };
    pl.prototype.commaEveryX0Years = function () {
        return ", co %s lat";
    };
    pl.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s-ego dnia miesiąca";
    };
    pl.prototype.commaOnlyInX0 = function () {
        return ", tylko %s";
    };
    pl.prototype.commaOnlyOnX0 = function () {
        return ", tylko %s";
    };
    pl.prototype.commaOnThe = function () {
        return ", ";
    };
    pl.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ostatni dzień miesiąca";
    };
    pl.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ostatni dzień roboczy miesiąca";
    };
    pl.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ostatni %s miesiąca";
    };
    pl.prototype.commaOnTheX0OfTheMonth = function () {
        return ", %s miesiąca";
    };
    pl.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    pl.prototype.everyHour = function () {
        return "co godzinę";
    };
    pl.prototype.everyMinute = function () {
        return "co minutę";
    };
    pl.prototype.everyMinutebetweenX0AndX1 = function () {
        return "Co minutę od %s do %s";
    };
    pl.prototype.everysecond = function () {
        return "co sekundę";
    };
    pl.prototype.everyX0Hours = function () {
        return "co %s godzin";
    };
    pl.prototype.everyX0Minutes = function () {
        return "co %s minut";
    };
    pl.prototype.everyX0Seconds = function () {
        return "co %s sekund";
    };
    pl.prototype.fifth = function () {
        return "piąty";
    };
    pl.prototype.first = function () {
        return "pierwszy";
    };
    pl.prototype.firstWeekday = function () {
        return "pierwszy dzień roboczy";
    };
    pl.prototype.forth = function () {
        return "czwarty";
    };
    pl.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuty od %s do %s";
    };
    pl.prototype.second = function () {
        return "drugi";
    };
    pl.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundy od %s do %s";
    };
    pl.prototype.spaceAnd = function () {
        return " i";
    };
    pl.prototype.spaceAndSpace = function () {
        return " i ";
    };
    pl.prototype.spaceX0OfTheMonth = function () {
        return " %s miesiąca";
    };
    pl.prototype.third = function () {
        return "trzeci";
    };
    pl.prototype.weekdayNearestDayX0 = function () {
        return "dzień roboczy najbliższy %s-ego dnia";
    };
    pl.prototype.commaStartingX0 = function () {
        return ", startowy %s";
    };
    pl.prototype.daysOfTheWeek = function () {
        return ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
    };
    pl.prototype.monthsOfTheYear = function () {
        return ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
    };
    return pl;
}());
exports.pl = pl;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pt_BR = (function () {
    function pt_BR() {
    }
    pt_BR.prototype.atX0SecondsPastTheMinuteGt20 = function () { return null; };
    pt_BR.prototype.atX0MinutesPastTheHourGt20 = function () { return null; };
    pt_BR.prototype.commaMonthX0ThroughMonthX1 = function () { return null; };
    pt_BR.prototype.commaYearX0ThroughYearX1 = function () { return null; };
    pt_BR.prototype.use24HourTimeFormatByDefault = function () { return false; };
    pt_BR.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Ocorreu um erro ao gerar a descrição da expressão Cron.";
    };
    pt_BR.prototype.at = function () {
        return "às";
    };
    pt_BR.prototype.atSpace = function () {
        return "às ";
    };
    pt_BR.prototype.atX0 = function () {
        return "Às %s";
    };
    pt_BR.prototype.atX0MinutesPastTheHour = function () {
        return "aos %s minutos da hora";
    };
    pt_BR.prototype.atX0SecondsPastTheMinute = function () {
        return "aos %s segundos do minuto";
    };
    pt_BR.prototype.betweenX0AndX1 = function () {
        return "entre %s e %s";
    };
    pt_BR.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", entre os dias %s e %s do mês";
    };
    pt_BR.prototype.commaEveryDay = function () {
        return ", a cada dia";
    };
    pt_BR.prototype.commaEveryHour = function () {
        return ", a cada hora";
    };
    pt_BR.prototype.commaEveryMinute = function () {
        return ", a cada minuto";
    };
    pt_BR.prototype.commaEveryX0Days = function () {
        return ", a cada %s dias";
    };
    pt_BR.prototype.commaEveryX0daysOfTheWeek = function () {
        return ", a cada %s dias de semana";
    };
    pt_BR.prototype.commaEveryX0Months = function () {
        return ", a cada %s meses";
    };
    pt_BR.prototype.commaOnDayX0OfTheMonth = function () {
        return ", no dia %s do mês";
    };
    pt_BR.prototype.commaOnlyInX0 = function () {
        return ", somente em %s";
    };
    pt_BR.prototype.commaOnlyOnX0 = function () {
        return ", somente de %s";
    };
    pt_BR.prototype.commaOnThe = function () {
        return ", na ";
    };
    pt_BR.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", no último dia do mês";
    };
    pt_BR.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", no último dia da semana do mês";
    };
    pt_BR.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", na última %s do mês";
    };
    pt_BR.prototype.commaOnTheX0OfTheMonth = function () {
        return ", no %s do mês";
    };
    pt_BR.prototype.commaX0ThroughX1 = function () {
        return ", de %s a %s";
    };
    pt_BR.prototype.everyHour = function () {
        return "a cada hora";
    };
    pt_BR.prototype.everyMinute = function () {
        return "a cada minuto";
    };
    pt_BR.prototype.everyMinutebetweenX0AndX1 = function () {
        return "a cada minuto entre %s e %s";
    };
    pt_BR.prototype.everysecond = function () {
        return "a cada segundo";
    };
    pt_BR.prototype.everyX0Hours = function () {
        return "a cada %s horas";
    };
    pt_BR.prototype.everyX0Minutes = function () {
        return "a cada %s minutos";
    };
    pt_BR.prototype.everyX0Seconds = function () {
        return "a cada %s segundos";
    };
    pt_BR.prototype.fifth = function () {
        return "quinta";
    };
    pt_BR.prototype.first = function () {
        return "primeira";
    };
    pt_BR.prototype.firstWeekday = function () {
        return "primeiro dia da semana";
    };
    pt_BR.prototype.forth = function () {
        return "quarta";
    };
    pt_BR.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "do minuto %s até %s de cada hora";
    };
    pt_BR.prototype.second = function () {
        return "segunda";
    };
    pt_BR.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "No segundo %s até %s de cada minuto";
    };
    pt_BR.prototype.spaceAnd = function () {
        return " e";
    };
    pt_BR.prototype.spaceAndSpace = function () {
        return " e ";
    };
    pt_BR.prototype.spaceX0OfTheMonth = function () {
        return " %s do mês";
    };
    pt_BR.prototype.third = function () {
        return "terceira";
    };
    pt_BR.prototype.weekdayNearestDayX0 = function () {
        return "dia da semana mais próximo do dia %s";
    };
    pt_BR.prototype.commaEveryX0Years = function () {
        return ", a cada %s anos";
    };
    pt_BR.prototype.commaStartingX0 = function () {
        return ", iniciando %s";
    };
    pt_BR.prototype.daysOfTheWeek = function () {
        return ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
    };
    pt_BR.prototype.monthsOfTheYear = function () {
        return ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    };
    return pt_BR;
}());
exports.pt_BR = pt_BR;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ro = (function () {
    function ro() {
    }
    ro.prototype.use24HourTimeFormatByDefault = function () { return true; };
    ro.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Eroare la generarea descrierii. Verificați sintaxa.";
    };
    ro.prototype.at = function () {
        return "La";
    };
    ro.prototype.atSpace = function () {
        return "La ";
    };
    ro.prototype.atX0 = function () {
        return "la %s";
    };
    ro.prototype.atX0MinutesPastTheHour = function () {
        return "la și %s minute";
    };
    ro.prototype.atX0SecondsPastTheMinute = function () {
        return "la și %s secunde";
    };
    ro.prototype.betweenX0AndX1 = function () {
        return "între %s și %s";
    };
    ro.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", între zilele %s și %s ale lunii";
    };
    ro.prototype.commaEveryDay = function () {
        return ", în fiecare zi";
    };
    ro.prototype.commaEveryHour = function () {
        return ", în fiecare oră";
    };
    ro.prototype.commaEveryMinute = function () {
        return ", în fiecare minut";
    };
    ro.prototype.commaEveryX0Days = function () {
        return ", la fiecare %s zile";
    };
    ro.prototype.commaEveryX0daysOfTheWeek = function () {
        return ", la fiecare a %s-a zi a săptămânii";
    };
    ro.prototype.commaEveryX0Months = function () {
        return ", la fiecare %s luni";
    };
    ro.prototype.commaEveryX0Years = function () {
        return ", o dată la %s ani";
    };
    ro.prototype.commaOnDayX0OfTheMonth = function () {
        return ", în ziua %s a lunii";
    };
    ro.prototype.commaOnlyInX0 = function () {
        return ", doar în %s";
    };
    ro.prototype.commaOnlyOnX0 = function () {
        return ", doar %s";
    };
    ro.prototype.commaOnThe = function () {
        return ", în ";
    };
    ro.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", în ultima zi a lunii";
    };
    ro.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", în ultima zi lucrătoare a lunii";
    };
    ro.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", în ultima %s a lunii";
    };
    ro.prototype.commaOnTheX0OfTheMonth = function () {
        return ", în %s a lunii";
    };
    ro.prototype.commaX0ThroughX1 = function () {
        return ", de %s până %s";
    };
    ro.prototype.everyHour = function () {
        return "în fiecare oră";
    };
    ro.prototype.everyMinute = function () {
        return "în fiecare minut";
    };
    ro.prototype.everyMinutebetweenX0AndX1 = function () {
        return "În fiecare minut între %s și %s";
    };
    ro.prototype.everysecond = function () {
        return "în fiecare secundă";
    };
    ro.prototype.everyX0Hours = function () {
        return "la fiecare %s ore";
    };
    ro.prototype.everyX0Minutes = function () {
        return "la fiecare %s minute";
    };
    ro.prototype.everyX0Seconds = function () {
        return "la fiecare %s secunde";
    };
    ro.prototype.fifth = function () {
        return "a cincea";
    };
    ro.prototype.first = function () {
        return "prima";
    };
    ro.prototype.firstWeekday = function () {
        return "prima zi a săptămânii";
    };
    ro.prototype.forth = function () {
        return "a patra";
    };
    ro.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "între minutele %s și %s";
    };
    ro.prototype.second = function () {
        return "a doua";
    };
    ro.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "între secunda %s și secunda %s";
    };
    ro.prototype.spaceAnd = function () {
        return " și";
    };
    ro.prototype.spaceAndSpace = function () {
        return " și ";
    };
    ro.prototype.spaceX0OfTheMonth = function () {
        return " %s a lunii";
    };
    ro.prototype.third = function () {
        return "a treia";
    };
    ro.prototype.weekdayNearestDayX0 = function () {
        return "cea mai apropiată zi a săptămânii de ziua %s";
    };
    ro.prototype.ComaMinX0ThroughMinX1 = function () {
        return ", de la %s până la %s";
    };
    ro.prototype.commaMonthX0ThroughMonthX1 = function () {
        return ", din %s până în %s";
    };
    ro.prototype.commaYearX0ThroughYearX1 = function () {
        return ", din %s până în %s";
    };
    ro.prototype.atX0MinutesPastTheHourGt20 = function () {
        return "la și %s de minute";
    };
    ro.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return "la și %s de secunde";
    };
    ro.prototype.commaStartingX0 = function () {
        return ", pornire %s";
    };
    ro.prototype.daysOfTheWeek = function () {
        return ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"];
    };
    ro.prototype.monthsOfTheYear = function () {
        return ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"];
    };
    return ro;
}());
exports.ro = ro;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ru = (function () {
    function ru() {
    }
    ru.prototype.atX0SecondsPastTheMinuteGt20 = function () { return null; };
    ru.prototype.atX0MinutesPastTheHourGt20 = function () { return null; };
    ru.prototype.commaMonthX0ThroughMonthX1 = function () { return null; };
    ru.prototype.commaYearX0ThroughYearX1 = function () { return null; };
    ru.prototype.use24HourTimeFormatByDefault = function () { return true; };
    ru.prototype.everyMinute = function () {
        return "каждую минуту";
    };
    ru.prototype.everyHour = function () {
        return "каждый час";
    };
    ru.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Произошла ошибка во время генерации описания выражения. Проверьте синтаксис крон-выражения.";
    };
    ru.prototype.atSpace = function () {
        return "В ";
    };
    ru.prototype.everyMinutebetweenX0AndX1 = function () {
        return "Каждую минуту с %s по %s";
    };
    ru.prototype.at = function () {
        return "В";
    };
    ru.prototype.spaceAnd = function () {
        return " и";
    };
    ru.prototype.everysecond = function () {
        return "каждую секунду";
    };
    ru.prototype.everyX0Seconds = function () {
        return "каждые %s секунд";
    };
    ru.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "секунды с %s по %s";
    };
    ru.prototype.atX0SecondsPastTheMinute = function () {
        return "в %s секунд";
    };
    ru.prototype.everyX0Minutes = function () {
        return "каждые %s минут";
    };
    ru.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "минуты с %s по %s";
    };
    ru.prototype.atX0MinutesPastTheHour = function () {
        return "в %s минут";
    };
    ru.prototype.everyX0Hours = function () {
        return "каждые %s часов";
    };
    ru.prototype.betweenX0AndX1 = function () {
        return "с %s по %s";
    };
    ru.prototype.atX0 = function () {
        return "в %s";
    };
    ru.prototype.commaEveryDay = function () {
        return ", каждый день";
    };
    ru.prototype.commaEveryX0daysOfTheWeek = function () {
        return ", каждые %s дней недели";
    };
    ru.prototype.commaX0ThroughX1 = function () {
        return ", %s по %s";
    };
    ru.prototype.first = function () {
        return "первый";
    };
    ru.prototype.second = function () {
        return "второй";
    };
    ru.prototype.third = function () {
        return "третий";
    };
    ru.prototype.forth = function () {
        return "четвертый";
    };
    ru.prototype.fifth = function () {
        return "пятый";
    };
    ru.prototype.commaOnThe = function () {
        return ", в ";
    };
    ru.prototype.spaceX0OfTheMonth = function () {
        return " %s месяца";
    };
    ru.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", в последний %s месяца";
    };
    ru.prototype.commaOnlyOnX0 = function () {
        return ", только в %s";
    };
    ru.prototype.commaEveryX0Months = function () {
        return ", каждые %s месяцев";
    };
    ru.prototype.commaOnlyInX0 = function () {
        return ", только в %s";
    };
    ru.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", в последний день месяца";
    };
    ru.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", в последний будний день месяца";
    };
    ru.prototype.firstWeekday = function () {
        return "первый будний день";
    };
    ru.prototype.weekdayNearestDayX0 = function () {
        return "ближайший будний день к %s";
    };
    ru.prototype.commaOnTheX0OfTheMonth = function () {
        return ", в %s месяца";
    };
    ru.prototype.commaEveryX0Days = function () {
        return ", каждые %s дней";
    };
    ru.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", с %s по %s число месяца";
    };
    ru.prototype.commaOnDayX0OfTheMonth = function () {
        return ", в %s число месяца";
    };
    ru.prototype.spaceAndSpace = function () {
        return " и ";
    };
    ru.prototype.commaEveryMinute = function () {
        return ", каждую минуту";
    };
    ru.prototype.commaEveryHour = function () {
        return ", каждый час";
    };
    ru.prototype.commaEveryX0Years = function () {
        return ", каждые %s лет";
    };
    ru.prototype.commaStartingX0 = function () {
        return ", начало %s";
    };
    ru.prototype.daysOfTheWeek = function () {
        return ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
    };
    ru.prototype.monthsOfTheYear = function () {
        return ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
    };
    return ru;
}());
exports.ru = ru;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sv = (function () {
    function sv() {
    }
    sv.prototype.atX0SecondsPastTheMinuteGt20 = function () { return null; };
    sv.prototype.atX0MinutesPastTheHourGt20 = function () { return null; };
    sv.prototype.commaMonthX0ThroughMonthX1 = function () { return null; };
    sv.prototype.commaYearX0ThroughYearX1 = function () { return null; };
    sv.prototype.use24HourTimeFormatByDefault = function () { return true; };
    sv.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Ett fel inträffade vid generering av uttryckets beskrivning. Kontrollera cron-uttryckets syntax.";
    };
    ;
    sv.prototype.everyMinute = function () {
        return "varje minut";
    };
    ;
    sv.prototype.everyHour = function () {
        return "varje timme";
    };
    ;
    sv.prototype.atSpace = function () {
        return "Kl ";
    };
    ;
    sv.prototype.everyMinutebetweenX0AndX1 = function () {
        return "Varje minut mellan %s och %s";
    };
    ;
    sv.prototype.at = function () {
        return "Kl";
    };
    ;
    sv.prototype.spaceAnd = function () {
        return " och";
    };
    ;
    sv.prototype.everysecond = function () {
        return "varje sekund";
    };
    ;
    sv.prototype.everyX0Seconds = function () {
        return "varje %s sekund";
    };
    ;
    sv.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunderna från %s till och med %s efter minuten";
    };
    ;
    sv.prototype.atX0SecondsPastTheMinute = function () {
        return "på %s sekunder efter minuten";
    };
    ;
    sv.prototype.everyX0Minutes = function () {
        return "var %s minut";
    };
    ;
    sv.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuterna från %s till och med %s efter timmen";
    };
    ;
    sv.prototype.atX0MinutesPastTheHour = function () {
        return "på %s minuten efter timmen";
    };
    ;
    sv.prototype.everyX0Hours = function () {
        return "var %s timme";
    };
    ;
    sv.prototype.betweenX0AndX1 = function () {
        return "mellan %s och %s";
    };
    ;
    sv.prototype.atX0 = function () {
        return "kl %s";
    };
    ;
    sv.prototype.commaEveryDay = function () {
        return ", varje dag";
    };
    ;
    sv.prototype.commaEveryX0daysOfTheWeek = function () {
        return ", var %s dag i veckan";
    };
    ;
    sv.prototype.commaX0ThroughX1 = function () {
        return ", %s till %s";
    };
    ;
    sv.prototype.first = function () {
        return "första";
    };
    ;
    sv.prototype.second = function () {
        return "andra";
    };
    ;
    sv.prototype.third = function () {
        return "tredje";
    };
    ;
    sv.prototype.forth = function () {
        return "fjärde";
    };
    ;
    sv.prototype.fifth = function () {
        return "femte";
    };
    ;
    sv.prototype.commaOnThe = function () {
        return ", den ";
    };
    ;
    sv.prototype.spaceX0OfTheMonth = function () {
        return " %sen av månaden";
    };
    ;
    sv.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", på sista %s av månaden";
    };
    ;
    sv.prototype.commaOnlyOnX0 = function () {
        return ", varje %s";
    };
    ;
    sv.prototype.commaEveryX0Months = function () {
        return ", var %s månad";
    };
    ;
    sv.prototype.commaOnlyInX0 = function () {
        return ", bara på %s";
    };
    ;
    sv.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", på sista dagen av månaden";
    };
    ;
    sv.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", på sista veckodag av månaden";
    };
    ;
    sv.prototype.firstWeekday = function () {
        return "första veckodag";
    };
    ;
    sv.prototype.weekdayNearestDayX0 = function () {
        return "veckodagen närmast dag %s";
    };
    ;
    sv.prototype.commaOnTheX0OfTheMonth = function () {
        return ", på den %s av månaden";
    };
    ;
    sv.prototype.commaEveryX0Days = function () {
        return ", var %s dag";
    };
    ;
    sv.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mellan dag %s och %s av månaden";
    };
    ;
    sv.prototype.commaOnDayX0OfTheMonth = function () {
        return ", på dag %s av månaden";
    };
    ;
    sv.prototype.spaceAndSpace = function () {
        return " och ";
    };
    ;
    sv.prototype.commaEveryMinute = function () {
        return ", varje minut";
    };
    ;
    sv.prototype.commaEveryHour = function () {
        return ", varje timme";
    };
    ;
    sv.prototype.commaEveryX0Years = function () {
        return ", var %s år";
    };
    ;
    sv.prototype.commaStartingX0 = function () {
        return ", startar %s";
    };
    ;
    sv.prototype.daysOfTheWeek = function () {
        return ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"];
    };
    sv.prototype.monthsOfTheYear = function () {
        return ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];
    };
    return sv;
}());
exports.sv = sv;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tr = (function () {
    function tr() {
    }
    tr.prototype.atX0SecondsPastTheMinuteGt20 = function () { return null; };
    tr.prototype.atX0MinutesPastTheHourGt20 = function () { return null; };
    tr.prototype.commaMonthX0ThroughMonthX1 = function () { return null; };
    tr.prototype.commaYearX0ThroughYearX1 = function () { return null; };
    tr.prototype.use24HourTimeFormatByDefault = function () { return true; };
    tr.prototype.everyMinute = function () {
        return "her dakika";
    };
    tr.prototype.everyHour = function () {
        return "her saat";
    };
    tr.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "İfade açıklamasını oluştururken bir hata oluştu. Cron ifadesini gözden geçirin.";
    };
    tr.prototype.atSpace = function () {
        return "Saat ";
    };
    tr.prototype.everyMinutebetweenX0AndX1 = function () {
        return "Saat %s ve %s arasındaki her dakika";
    };
    tr.prototype.at = function () {
        return "Saat";
    };
    tr.prototype.spaceAnd = function () {
        return " ve";
    };
    tr.prototype.everysecond = function () {
        return "her saniye";
    };
    tr.prototype.everyX0Seconds = function () {
        return "her %s saniyede bir";
    };
    tr.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "dakikaların %s. ve %s. saniyeleri arası";
    };
    tr.prototype.atX0SecondsPastTheMinute = function () {
        return "dakikaların %s. saniyesinde";
    };
    tr.prototype.everyX0Minutes = function () {
        return "her %s dakikada bir";
    };
    tr.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "saatlerin %s. ve %s. dakikaları arası";
    };
    tr.prototype.atX0MinutesPastTheHour = function () {
        return "saatlerin %s. dakikasında";
    };
    tr.prototype.everyX0Hours = function () {
        return "her %s saatte";
    };
    tr.prototype.betweenX0AndX1 = function () {
        return "%s ile %s arasında";
    };
    tr.prototype.atX0 = function () {
        return "saat %s";
    };
    tr.prototype.commaEveryDay = function () {
        return ", her gün";
    };
    tr.prototype.commaEveryX0daysOfTheWeek = function () {
        return ", ayın her %s günü";
    };
    tr.prototype.commaX0ThroughX1 = function () {
        return ", %s ile %s arasında";
    };
    tr.prototype.first = function () {
        return "ilk";
    };
    tr.prototype.second = function () {
        return "ikinci";
    };
    tr.prototype.third = function () {
        return "üçüncü";
    };
    tr.prototype.forth = function () {
        return "dördüncü";
    };
    tr.prototype.fifth = function () {
        return "beşinci";
    };
    tr.prototype.commaOnThe = function () {
        return ", ayın ";
    };
    tr.prototype.spaceX0OfTheMonth = function () {
        return " %s günü";
    };
    tr.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ayın son %s günü";
    };
    tr.prototype.commaOnlyOnX0 = function () {
        return ", sadece %s günü";
    };
    tr.prototype.commaEveryX0Months = function () {
        return ", %s ayda bir";
    };
    tr.prototype.commaOnlyInX0 = function () {
        return ", sadece %s için";
    };
    tr.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ayın son günü";
    };
    tr.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ayın son iş günü";
    };
    tr.prototype.firstWeekday = function () {
        return "ilk iş günü";
    };
    tr.prototype.weekdayNearestDayX0 = function () {
        return "%s. günü sonrasındaki ilk iş günü";
    };
    tr.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ayın %s";
    };
    tr.prototype.commaEveryX0Days = function () {
        return ", %s günde bir";
    };
    tr.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", ayın %s. ve %s. günleri arası";
    };
    tr.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ayın %s. günü";
    };
    tr.prototype.spaceAndSpace = function () {
        return " ve ";
    };
    tr.prototype.commaEveryMinute = function () {
        return ", her dakika";
    };
    tr.prototype.commaEveryHour = function () {
        return ", her saat";
    };
    tr.prototype.commaEveryX0Years = function () {
        return ", %s yılda bir";
    };
    tr.prototype.commaStartingX0 = function () {
        return ", başlangıç %s";
    };
    tr.prototype.daysOfTheWeek = function () {
        return ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    };
    tr.prototype.monthsOfTheYear = function () {
        return ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    };
    return tr;
}());
exports.tr = tr;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var uk = (function () {
    function uk() {
    }
    uk.prototype.atX0SecondsPastTheMinuteGt20 = function () { return null; };
    uk.prototype.atX0MinutesPastTheHourGt20 = function () { return null; };
    uk.prototype.commaMonthX0ThroughMonthX1 = function () { return null; };
    uk.prototype.commaYearX0ThroughYearX1 = function () { return null; };
    uk.prototype.use24HourTimeFormatByDefault = function () { return true; };
    uk.prototype.everyMinute = function () {
        return "щохвилини";
    };
    uk.prototype.everyHour = function () {
        return "щогодини";
    };
    uk.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "ВІдбулася помилка підчас генерації опису. Перевірта правильність написання cron виразу.";
    };
    uk.prototype.atSpace = function () {
        return "О ";
    };
    uk.prototype.everyMinutebetweenX0AndX1 = function () {
        return "Щохвилини між %s та %s";
    };
    uk.prototype.at = function () {
        return "О";
    };
    uk.prototype.spaceAnd = function () {
        return " та";
    };
    uk.prototype.everysecond = function () {
        return "Щосекунди";
    };
    uk.prototype.everyX0Seconds = function () {
        return "кожні %s секунд";
    };
    uk.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "з %s по %s секунду";
    };
    uk.prototype.atX0SecondsPastTheMinute = function () {
        return "о %s секунді";
    };
    uk.prototype.everyX0Minutes = function () {
        return "кожні %s хвилин";
    };
    uk.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "з %s по %s хвилину";
    };
    uk.prototype.atX0MinutesPastTheHour = function () {
        return "о %s хвилині";
    };
    uk.prototype.everyX0Hours = function () {
        return "кожні %s годин";
    };
    uk.prototype.betweenX0AndX1 = function () {
        return "між %s та %s";
    };
    uk.prototype.atX0 = function () {
        return "о %s";
    };
    uk.prototype.commaEveryDay = function () {
        return ", щоденно";
    };
    uk.prototype.commaEveryX0daysOfTheWeek = function () {
        return ", кожен %s день тижня";
    };
    uk.prototype.commaX0ThroughX1 = function () {
        return ", %s по %s";
    };
    uk.prototype.first = function () {
        return "перший";
    };
    uk.prototype.second = function () {
        return "другий";
    };
    uk.prototype.third = function () {
        return "третій";
    };
    uk.prototype.forth = function () {
        return "четвертий";
    };
    uk.prototype.fifth = function () {
        return "п'ятий";
    };
    uk.prototype.commaOnThe = function () {
        return ", в ";
    };
    uk.prototype.spaceX0OfTheMonth = function () {
        return " %s місяця";
    };
    uk.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", в останній %s місяця";
    };
    uk.prototype.commaOnlyOnX0 = function () {
        return ", тільки в %s";
    };
    uk.prototype.commaEveryX0Months = function () {
        return ", кожен %s місяць";
    };
    uk.prototype.commaOnlyInX0 = function () {
        return ", тільки в %s";
    };
    uk.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", в останній день місяця";
    };
    uk.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", в останній будень місяця";
    };
    uk.prototype.firstWeekday = function () {
        return "перший будень";
    };
    uk.prototype.weekdayNearestDayX0 = function () {
        return "будень найближчий до %s дня";
    };
    uk.prototype.commaOnTheX0OfTheMonth = function () {
        return ", в %s місяця";
    };
    uk.prototype.commaEveryX0Days = function () {
        return ", кожен %s день";
    };
    uk.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", між %s та %s днями місяця";
    };
    uk.prototype.commaOnDayX0OfTheMonth = function () {
        return ", на %s день місяця";
    };
    uk.prototype.spaceAndSpace = function () {
        return " та ";
    };
    uk.prototype.commaEveryMinute = function () {
        return ", щохвилини";
    };
    uk.prototype.commaEveryHour = function () {
        return ", щогодини";
    };
    uk.prototype.commaEveryX0Years = function () {
        return ", кожні %s роки";
    };
    uk.prototype.commaStartingX0 = function () {
        return ", початок %s";
    };
    uk.prototype.daysOfTheWeek = function () {
        return ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"];
    };
    uk.prototype.monthsOfTheYear = function () {
        return ["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"];
    };
    return uk;
}());
exports.uk = uk;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zh_CN = (function () {
    function zh_CN() {
    }
    zh_CN.prototype.atX0SecondsPastTheMinuteGt20 = function () { return null; };
    zh_CN.prototype.atX0MinutesPastTheHourGt20 = function () { return null; };
    zh_CN.prototype.commaMonthX0ThroughMonthX1 = function () { return null; };
    zh_CN.prototype.commaYearX0ThroughYearX1 = function () { return null; };
    zh_CN.prototype.use24HourTimeFormatByDefault = function () { return false; };
    zh_CN.prototype.everyMinute = function () {
        return "每分钟";
    };
    zh_CN.prototype.everyHour = function () {
        return "每小时";
    };
    zh_CN.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "生成表达式描述时发生了错误，请检查cron表达式语法。";
    };
    zh_CN.prototype.atSpace = function () {
        return "在 ";
    };
    zh_CN.prototype.everyMinutebetweenX0AndX1 = function () {
        return "在 %s 和 %s 之间的每分钟";
    };
    zh_CN.prototype.at = function () {
        return "在";
    };
    zh_CN.prototype.spaceAnd = function () {
        return " 和";
    };
    zh_CN.prototype.everysecond = function () {
        return "每秒";
    };
    zh_CN.prototype.everyX0Seconds = function () {
        return "每 %s 秒";
    };
    zh_CN.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "在每分钟的 %s 到 %s 秒";
    };
    zh_CN.prototype.atX0SecondsPastTheMinute = function () {
        return "在每分钟的 %s 秒";
    };
    zh_CN.prototype.everyX0Minutes = function () {
        return "每 %s 分钟";
    };
    zh_CN.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "在每小时的 %s 到 %s 分钟";
    };
    zh_CN.prototype.atX0MinutesPastTheHour = function () {
        return "在每小时的 %s 分";
    };
    zh_CN.prototype.everyX0Hours = function () {
        return "每 %s 小时";
    };
    zh_CN.prototype.betweenX0AndX1 = function () {
        return "在 %s 和 %s 之间";
    };
    zh_CN.prototype.atX0 = function () {
        return "在 %s";
    };
    zh_CN.prototype.commaEveryDay = function () {
        return ", 每天";
    };
    zh_CN.prototype.commaEveryX0daysOfTheWeek = function () {
        return ", 每周的每 %s 天";
    };
    zh_CN.prototype.commaX0ThroughX1 = function () {
        return ", %s 到 %s";
    };
    zh_CN.prototype.first = function () {
        return "第一个";
    };
    zh_CN.prototype.second = function () {
        return "第二个";
    };
    zh_CN.prototype.third = function () {
        return "第三个";
    };
    zh_CN.prototype.forth = function () {
        return "第四个";
    };
    zh_CN.prototype.fifth = function () {
        return "第五个";
    };
    zh_CN.prototype.commaOnThe = function () {
        return ", 在 ";
    };
    zh_CN.prototype.spaceX0OfTheMonth = function () {
        return "%s 每月";
    };
    zh_CN.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", 每月的最后一个 %s ";
    };
    zh_CN.prototype.commaOnlyOnX0 = function () {
        return ", 仅在 %s";
    };
    zh_CN.prototype.commaEveryX0Months = function () {
        return ", 每 %s 月";
    };
    zh_CN.prototype.commaOnlyInX0 = function () {
        return ", 仅在 %s";
    };
    zh_CN.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", 每月的最后一天";
    };
    zh_CN.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", 每月的最后一个平日";
    };
    zh_CN.prototype.firstWeekday = function () {
        return "第一个平日";
    };
    zh_CN.prototype.weekdayNearestDayX0 = function () {
        return "最接近 %s 号的平日";
    };
    zh_CN.prototype.commaOnTheX0OfTheMonth = function () {
        return ", 每月的 %s ";
    };
    zh_CN.prototype.commaEveryX0Days = function () {
        return ", 每 %s 天";
    };
    zh_CN.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", 在每月的 %s 和 %s 号之间";
    };
    zh_CN.prototype.commaOnDayX0OfTheMonth = function () {
        return ", 每月的 %s 号";
    };
    zh_CN.prototype.spaceAndSpace = function () {
        return " 和 ";
    };
    zh_CN.prototype.commaEveryMinute = function () {
        return ", 每分钟";
    };
    zh_CN.prototype.commaEveryHour = function () {
        return ", 每小时";
    };
    zh_CN.prototype.commaEveryX0Years = function () {
        return ", 每 %s 年";
    };
    zh_CN.prototype.commaStartingX0 = function () {
        return ", 开始 %s";
    };
    zh_CN.prototype.daysOfTheWeek = function () {
        return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    };
    zh_CN.prototype.monthsOfTheYear = function () {
        return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    };
    return zh_CN;
}());
exports.zh_CN = zh_CN;


/***/ })
/******/ ]);
});