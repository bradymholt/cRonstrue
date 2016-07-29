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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var expressionDescriptor_1 = __webpack_require__(1);
	var allLocalesLoader_1 = __webpack_require__(6);
	expressionDescriptor_1.ExpressionDescriptor.initialize(new allLocalesLoader_1.allLocalesLoader());
	module.exports = expressionDescriptor_1.ExpressionDescriptor;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var stringUtilities_1 = __webpack_require__(2);
	var cronParser_1 = __webpack_require__(3);
	var ExpressionDescriptor = (function () {
	    function ExpressionDescriptor(expression, options) {
	        this.expression = expression;
	        this.options = options;
	        this.expressionParts = new Array(5);
	        if (ExpressionDescriptor.locales[options.locale]) {
	            this.i18n = ExpressionDescriptor.locales[options.locale];
	        }
	        else {
	            this.i18n = ExpressionDescriptor.locales["en"];
	        }
	        if (options.use24HourTimeFormat === undefined) {
	            options.use24HourTimeFormat = this.i18n.Use24HourTimeFormatByDefault();
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
	    ExpressionDescriptor.locale = function (localeName) {
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
	                description = this.i18n.AnErrorOccuredWhenGeneratingTheExpressionD();
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
	            description += this.i18n.AtSpace() + this.formatTime(hourExpression, minuteExpression, secondsExpression);
	        }
	        else if (minuteExpression.indexOf("-") > -1
	            && !(minuteExpression.indexOf(",") > -1)
	            && !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters)) {
	            var minuteParts = minuteExpression.split("-");
	            description += stringUtilities_1.StringUtilities.format(this.i18n.EveryMinuteBetweenX0AndX1(), this.formatTime(hourExpression, minuteParts[0], ""), this.formatTime(hourExpression, minuteParts[1], ""));
	        }
	        else if (hourExpression.indexOf(",") > -1 && !stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters)) {
	            var hourParts = hourExpression.split(",");
	            description += this.i18n.At();
	            for (var i = 0; i < hourParts.length; i++) {
	                description += " ";
	                description += this.formatTime(hourParts[i], minuteExpression, "");
	                if (i < (hourParts.length - 2)) {
	                    description += ",";
	                }
	                if (i == hourParts.length - 2) {
	                    description += this.i18n.SpaceAnd();
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
	        var description = this.getSegmentDescription(this.expressionParts[0], this.i18n.EverySecond(), function (s) { return s; }, function (s) { return stringUtilities_1.StringUtilities.format(_this.i18n.EveryX0Seconds(), s); }, function (s) { return _this.i18n.SecondsX0ThroughX1PastTheMinute(); }, function (s) {
	            return s == "0" ? "" : parseInt(s) < 20
	                ? _this.i18n.AtX0SecondsPastTheMinute()
	                : _this.i18n.AtX0SecondsPastTheMinuteGt20() || _this.i18n.AtX0SecondsPastTheMinute();
	        });
	        return description;
	    };
	    ExpressionDescriptor.prototype.getMinutesDescription = function () {
	        var _this = this;
	        var description = this.getSegmentDescription(this.expressionParts[1], this.i18n.EveryMinute(), function (s) { return s; }, function (s) { return stringUtilities_1.StringUtilities.format(_this.i18n.EveryX0Minutes(), s); }, function (s) { return _this.i18n.MinutesX0ThroughX1PastTheHour(); }, function (s) {
	            try {
	                return s == "0" ? "" : parseInt(s) < 20
	                    ? _this.i18n.AtX0MinutesPastTheHour()
	                    : _this.i18n.AtX0MinutesPastTheHourGt20() || _this.i18n.AtX0MinutesPastTheHour();
	            }
	            catch (e) {
	                return _this.i18n.AtX0MinutesPastTheHour();
	            }
	        });
	        return description;
	    };
	    ExpressionDescriptor.prototype.getHoursDescription = function () {
	        var _this = this;
	        var expression = this.expressionParts[2];
	        var description = this.getSegmentDescription(expression, this.i18n.EveryHour(), function (s) { return _this.formatTime(s, "0", ""); }, function (s) { return stringUtilities_1.StringUtilities.format(_this.i18n.EveryX0Hours(), s); }, function (s) { return _this.i18n.BetweenX0AndX1(); }, function (s) { return _this.i18n.AtX0(); });
	        return description;
	    };
	    ExpressionDescriptor.prototype.getDayOfWeekDescription = function () {
	        var _this = this;
	        var daysOfWeekNames = this.i18n.DaysOfTheWeek();
	        var description = this.getSegmentDescription(this.expressionParts[5], this.i18n.ComaEveryDay(), function (s) {
	            var exp = s;
	            if (s.indexOf("#") > -1) {
	                exp = s.substr(0, s.indexOf("#"));
	            }
	            else if (s.indexOf("L") > -1) {
	                exp = exp.replace("L", "");
	            }
	            return daysOfWeekNames[parseInt(exp)];
	        }, function (s) { return stringUtilities_1.StringUtilities.format(_this.i18n.ComaEveryX0DaysOfTheWeek(), s); }, function (s) { return _this.i18n.ComaX0ThroughX1(); }, function (s) {
	            var format = null;
	            if (s.indexOf("#") > -1) {
	                var dayOfWeekOfMonthNumber = s.substring(s.indexOf("#") + 1);
	                var dayOfWeekOfMonthDescription = null;
	                switch (dayOfWeekOfMonthNumber) {
	                    case "1":
	                        dayOfWeekOfMonthDescription = _this.i18n.First();
	                        break;
	                    case "2":
	                        dayOfWeekOfMonthDescription = _this.i18n.Second();
	                        break;
	                    case "3":
	                        dayOfWeekOfMonthDescription = _this.i18n.Third();
	                        break;
	                    case "4":
	                        dayOfWeekOfMonthDescription = _this.i18n.Forth();
	                        break;
	                    case "5":
	                        dayOfWeekOfMonthDescription = _this.i18n.Fifth();
	                        break;
	                }
	                format = _this.i18n.ComaOnThe() + dayOfWeekOfMonthDescription + _this.i18n.SpaceX0OfTheMonth();
	            }
	            else if (s.indexOf("L") > -1) {
	                format = _this.i18n.ComaOnTheLastX0OfTheMonth();
	            }
	            else {
	                format = _this.i18n.ComaOnlyOnX0();
	            }
	            return format;
	        });
	        return description;
	    };
	    ExpressionDescriptor.prototype.getMonthDescription = function () {
	        var _this = this;
	        var monthNames = this.i18n.MonthsOfTheYear();
	        var description = this.getSegmentDescription(this.expressionParts[4], "", function (s) { return monthNames[(parseInt(s) - 1)]; }, function (s) { return stringUtilities_1.StringUtilities.format(_this.i18n.ComaEveryX0Months(), s); }, function (s) { return _this.i18n.ComaMonthX0ThroughMonthX1() || _this.i18n.ComaX0ThroughX1(); }, function (s) { return _this.i18n.ComaOnlyInX0(); });
	        return description;
	    };
	    ExpressionDescriptor.prototype.getDayOfMonthDescription = function () {
	        var _this = this;
	        var description = null;
	        var expression = this.expressionParts[3];
	        switch (expression) {
	            case "L":
	                description = this.i18n.ComaOnTheLastDayOfTheMonth();
	                break;
	            case "WL":
	            case "LW":
	                description = this.i18n.ComaOnTheLastWeekdayOfTheMonth();
	                break;
	            default:
	                var matches = expression.match(/(\d{1,2}W)|(W\d{1,2})/);
	                if (matches) {
	                    var dayNumber = parseInt(matches[0].replace("W", ""));
	                    var dayString = dayNumber == 1 ? this.i18n.FirstWeekday() :
	                        stringUtilities_1.StringUtilities.format(this.i18n.WeekdayNearestDayX0(), dayNumber.toString());
	                    description = stringUtilities_1.StringUtilities.format(this.i18n.ComaOnTheX0OfTheMonth(), dayString);
	                    break;
	                }
	                else {
	                    description = this.getSegmentDescription(expression, this.i18n.ComaEveryDay(), function (s) { return s; }, function (s) {
	                        return s == "1" ? _this.i18n.ComaEveryDay() :
	                            _this.i18n.ComaEveryX0Days();
	                    }, function (s) { return _this.i18n.ComaBetweenDayX0AndX1OfTheMonth(); }, function (s) { return _this.i18n.ComaOnDayX0OfTheMonth(); });
	                    break;
	                }
	        }
	        return description;
	    };
	    ExpressionDescriptor.prototype.getYearDescription = function () {
	        var _this = this;
	        var description = this.getSegmentDescription(this.expressionParts[6], "", function (s) { return /^\d+$/.test(s) ? new Date(parseInt(s), 1).getFullYear().toString() : s; }, function (s) { return stringUtilities_1.StringUtilities.format(_this.i18n.ComaEveryX0Years(), s); }, function (s) { return _this.i18n.ComaYearX0ThroughYearX1() || _this.i18n.ComaX0ThroughX1(); }, function (s) { return _this.i18n.ComaOnlyInX0(); });
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
	                description += stringUtilities_1.StringUtilities.format(this.i18n.CommaStartingX0(), rangeItemDescription);
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
	                    descriptionContent += this.i18n.SpaceAndSpace();
	                }
	                if (segments[i].indexOf("-") > -1) {
	                    var betweenSegmentDescription = this.generateBetweenSegmentDescription(segments[i], (function (s) { return _this.i18n.ComaX0ThroughX1(); }), getSingleItemDescription);
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
	            description = description.replace(new RegExp(this.i18n.ComaEveryMinute(), 'g'), "");
	            description = description.replace(new RegExp(this.i18n.ComaEveryHour(), 'g'), "");
	            description = description.replace(new RegExp(this.i18n.ComaEveryDay(), 'g'), "");
	        }
	        return description;
	    };
	    ExpressionDescriptor.locales = {};
	    return ExpressionDescriptor;
	}());
	exports.ExpressionDescriptor = ExpressionDescriptor;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
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
	        if (!this.dayOfWeekStartIndexZero) {
	            expressionParts[5] = expressionParts[5].replace(/(^\d)|([^#/\s]\d)+/g, function (t) {
	                var dowDigits = t.replace(/\D/, "");
	                var dowDigitsAdjusted = (parseInt(dowDigits) - 1).toString();
	                return t.replace(dowDigits, dowDigitsAdjusted);
	            });
	        }
	        if (expressionParts[3] == "?") {
	            expressionParts[3] = "*";
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


/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var en = (function () {
	    function en() {
	    }
	    en.prototype.AtX0SecondsPastTheMinuteGt20 = function () { return null; };
	    en.prototype.AtX0MinutesPastTheHourGt20 = function () { return null; };
	    en.prototype.ComaMonthX0ThroughMonthX1 = function () { return null; };
	    en.prototype.ComaYearX0ThroughYearX1 = function () { return null; };
	    en.prototype.Use24HourTimeFormatByDefault = function () { return false; };
	    en.prototype.AnErrorOccuredWhenGeneratingTheExpressionD = function () {
	        return "An error occured when generating the expression description.  Check the cron expression syntax.";
	    };
	    ;
	    en.prototype.EveryMinute = function () {
	        return "every minute";
	    };
	    ;
	    en.prototype.EveryHour = function () {
	        return "every hour";
	    };
	    ;
	    en.prototype.AtSpace = function () {
	        return "At ";
	    };
	    ;
	    en.prototype.EveryMinuteBetweenX0AndX1 = function () {
	        return "Every minute between %s and %s";
	    };
	    ;
	    en.prototype.At = function () {
	        return "At";
	    };
	    ;
	    en.prototype.SpaceAnd = function () {
	        return " and";
	    };
	    ;
	    en.prototype.EverySecond = function () {
	        return "every second";
	    };
	    ;
	    en.prototype.EveryX0Seconds = function () {
	        return "every %s seconds";
	    };
	    ;
	    en.prototype.SecondsX0ThroughX1PastTheMinute = function () {
	        return "seconds %s through %s past the minute";
	    };
	    ;
	    en.prototype.AtX0SecondsPastTheMinute = function () {
	        return "at %s seconds past the minute";
	    };
	    ;
	    en.prototype.EveryX0Minutes = function () {
	        return "every %s minutes";
	    };
	    ;
	    en.prototype.MinutesX0ThroughX1PastTheHour = function () {
	        return "minutes %s through %s past the hour";
	    };
	    ;
	    en.prototype.AtX0MinutesPastTheHour = function () {
	        return "at %s minutes past the hour";
	    };
	    ;
	    en.prototype.EveryX0Hours = function () {
	        return "every %s hours";
	    };
	    ;
	    en.prototype.BetweenX0AndX1 = function () {
	        return "between %s and %s";
	    };
	    ;
	    en.prototype.AtX0 = function () {
	        return "at %s";
	    };
	    ;
	    en.prototype.ComaEveryDay = function () {
	        return ", every day";
	    };
	    ;
	    en.prototype.ComaEveryX0DaysOfTheWeek = function () {
	        return ", every %s days of the week";
	    };
	    ;
	    en.prototype.ComaX0ThroughX1 = function () {
	        return ", %s through %s";
	    };
	    ;
	    en.prototype.First = function () {
	        return "first";
	    };
	    ;
	    en.prototype.Second = function () {
	        return "second";
	    };
	    ;
	    en.prototype.Third = function () {
	        return "third";
	    };
	    ;
	    en.prototype.Forth = function () {
	        return "forth";
	    };
	    ;
	    en.prototype.Fifth = function () {
	        return "fifth";
	    };
	    ;
	    en.prototype.ComaOnThe = function () {
	        return ", on the ";
	    };
	    ;
	    en.prototype.SpaceX0OfTheMonth = function () {
	        return " %s of the month";
	    };
	    ;
	    en.prototype.ComaOnTheLastX0OfTheMonth = function () {
	        return ", on the last %s of the month";
	    };
	    ;
	    en.prototype.ComaOnlyOnX0 = function () {
	        return ", only on %s";
	    };
	    ;
	    en.prototype.ComaEveryX0Months = function () {
	        return ", every %s months";
	    };
	    ;
	    en.prototype.ComaOnlyInX0 = function () {
	        return ", only in %s";
	    };
	    ;
	    en.prototype.ComaOnTheLastDayOfTheMonth = function () {
	        return ", on the last day of the month";
	    };
	    ;
	    en.prototype.ComaOnTheLastWeekdayOfTheMonth = function () {
	        return ", on the last weekday of the month";
	    };
	    ;
	    en.prototype.FirstWeekday = function () {
	        return "first weekday";
	    };
	    ;
	    en.prototype.WeekdayNearestDayX0 = function () {
	        return "weekday nearest day %s";
	    };
	    ;
	    en.prototype.ComaOnTheX0OfTheMonth = function () {
	        return ", on the %s of the month";
	    };
	    ;
	    en.prototype.ComaEveryX0Days = function () {
	        return ", every %s days";
	    };
	    ;
	    en.prototype.ComaBetweenDayX0AndX1OfTheMonth = function () {
	        return ", between day %s and %s of the month";
	    };
	    ;
	    en.prototype.ComaOnDayX0OfTheMonth = function () {
	        return ", on day %s of the month";
	    };
	    ;
	    en.prototype.SpaceAndSpace = function () {
	        return " and ";
	    };
	    ;
	    en.prototype.ComaEveryMinute = function () {
	        return ", every minute";
	    };
	    ;
	    en.prototype.ComaEveryHour = function () {
	        return ", every hour";
	    };
	    ;
	    en.prototype.ComaEveryX0Years = function () {
	        return ", every %s years";
	    };
	    ;
	    en.prototype.CommaStartingX0 = function () {
	        return ", starting %s";
	    };
	    ;
	    en.prototype.DaysOfTheWeek = function () {
	        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	    };
	    en.prototype.MonthsOfTheYear = function () {
	        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	    };
	    return en;
	}());
	exports.en = en;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var allLocales = __webpack_require__(7);
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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var en_1 = __webpack_require__(5);
	exports.en = en_1.en;
	var de_1 = __webpack_require__(8);
	exports.de = de_1.de;
	var es_1 = __webpack_require__(9);
	exports.es = es_1.es;
	var fr_1 = __webpack_require__(10);
	exports.fr = fr_1.fr;
	var it_1 = __webpack_require__(11);
	exports.it = it_1.it;
	var nl_1 = __webpack_require__(12);
	exports.nl = nl_1.nl;
	var nb_1 = __webpack_require__(13);
	exports.nb = nb_1.nb;
	var pl_1 = __webpack_require__(14);
	exports.pl = pl_1.pl;
	var pt_BR_1 = __webpack_require__(15);
	exports.pt_BR = pt_BR_1.pt_BR;
	var ro_1 = __webpack_require__(16);
	exports.ro = ro_1.ro;
	var ru_1 = __webpack_require__(17);
	exports.ru = ru_1.ru;
	var tr_1 = __webpack_require__(18);
	exports.tr = tr_1.tr;
	var uk_1 = __webpack_require__(19);
	exports.uk = uk_1.uk;
	var zh_CN_1 = __webpack_require__(20);
	exports.zh_CN = zh_CN_1.zh_CN;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	var de = (function () {
	    function de() {
	    }
	    de.prototype.AtX0SecondsPastTheMinuteGt20 = function () { return null; };
	    de.prototype.AtX0MinutesPastTheHourGt20 = function () { return null; };
	    de.prototype.ComaMonthX0ThroughMonthX1 = function () { return null; };
	    de.prototype.ComaYearX0ThroughYearX1 = function () { return null; };
	    de.prototype.Use24HourTimeFormatByDefault = function () { return true; };
	    de.prototype.EveryMinute = function () {
	        return "jede Minute";
	    };
	    de.prototype.EveryHour = function () {
	        return "jede Stunde";
	    };
	    de.prototype.AnErrorOccuredWhenGeneratingTheExpressionD = function () {
	        return "An error occured when generating the expression description.  Check the cron expression syntax.";
	    };
	    de.prototype.AtSpace = function () {
	        return "Um ";
	    };
	    de.prototype.EveryMinuteBetweenX0AndX1 = function () {
	        return "Jede Minute zwischen %s und %s";
	    };
	    de.prototype.At = function () {
	        return "Um";
	    };
	    de.prototype.SpaceAnd = function () {
	        return " und";
	    };
	    de.prototype.EverySecond = function () {
	        return "Jede Sekunde";
	    };
	    de.prototype.EveryX0Seconds = function () {
	        return "alle %s Sekunden";
	    };
	    de.prototype.SecondsX0ThroughX1PastTheMinute = function () {
	        return "Sekunden %s bis %s";
	    };
	    de.prototype.AtX0SecondsPastTheMinute = function () {
	        return "bei Sekunde %s";
	    };
	    de.prototype.EveryX0Minutes = function () {
	        return "alle %s Minuten";
	    };
	    de.prototype.MinutesX0ThroughX1PastTheHour = function () {
	        return "Minuten %s bis %s";
	    };
	    de.prototype.AtX0MinutesPastTheHour = function () {
	        return "bei Minute %s";
	    };
	    de.prototype.EveryX0Hours = function () {
	        return "alle %s Stunden";
	    };
	    de.prototype.BetweenX0AndX1 = function () {
	        return "zwischen %s und %s";
	    };
	    de.prototype.AtX0 = function () {
	        return "um %s";
	    };
	    de.prototype.ComaEveryDay = function () {
	        return ", jeden Tag";
	    };
	    de.prototype.ComaEveryX0DaysOfTheWeek = function () {
	        return ", every %s days of the week";
	    };
	    de.prototype.ComaX0ThroughX1 = function () {
	        return ", %s bis %s";
	    };
	    de.prototype.First = function () {
	        return "ersten";
	    };
	    de.prototype.Second = function () {
	        return "zweiten";
	    };
	    de.prototype.Third = function () {
	        return "dritten";
	    };
	    de.prototype.Forth = function () {
	        return "vierten";
	    };
	    de.prototype.Fifth = function () {
	        return "fünften";
	    };
	    de.prototype.ComaOnThe = function () {
	        return ", am ";
	    };
	    de.prototype.SpaceX0OfTheMonth = function () {
	        return " %s des Monats";
	    };
	    de.prototype.ComaOnTheLastX0OfTheMonth = function () {
	        return ", am letzten %s des Monats";
	    };
	    de.prototype.ComaOnlyOnX0 = function () {
	        return ", nur am %s";
	    };
	    de.prototype.ComaEveryX0Months = function () {
	        return ", alle %s Monate";
	    };
	    de.prototype.ComaOnlyInX0 = function () {
	        return ", nur im %s";
	    };
	    de.prototype.ComaOnTheLastDayOfTheMonth = function () {
	        return ", am letzten Tag des Monats";
	    };
	    de.prototype.ComaOnTheLastWeekdayOfTheMonth = function () {
	        return ", am letzten Werktag des Monats";
	    };
	    de.prototype.FirstWeekday = function () {
	        return "ersten Werktag";
	    };
	    de.prototype.WeekdayNearestDayX0 = function () {
	        return "Werktag am nächsten zum %s Tag";
	    };
	    de.prototype.ComaOnTheX0OfTheMonth = function () {
	        return ", am %s des Monats";
	    };
	    de.prototype.ComaEveryX0Days = function () {
	        return ", alle %s Tage";
	    };
	    de.prototype.ComaBetweenDayX0AndX1OfTheMonth = function () {
	        return ", zwischen Tag %s und %s des Monats";
	    };
	    de.prototype.ComaOnDayX0OfTheMonth = function () {
	        return ", am %s Tag des Monats";
	    };
	    de.prototype.SpaceAndSpace = function () {
	        return " und ";
	    };
	    de.prototype.ComaEveryMinute = function () {
	        return ", jede Minute";
	    };
	    de.prototype.ComaEveryHour = function () {
	        return ", jede Stunde";
	    };
	    de.prototype.ComaEveryX0Years = function () {
	        return ", alle %s Jahre";
	    };
	    de.prototype.CommaStartingX0 = function () {
	        return ", beginnend %s";
	    };
	    de.prototype.DaysOfTheWeek = function () {
	        return ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
	    };
	    de.prototype.MonthsOfTheYear = function () {
	        return ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
	    };
	    return de;
	}());
	exports.de = de;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	var es = (function () {
	    function es() {
	    }
	    es.prototype.AtX0SecondsPastTheMinuteGt20 = function () { return null; };
	    es.prototype.AtX0MinutesPastTheHourGt20 = function () { return null; };
	    es.prototype.ComaMonthX0ThroughMonthX1 = function () { return null; };
	    es.prototype.ComaYearX0ThroughYearX1 = function () { return null; };
	    es.prototype.Use24HourTimeFormatByDefault = function () { return false; };
	    es.prototype.AnErrorOccuredWhenGeneratingTheExpressionD = function () {
	        return "Ocurrió un error mientras se generaba la descripción de la expresión. Revise la sintaxis de la expresión de cron.";
	    };
	    ;
	    es.prototype.At = function () {
	        return "A las";
	    };
	    ;
	    es.prototype.AtSpace = function () {
	        return "A las ";
	    };
	    ;
	    es.prototype.AtX0 = function () {
	        return "a las %s";
	    };
	    ;
	    es.prototype.AtX0MinutesPastTheHour = function () {
	        return "a los %s minutos de la hora";
	    };
	    ;
	    es.prototype.AtX0SecondsPastTheMinute = function () {
	        return "a los %s segundos del minuto";
	    };
	    ;
	    es.prototype.BetweenX0AndX1 = function () {
	        return "entre las %s y las %s";
	    };
	    ;
	    es.prototype.ComaBetweenDayX0AndX1OfTheMonth = function () {
	        return ", entre los días %s y %s del mes";
	    };
	    ;
	    es.prototype.ComaEveryDay = function () {
	        return ", cada día";
	    };
	    ;
	    es.prototype.ComaEveryHour = function () {
	        return ", cada hora";
	    };
	    ;
	    es.prototype.ComaEveryMinute = function () {
	        return ", cada minuto";
	    };
	    ;
	    es.prototype.ComaEveryX0Days = function () {
	        return ", cada %s días";
	    };
	    ;
	    es.prototype.ComaEveryX0DaysOfTheWeek = function () {
	        return ", cada %s días de la semana";
	    };
	    ;
	    es.prototype.ComaEveryX0Months = function () {
	        return ", cada %s meses";
	    };
	    ;
	    es.prototype.ComaOnDayX0OfTheMonth = function () {
	        return ", el día %s del mes";
	    };
	    ;
	    es.prototype.ComaOnlyInX0 = function () {
	        return ", sólo en %s";
	    };
	    ;
	    es.prototype.ComaOnlyOnX0 = function () {
	        return ", sólo el %s";
	    };
	    ;
	    es.prototype.ComaOnThe = function () {
	        return ", en el ";
	    };
	    ;
	    es.prototype.ComaOnTheLastDayOfTheMonth = function () {
	        return ", en el último día del mes";
	    };
	    ;
	    es.prototype.ComaOnTheLastWeekdayOfTheMonth = function () {
	        return ", en el último día de la semana del mes";
	    };
	    ;
	    es.prototype.ComaOnTheLastX0OfTheMonth = function () {
	        return ", en el último %s del mes";
	    };
	    ;
	    es.prototype.ComaOnTheX0OfTheMonth = function () {
	        return ", en el %s del mes";
	    };
	    ;
	    es.prototype.ComaX0ThroughX1 = function () {
	        return ", de %s a %s";
	    };
	    ;
	    es.prototype.EveryHour = function () {
	        return "cada hora";
	    };
	    ;
	    es.prototype.EveryMinute = function () {
	        return "cada minuto";
	    };
	    ;
	    es.prototype.EveryMinuteBetweenX0AndX1 = function () {
	        return "cada minuto entre las %s y las %s";
	    };
	    ;
	    es.prototype.EverySecond = function () {
	        return "cada segundo";
	    };
	    ;
	    es.prototype.EveryX0Hours = function () {
	        return "cada %s horas";
	    };
	    ;
	    es.prototype.EveryX0Minutes = function () {
	        return "cada %s minutos";
	    };
	    ;
	    es.prototype.EveryX0Seconds = function () {
	        return "cada %s segundos";
	    };
	    ;
	    es.prototype.Fifth = function () {
	        return "quinto";
	    };
	    ;
	    es.prototype.First = function () {
	        return "primero";
	    };
	    ;
	    es.prototype.FirstWeekday = function () {
	        return "primer día de la semana";
	    };
	    ;
	    es.prototype.Forth = function () {
	        return "cuarto";
	    };
	    ;
	    es.prototype.MinutesX0ThroughX1PastTheHour = function () {
	        return "del minuto %s al %s pasada la hora";
	    };
	    ;
	    es.prototype.Second = function () {
	        return "segundo";
	    };
	    ;
	    es.prototype.SecondsX0ThroughX1PastTheMinute = function () {
	        return "En los segundos %s al %s de cada minuto";
	    };
	    ;
	    es.prototype.SpaceAnd = function () {
	        return " y";
	    };
	    ;
	    es.prototype.SpaceAndSpace = function () {
	        return " y ";
	    };
	    ;
	    es.prototype.SpaceX0OfTheMonth = function () {
	        return " %s del mes";
	    };
	    ;
	    es.prototype.Third = function () {
	        return "tercer";
	    };
	    ;
	    es.prototype.WeekdayNearestDayX0 = function () {
	        return "día de la semana más próximo al %s";
	    };
	    ;
	    es.prototype.ComaEveryX0Years = function () {
	        return ", cada %s años";
	    };
	    ;
	    es.prototype.CommaStartingX0 = function () {
	        return ", comenzando %s";
	    };
	    ;
	    es.prototype.DaysOfTheWeek = function () {
	        return ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
	    };
	    es.prototype.MonthsOfTheYear = function () {
	        return ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
	    };
	    return es;
	}());
	exports.es = es;


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	var fr = (function () {
	    function fr() {
	    }
	    fr.prototype.AtX0SecondsPastTheMinuteGt20 = function () { return null; };
	    fr.prototype.AtX0MinutesPastTheHourGt20 = function () { return null; };
	    fr.prototype.ComaMonthX0ThroughMonthX1 = function () { return null; };
	    fr.prototype.ComaYearX0ThroughYearX1 = function () { return null; };
	    fr.prototype.Use24HourTimeFormatByDefault = function () { return false; };
	    fr.prototype.EveryMinute = function () {
	        return "toutes les minutes";
	    };
	    fr.prototype.EveryHour = function () {
	        return "toutes les heures";
	    };
	    fr.prototype.AnErrorOccuredWhenGeneratingTheExpressionD = function () {
	        return "Une erreur est survenue en générant la description de l'expression cron. Vérifiez sa syntaxe.";
	    };
	    fr.prototype.AtSpace = function () {
	        return "À ";
	    };
	    fr.prototype.EveryMinuteBetweenX0AndX1 = function () {
	        return "Toutes les minutes entre %s et %s";
	    };
	    fr.prototype.At = function () {
	        return "À";
	    };
	    fr.prototype.SpaceAnd = function () {
	        return " et";
	    };
	    fr.prototype.EverySecond = function () {
	        return "toutes les secondes";
	    };
	    fr.prototype.EveryX0Seconds = function () {
	        return "toutes les %s secondes";
	    };
	    fr.prototype.SecondsX0ThroughX1PastTheMinute = function () {
	        return "les secondes entre %s et %s après la minute";
	    };
	    fr.prototype.AtX0SecondsPastTheMinute = function () {
	        return "%s secondes après la minute";
	    };
	    fr.prototype.EveryX0Minutes = function () {
	        return "toutes les %s minutes";
	    };
	    fr.prototype.MinutesX0ThroughX1PastTheHour = function () {
	        return "les minutes entre %s et %s après l'heure";
	    };
	    fr.prototype.AtX0MinutesPastTheHour = function () {
	        return "%s minutes après l'heure";
	    };
	    fr.prototype.EveryX0Hours = function () {
	        return "toutes les %s heures";
	    };
	    fr.prototype.BetweenX0AndX1 = function () {
	        return "de %s à %s";
	    };
	    fr.prototype.AtX0 = function () {
	        return "à %s";
	    };
	    fr.prototype.ComaEveryDay = function () {
	        return ", tous les jours";
	    };
	    fr.prototype.ComaEveryX0DaysOfTheWeek = function () {
	        return ", every %s days of the week";
	    };
	    fr.prototype.ComaX0ThroughX1 = function () {
	        return ", de %s à %s";
	    };
	    fr.prototype.First = function () {
	        return "premier";
	    };
	    fr.prototype.Second = function () {
	        return "second";
	    };
	    fr.prototype.Third = function () {
	        return "troisième";
	    };
	    fr.prototype.Forth = function () {
	        return "quatrième";
	    };
	    fr.prototype.Fifth = function () {
	        return "cinquième";
	    };
	    fr.prototype.ComaOnThe = function () {
	        return ", le ";
	    };
	    fr.prototype.SpaceX0OfTheMonth = function () {
	        return " %s du mois";
	    };
	    fr.prototype.ComaOnTheLastX0OfTheMonth = function () {
	        return ", le dernier %s du mois";
	    };
	    fr.prototype.ComaOnlyOnX0 = function () {
	        return ", uniquement le %s";
	    };
	    fr.prototype.ComaEveryX0Months = function () {
	        return ", tous les %s mois";
	    };
	    fr.prototype.ComaOnlyInX0 = function () {
	        return ", uniquement en %s";
	    };
	    fr.prototype.ComaOnTheLastDayOfTheMonth = function () {
	        return ", le dernier jour du mois";
	    };
	    fr.prototype.ComaOnTheLastWeekdayOfTheMonth = function () {
	        return ", le dernier jour ouvrable du mois";
	    };
	    fr.prototype.FirstWeekday = function () {
	        return "premier jour ouvrable";
	    };
	    fr.prototype.WeekdayNearestDayX0 = function () {
	        return "jour ouvrable le plus proche du %s";
	    };
	    fr.prototype.ComaOnTheX0OfTheMonth = function () {
	        return ", le %s du mois";
	    };
	    fr.prototype.ComaEveryX0Days = function () {
	        return ", tous les %s jours";
	    };
	    fr.prototype.ComaBetweenDayX0AndX1OfTheMonth = function () {
	        return ", du %s au %s du mois";
	    };
	    fr.prototype.ComaOnDayX0OfTheMonth = function () {
	        return ", le %s du mois";
	    };
	    fr.prototype.SpaceAndSpace = function () {
	        return " et ";
	    };
	    fr.prototype.ComaEveryMinute = function () {
	        return ", toutes les minutes";
	    };
	    fr.prototype.ComaEveryHour = function () {
	        return ", toutes les heures";
	    };
	    fr.prototype.ComaEveryX0Years = function () {
	        return ", tous les %s ans";
	    };
	    fr.prototype.ComaDaysX0ThroughX1 = function () {
	        return ", du %s au %s";
	    };
	    fr.prototype.WeekSpaceAndSpace = function () {
	        return " et le ";
	    };
	    fr.prototype.CommaStartingX0 = function () {
	        return ", départ %s";
	    };
	    fr.prototype.DaysOfTheWeek = function () {
	        return ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
	    };
	    fr.prototype.MonthsOfTheYear = function () {
	        return ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
	    };
	    return fr;
	}());
	exports.fr = fr;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	var it = (function () {
	    function it() {
	    }
	    it.prototype.AtX0SecondsPastTheMinuteGt20 = function () { return null; };
	    it.prototype.AtX0MinutesPastTheHourGt20 = function () { return null; };
	    it.prototype.ComaMonthX0ThroughMonthX1 = function () { return null; };
	    it.prototype.ComaYearX0ThroughYearX1 = function () { return null; };
	    it.prototype.Use24HourTimeFormatByDefault = function () { return true; };
	    it.prototype.AnErrorOccuredWhenGeneratingTheExpressionD = function () {
	        return "È verificato un errore durante la generazione la descrizione espressione. Controllare la sintassi delle espressioni cron.";
	    };
	    it.prototype.At = function () {
	        return "Alle";
	    };
	    it.prototype.AtSpace = function () {
	        return "Alle ";
	    };
	    it.prototype.AtX0 = function () {
	        return "alle %s";
	    };
	    it.prototype.AtX0MinutesPastTheHour = function () {
	        return "al %s minuto passata l'ora";
	    };
	    it.prototype.AtX0SecondsPastTheMinute = function () {
	        return "al %s secondo passato il minuto";
	    };
	    it.prototype.BetweenX0AndX1 = function () {
	        return "tra le %s e le %s";
	    };
	    it.prototype.ComaBetweenDayX0AndX1OfTheMonth = function () {
	        return ", tra il giorno %s e %s del mese";
	    };
	    it.prototype.ComaEveryDay = function () {
	        return ", ogni giorno";
	    };
	    it.prototype.ComaEveryHour = function () {
	        return ", ogni ora";
	    };
	    it.prototype.ComaEveryMinute = function () {
	        return ", ogni minuto";
	    };
	    it.prototype.ComaEveryX0Days = function () {
	        return ", ogni %s giorni";
	    };
	    it.prototype.ComaEveryX0DaysOfTheWeek = function () {
	        return ", ogni %s giorni della settimana";
	    };
	    it.prototype.ComaEveryX0Months = function () {
	        return ", ogni %s mesi";
	    };
	    it.prototype.ComaEveryX0Years = function () {
	        return ", ogni %s anni";
	    };
	    it.prototype.ComaOnDayX0OfTheMonth = function () {
	        return ", il giorno %s del mese";
	    };
	    it.prototype.ComaOnlyInX0 = function () {
	        return ", solo in %s";
	    };
	    it.prototype.ComaOnlyOnX0 = function () {
	        return ", solo il %s";
	    };
	    it.prototype.ComaOnThe = function () {
	        return ", il ";
	    };
	    it.prototype.ComaOnTheLastDayOfTheMonth = function () {
	        return ", l'ultimo giorno del mese";
	    };
	    it.prototype.ComaOnTheLastWeekdayOfTheMonth = function () {
	        return ", nell'ultima settimana del mese";
	    };
	    it.prototype.ComaOnTheLastX0OfTheMonth = function () {
	        return ", l'ultimo %s del mese";
	    };
	    it.prototype.ComaOnTheX0OfTheMonth = function () {
	        return ", il %s del mese";
	    };
	    it.prototype.ComaX0ThroughX1 = function () {
	        return ", %s al %s";
	    };
	    it.prototype.EveryHour = function () {
	        return "ogni ora";
	    };
	    it.prototype.EveryMinute = function () {
	        return "ogni minuto";
	    };
	    it.prototype.EveryMinuteBetweenX0AndX1 = function () {
	        return "Ogni minuto tra le %s e le %s";
	    };
	    it.prototype.EverySecond = function () {
	        return "ogni secondo";
	    };
	    it.prototype.EveryX0Hours = function () {
	        return "ogni %s ore";
	    };
	    it.prototype.EveryX0Minutes = function () {
	        return "ogni %s minuti";
	    };
	    it.prototype.EveryX0Seconds = function () {
	        return "ogni %s secondi";
	    };
	    it.prototype.Fifth = function () {
	        return "quinto";
	    };
	    it.prototype.First = function () {
	        return "primo";
	    };
	    it.prototype.FirstWeekday = function () {
	        return "primo giorno della settimana";
	    };
	    it.prototype.Forth = function () {
	        return "quarto";
	    };
	    it.prototype.MinutesX0ThroughX1PastTheHour = function () {
	        return "minuti %s al %s dopo l'ora";
	    };
	    it.prototype.Second = function () {
	        return "secondo";
	    };
	    it.prototype.SecondsX0ThroughX1PastTheMinute = function () {
	        return "secondi %s al %s oltre il minuto";
	    };
	    it.prototype.SpaceAnd = function () {
	        return " e";
	    };
	    it.prototype.SpaceAndSpace = function () {
	        return " e ";
	    };
	    it.prototype.SpaceX0OfTheMonth = function () {
	        return " %s del mese";
	    };
	    it.prototype.Third = function () {
	        return "terzo";
	    };
	    it.prototype.WeekdayNearestDayX0 = function () {
	        return "giorno della settimana più vicino al %s";
	    };
	    it.prototype.CommaStartingX0 = function () {
	        return ", a partire %s";
	    };
	    it.prototype.DaysOfTheWeek = function () {
	        return ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
	    };
	    it.prototype.MonthsOfTheYear = function () {
	        return ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
	    };
	    return it;
	}());
	exports.it = it;


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	var nl = (function () {
	    function nl() {
	    }
	    nl.prototype.AtX0SecondsPastTheMinuteGt20 = function () { return null; };
	    nl.prototype.AtX0MinutesPastTheHourGt20 = function () { return null; };
	    nl.prototype.ComaMonthX0ThroughMonthX1 = function () { return null; };
	    nl.prototype.ComaYearX0ThroughYearX1 = function () { return null; };
	    nl.prototype.Use24HourTimeFormatByDefault = function () { return false; };
	    nl.prototype.EveryMinute = function () {
	        return "elke minuut";
	    };
	    nl.prototype.EveryHour = function () {
	        return "elk uur";
	    };
	    nl.prototype.AnErrorOccuredWhenGeneratingTheExpressionD = function () {
	        return "Er is een fout opgetreden bij het vertalen van de gegevens. Controleer de gegevens.";
	    };
	    nl.prototype.AtSpace = function () {
	        return "Op ";
	    };
	    nl.prototype.EveryMinuteBetweenX0AndX1 = function () {
	        return "Elke minuut tussen %s en %s";
	    };
	    nl.prototype.At = function () {
	        return "Op";
	    };
	    nl.prototype.SpaceAnd = function () {
	        return " en";
	    };
	    nl.prototype.EverySecond = function () {
	        return "elke seconde";
	    };
	    nl.prototype.EveryX0Seconds = function () {
	        return "elke %s seconden";
	    };
	    nl.prototype.SecondsX0ThroughX1PastTheMinute = function () {
	        return "seconden %s t/m %s na de minuut";
	    };
	    nl.prototype.AtX0SecondsPastTheMinute = function () {
	        return "op %s seconden na de minuut";
	    };
	    nl.prototype.EveryX0Minutes = function () {
	        return "elke %s minuten";
	    };
	    nl.prototype.MinutesX0ThroughX1PastTheHour = function () {
	        return "minuut %s t/m %s na het uur";
	    };
	    nl.prototype.AtX0MinutesPastTheHour = function () {
	        return "op %s minuten na het uur";
	    };
	    nl.prototype.EveryX0Hours = function () {
	        return "elke %s uur";
	    };
	    nl.prototype.BetweenX0AndX1 = function () {
	        return "tussen %s en %s";
	    };
	    nl.prototype.AtX0 = function () {
	        return "op %s";
	    };
	    nl.prototype.ComaEveryDay = function () {
	        return ", elke dag";
	    };
	    nl.prototype.ComaEveryX0DaysOfTheWeek = function () {
	        return ", elke %s dagen van de week";
	    };
	    nl.prototype.ComaX0ThroughX1 = function () {
	        return ", %s t/m %s";
	    };
	    nl.prototype.First = function () {
	        return "eerste";
	    };
	    nl.prototype.Second = function () {
	        return "tweede";
	    };
	    nl.prototype.Third = function () {
	        return "derde";
	    };
	    nl.prototype.Forth = function () {
	        return "vierde";
	    };
	    nl.prototype.Fifth = function () {
	        return "vijfde";
	    };
	    nl.prototype.ComaOnThe = function () {
	        return ", op de ";
	    };
	    nl.prototype.SpaceX0OfTheMonth = function () {
	        return " %s van de maand";
	    };
	    nl.prototype.ComaOnTheLastX0OfTheMonth = function () {
	        return ", op de laatste %s van de maand";
	    };
	    nl.prototype.ComaOnlyOnX0 = function () {
	        return ", alleen op %s";
	    };
	    nl.prototype.ComaEveryX0Months = function () {
	        return ", elke %s maanden";
	    };
	    nl.prototype.ComaOnlyInX0 = function () {
	        return ", alleen in %s";
	    };
	    nl.prototype.ComaOnTheLastDayOfTheMonth = function () {
	        return ", op de laatste dag van de maand";
	    };
	    nl.prototype.ComaOnTheLastWeekdayOfTheMonth = function () {
	        return ", op de laatste werkdag van de maand";
	    };
	    nl.prototype.FirstWeekday = function () {
	        return "eerste werkdag";
	    };
	    nl.prototype.WeekdayNearestDayX0 = function () {
	        return "werkdag dichtst bij dag %s";
	    };
	    nl.prototype.ComaOnTheX0OfTheMonth = function () {
	        return ", op de %s van de maand";
	    };
	    nl.prototype.ComaEveryX0Days = function () {
	        return ", elke %s dagen";
	    };
	    nl.prototype.ComaBetweenDayX0AndX1OfTheMonth = function () {
	        return ", tussen dag %s en %s van de maand";
	    };
	    nl.prototype.ComaOnDayX0OfTheMonth = function () {
	        return ", op dag %s van de maand";
	    };
	    nl.prototype.SpaceAndSpace = function () {
	        return " en ";
	    };
	    nl.prototype.ComaEveryMinute = function () {
	        return ", elke minuut";
	    };
	    nl.prototype.ComaEveryHour = function () {
	        return ", elk uur";
	    };
	    nl.prototype.ComaEveryX0Years = function () {
	        return ", elke %s jaren";
	    };
	    nl.prototype.CommaStartingX0 = function () {
	        return ", beginnend %s";
	    };
	    nl.prototype.DaysOfTheWeek = function () {
	        return ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
	    };
	    nl.prototype.MonthsOfTheYear = function () {
	        return ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
	    };
	    return nl;
	}());
	exports.nl = nl;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	var nb = (function () {
	    function nb() {
	    }
	    nb.prototype.AtX0SecondsPastTheMinuteGt20 = function () { return null; };
	    nb.prototype.AtX0MinutesPastTheHourGt20 = function () { return null; };
	    nb.prototype.ComaMonthX0ThroughMonthX1 = function () { return null; };
	    nb.prototype.ComaYearX0ThroughYearX1 = function () { return null; };
	    nb.prototype.Use24HourTimeFormatByDefault = function () { return false; };
	    nb.prototype.AnErrorOccuredWhenGeneratingTheExpressionD = function () {
	        return "En feil intraff ved generering av uttrykksbeskrivelse. Sjekk cron syntaks.";
	    };
	    nb.prototype.At = function () {
	        return "På";
	    };
	    nb.prototype.AtSpace = function () {
	        return "På ";
	    };
	    nb.prototype.AtX0 = function () {
	        return "på %s";
	    };
	    nb.prototype.AtX0MinutesPastTheHour = function () {
	        return "på %s minutter etter timen";
	    };
	    nb.prototype.AtX0SecondsPastTheMinute = function () {
	        return "på %s sekunder etter minuttet";
	    };
	    nb.prototype.BetweenX0AndX1 = function () {
	        return "mellom %s og %s";
	    };
	    nb.prototype.ComaBetweenDayX0AndX1OfTheMonth = function () {
	        return ", mellom dag %s og %s av måneden";
	    };
	    nb.prototype.ComaEveryDay = function () {
	        return ", hver dag";
	    };
	    nb.prototype.ComaEveryHour = function () {
	        return ", hver time";
	    };
	    nb.prototype.ComaEveryMinute = function () {
	        return ", hvert minutt";
	    };
	    nb.prototype.ComaEveryX0Days = function () {
	        return ", hver %s dag";
	    };
	    nb.prototype.ComaEveryX0DaysOfTheWeek = function () {
	        return ", hver %s ukedag";
	    };
	    nb.prototype.ComaEveryX0Months = function () {
	        return ", hver %s måned]";
	    };
	    nb.prototype.ComaEveryX0Years = function () {
	        return ", hvert %s år";
	    };
	    nb.prototype.ComaOnDayX0OfTheMonth = function () {
	        return ", på dag %s av måneden";
	    };
	    nb.prototype.ComaOnlyInX0 = function () {
	        return ", bare i %s";
	    };
	    nb.prototype.ComaOnlyOnX0 = function () {
	        return ", bare på %s";
	    };
	    nb.prototype.ComaOnThe = function () {
	        return ", på den ";
	    };
	    nb.prototype.ComaOnTheLastDayOfTheMonth = function () {
	        return ", på den siste dagen i måneden";
	    };
	    nb.prototype.ComaOnTheLastWeekdayOfTheMonth = function () {
	        return ", på den siste ukedagen i måneden";
	    };
	    nb.prototype.ComaOnTheLastX0OfTheMonth = function () {
	        return ", på den siste %s av måneden";
	    };
	    nb.prototype.ComaOnTheX0OfTheMonth = function () {
	        return ", på den %s av måneden";
	    };
	    nb.prototype.ComaX0ThroughX1 = function () {
	        return ", %s til og med %s";
	    };
	    nb.prototype.EveryHour = function () {
	        return "hver time";
	    };
	    nb.prototype.EveryMinute = function () {
	        return "hvert minutt";
	    };
	    nb.prototype.EveryMinuteBetweenX0AndX1 = function () {
	        return "Hvert minutt mellom %s og %s";
	    };
	    nb.prototype.EverySecond = function () {
	        return "hvert sekund";
	    };
	    nb.prototype.EveryX0Hours = function () {
	        return "hver %s time";
	    };
	    nb.prototype.EveryX0Minutes = function () {
	        return "hvert %s minutt";
	    };
	    nb.prototype.EveryX0Seconds = function () {
	        return "hvert %s sekund";
	    };
	    nb.prototype.Fifth = function () {
	        return "femte";
	    };
	    nb.prototype.First = function () {
	        return "første";
	    };
	    nb.prototype.FirstWeekday = function () {
	        return "første ukedag";
	    };
	    nb.prototype.Forth = function () {
	        return "fjede";
	    };
	    nb.prototype.MinutesX0ThroughX1PastTheHour = function () {
	        return "minuttene fra %s til og med %s etter timen";
	    };
	    nb.prototype.Second = function () {
	        return "sekund";
	    };
	    nb.prototype.SecondsX0ThroughX1PastTheMinute = function () {
	        return "sekundene fra %s til og med %s etter minuttet";
	    };
	    nb.prototype.SpaceAnd = function () {
	        return " og";
	    };
	    nb.prototype.SpaceAndSpace = function () {
	        return " og ";
	    };
	    nb.prototype.SpaceX0OfTheMonth = function () {
	        return " %s av måneden";
	    };
	    nb.prototype.Third = function () {
	        return "tredje";
	    };
	    nb.prototype.WeekdayNearestDayX0 = function () {
	        return "ukedag nærmest dag %s";
	    };
	    nb.prototype.CommaStartingX0 = function () {
	        return ", starter %s";
	    };
	    nb.prototype.DaysOfTheWeek = function () {
	        return ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
	    };
	    nb.prototype.MonthsOfTheYear = function () {
	        return ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];
	    };
	    return nb;
	}());
	exports.nb = nb;


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	var pl = (function () {
	    function pl() {
	    }
	    pl.prototype.AtX0SecondsPastTheMinuteGt20 = function () { return null; };
	    pl.prototype.AtX0MinutesPastTheHourGt20 = function () { return null; };
	    pl.prototype.ComaMonthX0ThroughMonthX1 = function () { return null; };
	    pl.prototype.ComaYearX0ThroughYearX1 = function () { return null; };
	    pl.prototype.Use24HourTimeFormatByDefault = function () { return true; };
	    pl.prototype.AnErrorOccuredWhenGeneratingTheExpressionD = function () {
	        return "Wystąpił błąd podczas generowania opisu wyrażenia cron. Sprawdź składnię wyrażenia cron.";
	    };
	    pl.prototype.At = function () {
	        return "O";
	    };
	    pl.prototype.AtSpace = function () {
	        return "O ";
	    };
	    pl.prototype.AtX0 = function () {
	        return "o %s";
	    };
	    pl.prototype.AtX0MinutesPastTheHour = function () {
	        return "w %s minucie";
	    };
	    pl.prototype.AtX0SecondsPastTheMinute = function () {
	        return "w %s sekundzie";
	    };
	    pl.prototype.BetweenX0AndX1 = function () {
	        return "od %s do %s";
	    };
	    pl.prototype.ComaBetweenDayX0AndX1OfTheMonth = function () {
	        return ", od %s-ego do %s-ego dnia miesiąca";
	    };
	    pl.prototype.ComaEveryDay = function () {
	        return ", co dzień";
	    };
	    pl.prototype.ComaEveryHour = function () {
	        return ", co godzinę";
	    };
	    pl.prototype.ComaEveryMinute = function () {
	        return ", co minutę";
	    };
	    pl.prototype.ComaEveryX0Days = function () {
	        return ", co %s dni";
	    };
	    pl.prototype.ComaEveryX0DaysOfTheWeek = function () {
	        return ", co %s dni tygodnia";
	    };
	    pl.prototype.ComaEveryX0Months = function () {
	        return ", co %s miesięcy";
	    };
	    pl.prototype.ComaEveryX0Years = function () {
	        return ", co %s lat";
	    };
	    pl.prototype.ComaOnDayX0OfTheMonth = function () {
	        return ", %s-ego dnia miesiąca";
	    };
	    pl.prototype.ComaOnlyInX0 = function () {
	        return ", tylko %s";
	    };
	    pl.prototype.ComaOnlyOnX0 = function () {
	        return ", tylko %s";
	    };
	    pl.prototype.ComaOnThe = function () {
	        return ", ";
	    };
	    pl.prototype.ComaOnTheLastDayOfTheMonth = function () {
	        return ", ostatni dzień miesiąca";
	    };
	    pl.prototype.ComaOnTheLastWeekdayOfTheMonth = function () {
	        return ", ostatni dzień roboczy miesiąca";
	    };
	    pl.prototype.ComaOnTheLastX0OfTheMonth = function () {
	        return ", ostatni %s miesiąca";
	    };
	    pl.prototype.ComaOnTheX0OfTheMonth = function () {
	        return ", %s miesiąca";
	    };
	    pl.prototype.ComaX0ThroughX1 = function () {
	        return ", od %s do %s";
	    };
	    pl.prototype.EveryHour = function () {
	        return "co godzinę";
	    };
	    pl.prototype.EveryMinute = function () {
	        return "co minutę";
	    };
	    pl.prototype.EveryMinuteBetweenX0AndX1 = function () {
	        return "Co minutę od %s do %s";
	    };
	    pl.prototype.EverySecond = function () {
	        return "co sekundę";
	    };
	    pl.prototype.EveryX0Hours = function () {
	        return "co %s godzin";
	    };
	    pl.prototype.EveryX0Minutes = function () {
	        return "co %s minut";
	    };
	    pl.prototype.EveryX0Seconds = function () {
	        return "co %s sekund";
	    };
	    pl.prototype.Fifth = function () {
	        return "piąty";
	    };
	    pl.prototype.First = function () {
	        return "pierwszy";
	    };
	    pl.prototype.FirstWeekday = function () {
	        return "pierwszy dzień roboczy";
	    };
	    pl.prototype.Forth = function () {
	        return "czwarty";
	    };
	    pl.prototype.MinutesX0ThroughX1PastTheHour = function () {
	        return "minuty od %s do %s";
	    };
	    pl.prototype.Second = function () {
	        return "drugi";
	    };
	    pl.prototype.SecondsX0ThroughX1PastTheMinute = function () {
	        return "sekundy od %s do %s";
	    };
	    pl.prototype.SpaceAnd = function () {
	        return " i";
	    };
	    pl.prototype.SpaceAndSpace = function () {
	        return " i ";
	    };
	    pl.prototype.SpaceX0OfTheMonth = function () {
	        return " %s miesiąca";
	    };
	    pl.prototype.Third = function () {
	        return "trzeci";
	    };
	    pl.prototype.WeekdayNearestDayX0 = function () {
	        return "dzień roboczy najbliższy %s-ego dnia";
	    };
	    pl.prototype.CommaStartingX0 = function () {
	        return ", startowy %s";
	    };
	    pl.prototype.DaysOfTheWeek = function () {
	        return ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
	    };
	    pl.prototype.MonthsOfTheYear = function () {
	        return ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
	    };
	    return pl;
	}());
	exports.pl = pl;


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	var pt_BR = (function () {
	    function pt_BR() {
	    }
	    pt_BR.prototype.AtX0SecondsPastTheMinuteGt20 = function () { return null; };
	    pt_BR.prototype.AtX0MinutesPastTheHourGt20 = function () { return null; };
	    pt_BR.prototype.ComaMonthX0ThroughMonthX1 = function () { return null; };
	    pt_BR.prototype.ComaYearX0ThroughYearX1 = function () { return null; };
	    pt_BR.prototype.Use24HourTimeFormatByDefault = function () { return false; };
	    pt_BR.prototype.AnErrorOccuredWhenGeneratingTheExpressionD = function () {
	        return "Ocorreu um erro ao gerar a descrição da expressão Cron.";
	    };
	    pt_BR.prototype.At = function () {
	        return "às";
	    };
	    pt_BR.prototype.AtSpace = function () {
	        return "às ";
	    };
	    pt_BR.prototype.AtX0 = function () {
	        return "Às %s";
	    };
	    pt_BR.prototype.AtX0MinutesPastTheHour = function () {
	        return "aos %s minutos da hora";
	    };
	    pt_BR.prototype.AtX0SecondsPastTheMinute = function () {
	        return "aos %s segundos do minuto";
	    };
	    pt_BR.prototype.BetweenX0AndX1 = function () {
	        return "entre %s e %s";
	    };
	    pt_BR.prototype.ComaBetweenDayX0AndX1OfTheMonth = function () {
	        return ", entre os dias %s e %s do mês";
	    };
	    pt_BR.prototype.ComaEveryDay = function () {
	        return ", a cada dia";
	    };
	    pt_BR.prototype.ComaEveryHour = function () {
	        return ", a cada hora";
	    };
	    pt_BR.prototype.ComaEveryMinute = function () {
	        return ", a cada minuto";
	    };
	    pt_BR.prototype.ComaEveryX0Days = function () {
	        return ", a cada %s dias";
	    };
	    pt_BR.prototype.ComaEveryX0DaysOfTheWeek = function () {
	        return ", a cada %s dias de semana";
	    };
	    pt_BR.prototype.ComaEveryX0Months = function () {
	        return ", a cada %s meses";
	    };
	    pt_BR.prototype.ComaOnDayX0OfTheMonth = function () {
	        return ", no dia %s do mês";
	    };
	    pt_BR.prototype.ComaOnlyInX0 = function () {
	        return ", somente em %s";
	    };
	    pt_BR.prototype.ComaOnlyOnX0 = function () {
	        return ", somente de %s";
	    };
	    pt_BR.prototype.ComaOnThe = function () {
	        return ", na ";
	    };
	    pt_BR.prototype.ComaOnTheLastDayOfTheMonth = function () {
	        return ", no último dia do mês";
	    };
	    pt_BR.prototype.ComaOnTheLastWeekdayOfTheMonth = function () {
	        return ", no último dia da semana do mês";
	    };
	    pt_BR.prototype.ComaOnTheLastX0OfTheMonth = function () {
	        return ", na última %s do mês";
	    };
	    pt_BR.prototype.ComaOnTheX0OfTheMonth = function () {
	        return ", no %s do mês";
	    };
	    pt_BR.prototype.ComaX0ThroughX1 = function () {
	        return ", de %s a %s";
	    };
	    pt_BR.prototype.EveryHour = function () {
	        return "a cada hora";
	    };
	    pt_BR.prototype.EveryMinute = function () {
	        return "a cada minuto";
	    };
	    pt_BR.prototype.EveryMinuteBetweenX0AndX1 = function () {
	        return "a cada minuto entre %s e %s";
	    };
	    pt_BR.prototype.EverySecond = function () {
	        return "a cada segundo";
	    };
	    pt_BR.prototype.EveryX0Hours = function () {
	        return "a cada %s horas";
	    };
	    pt_BR.prototype.EveryX0Minutes = function () {
	        return "a cada %s minutos";
	    };
	    pt_BR.prototype.EveryX0Seconds = function () {
	        return "a cada %s segundos";
	    };
	    pt_BR.prototype.Fifth = function () {
	        return "quinta";
	    };
	    pt_BR.prototype.First = function () {
	        return "primeira";
	    };
	    pt_BR.prototype.FirstWeekday = function () {
	        return "primeiro dia da semana";
	    };
	    pt_BR.prototype.Forth = function () {
	        return "quarta";
	    };
	    pt_BR.prototype.MinutesX0ThroughX1PastTheHour = function () {
	        return "do minuto %s até %s de cada hora";
	    };
	    pt_BR.prototype.Second = function () {
	        return "segunda";
	    };
	    pt_BR.prototype.SecondsX0ThroughX1PastTheMinute = function () {
	        return "No segundo %s até %s de cada minuto";
	    };
	    pt_BR.prototype.SpaceAnd = function () {
	        return " e";
	    };
	    pt_BR.prototype.SpaceAndSpace = function () {
	        return " e ";
	    };
	    pt_BR.prototype.SpaceX0OfTheMonth = function () {
	        return " %s do mês";
	    };
	    pt_BR.prototype.Third = function () {
	        return "terceira";
	    };
	    pt_BR.prototype.WeekdayNearestDayX0 = function () {
	        return "dia da semana mais próximo do dia %s";
	    };
	    pt_BR.prototype.ComaEveryX0Years = function () {
	        return ", a cada %s anos";
	    };
	    pt_BR.prototype.CommaStartingX0 = function () {
	        return ", iniciando %s";
	    };
	    pt_BR.prototype.DaysOfTheWeek = function () {
	        return ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
	    };
	    pt_BR.prototype.MonthsOfTheYear = function () {
	        return ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
	    };
	    return pt_BR;
	}());
	exports.pt_BR = pt_BR;


/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	var ro = (function () {
	    function ro() {
	    }
	    ro.prototype.Use24HourTimeFormatByDefault = function () { return true; };
	    ro.prototype.AnErrorOccuredWhenGeneratingTheExpressionD = function () {
	        return "Eroare la generarea descrierii. Verificați sintaxa.";
	    };
	    ro.prototype.At = function () {
	        return "La";
	    };
	    ro.prototype.AtSpace = function () {
	        return "La ";
	    };
	    ro.prototype.AtX0 = function () {
	        return "la %s";
	    };
	    ro.prototype.AtX0MinutesPastTheHour = function () {
	        return "la și %s minute";
	    };
	    ro.prototype.AtX0SecondsPastTheMinute = function () {
	        return "la și %s secunde";
	    };
	    ro.prototype.BetweenX0AndX1 = function () {
	        return "între %s și %s";
	    };
	    ro.prototype.ComaBetweenDayX0AndX1OfTheMonth = function () {
	        return ", între zilele %s și %s ale lunii";
	    };
	    ro.prototype.ComaEveryDay = function () {
	        return ", în fiecare zi";
	    };
	    ro.prototype.ComaEveryHour = function () {
	        return ", în fiecare oră";
	    };
	    ro.prototype.ComaEveryMinute = function () {
	        return ", în fiecare minut";
	    };
	    ro.prototype.ComaEveryX0Days = function () {
	        return ", la fiecare %s zile";
	    };
	    ro.prototype.ComaEveryX0DaysOfTheWeek = function () {
	        return ", la fiecare a %s-a zi a săptămânii";
	    };
	    ro.prototype.ComaEveryX0Months = function () {
	        return ", la fiecare %s luni";
	    };
	    ro.prototype.ComaEveryX0Years = function () {
	        return ", o dată la %s ani";
	    };
	    ro.prototype.ComaOnDayX0OfTheMonth = function () {
	        return ", în ziua %s a lunii";
	    };
	    ro.prototype.ComaOnlyInX0 = function () {
	        return ", doar în %s";
	    };
	    ro.prototype.ComaOnlyOnX0 = function () {
	        return ", doar %s";
	    };
	    ro.prototype.ComaOnThe = function () {
	        return ", în ";
	    };
	    ro.prototype.ComaOnTheLastDayOfTheMonth = function () {
	        return ", în ultima zi a lunii";
	    };
	    ro.prototype.ComaOnTheLastWeekdayOfTheMonth = function () {
	        return ", în ultima zi lucrătoare a lunii";
	    };
	    ro.prototype.ComaOnTheLastX0OfTheMonth = function () {
	        return ", în ultima %s a lunii";
	    };
	    ro.prototype.ComaOnTheX0OfTheMonth = function () {
	        return ", în %s a lunii";
	    };
	    ro.prototype.ComaX0ThroughX1 = function () {
	        return ", de %s până %s";
	    };
	    ro.prototype.EveryHour = function () {
	        return "în fiecare oră";
	    };
	    ro.prototype.EveryMinute = function () {
	        return "în fiecare minut";
	    };
	    ro.prototype.EveryMinuteBetweenX0AndX1 = function () {
	        return "În fiecare minut între %s și %s";
	    };
	    ro.prototype.EverySecond = function () {
	        return "în fiecare secundă";
	    };
	    ro.prototype.EveryX0Hours = function () {
	        return "la fiecare %s ore";
	    };
	    ro.prototype.EveryX0Minutes = function () {
	        return "la fiecare %s minute";
	    };
	    ro.prototype.EveryX0Seconds = function () {
	        return "la fiecare %s secunde";
	    };
	    ro.prototype.Fifth = function () {
	        return "a cincea";
	    };
	    ro.prototype.First = function () {
	        return "prima";
	    };
	    ro.prototype.FirstWeekday = function () {
	        return "prima zi a săptămânii";
	    };
	    ro.prototype.Forth = function () {
	        return "a patra";
	    };
	    ro.prototype.MinutesX0ThroughX1PastTheHour = function () {
	        return "între minutele %s și %s";
	    };
	    ro.prototype.Second = function () {
	        return "a doua";
	    };
	    ro.prototype.SecondsX0ThroughX1PastTheMinute = function () {
	        return "între secunda %s și secunda %s";
	    };
	    ro.prototype.SpaceAnd = function () {
	        return " și";
	    };
	    ro.prototype.SpaceAndSpace = function () {
	        return " și ";
	    };
	    ro.prototype.SpaceX0OfTheMonth = function () {
	        return " %s a lunii";
	    };
	    ro.prototype.Third = function () {
	        return "a treia";
	    };
	    ro.prototype.WeekdayNearestDayX0 = function () {
	        return "cea mai apropiată zi a săptămânii de ziua %s";
	    };
	    ro.prototype.ComaMinX0ThroughMinX1 = function () {
	        return ", de la %s până la %s";
	    };
	    ro.prototype.ComaMonthX0ThroughMonthX1 = function () {
	        return ", din %s până în %s";
	    };
	    ro.prototype.ComaYearX0ThroughYearX1 = function () {
	        return ", din %s până în %s";
	    };
	    ro.prototype.AtX0MinutesPastTheHourGt20 = function () {
	        return "la și %s de minute";
	    };
	    ro.prototype.AtX0SecondsPastTheMinuteGt20 = function () {
	        return "la și %s de secunde";
	    };
	    ro.prototype.CommaStartingX0 = function () {
	        return ", pornire %s";
	    };
	    ro.prototype.DaysOfTheWeek = function () {
	        return ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"];
	    };
	    ro.prototype.MonthsOfTheYear = function () {
	        return ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"];
	    };
	    return ro;
	}());
	exports.ro = ro;


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	var ru = (function () {
	    function ru() {
	    }
	    ru.prototype.AtX0SecondsPastTheMinuteGt20 = function () { return null; };
	    ru.prototype.AtX0MinutesPastTheHourGt20 = function () { return null; };
	    ru.prototype.ComaMonthX0ThroughMonthX1 = function () { return null; };
	    ru.prototype.ComaYearX0ThroughYearX1 = function () { return null; };
	    ru.prototype.Use24HourTimeFormatByDefault = function () { return true; };
	    ru.prototype.EveryMinute = function () {
	        return "каждую минуту";
	    };
	    ru.prototype.EveryHour = function () {
	        return "каждый час";
	    };
	    ru.prototype.AnErrorOccuredWhenGeneratingTheExpressionD = function () {
	        return "Произошла ошибка во время генерации описания выражения. Проверьте синтаксис крон-выражения.";
	    };
	    ru.prototype.AtSpace = function () {
	        return "В ";
	    };
	    ru.prototype.EveryMinuteBetweenX0AndX1 = function () {
	        return "Каждую минуту с %s по %s";
	    };
	    ru.prototype.At = function () {
	        return "В";
	    };
	    ru.prototype.SpaceAnd = function () {
	        return " и";
	    };
	    ru.prototype.EverySecond = function () {
	        return "каждую секунду";
	    };
	    ru.prototype.EveryX0Seconds = function () {
	        return "каждые %s секунд";
	    };
	    ru.prototype.SecondsX0ThroughX1PastTheMinute = function () {
	        return "секунды с %s по %s";
	    };
	    ru.prototype.AtX0SecondsPastTheMinute = function () {
	        return "в %s секунд";
	    };
	    ru.prototype.EveryX0Minutes = function () {
	        return "каждые %s минут";
	    };
	    ru.prototype.MinutesX0ThroughX1PastTheHour = function () {
	        return "минуты с %s по %s";
	    };
	    ru.prototype.AtX0MinutesPastTheHour = function () {
	        return "в %s минут";
	    };
	    ru.prototype.EveryX0Hours = function () {
	        return "каждые %s часов";
	    };
	    ru.prototype.BetweenX0AndX1 = function () {
	        return "с %s по %s";
	    };
	    ru.prototype.AtX0 = function () {
	        return "в %s";
	    };
	    ru.prototype.ComaEveryDay = function () {
	        return ", каждый день";
	    };
	    ru.prototype.ComaEveryX0DaysOfTheWeek = function () {
	        return ", каждые %s дней недели";
	    };
	    ru.prototype.ComaX0ThroughX1 = function () {
	        return ", %s по %s";
	    };
	    ru.prototype.First = function () {
	        return "первый";
	    };
	    ru.prototype.Second = function () {
	        return "второй";
	    };
	    ru.prototype.Third = function () {
	        return "третий";
	    };
	    ru.prototype.Forth = function () {
	        return "четвертый";
	    };
	    ru.prototype.Fifth = function () {
	        return "пятый";
	    };
	    ru.prototype.ComaOnThe = function () {
	        return ", в ";
	    };
	    ru.prototype.SpaceX0OfTheMonth = function () {
	        return " %s месяца";
	    };
	    ru.prototype.ComaOnTheLastX0OfTheMonth = function () {
	        return ", в последний %s месяца";
	    };
	    ru.prototype.ComaOnlyOnX0 = function () {
	        return ", только в %s";
	    };
	    ru.prototype.ComaEveryX0Months = function () {
	        return ", каждые %s месяцев";
	    };
	    ru.prototype.ComaOnlyInX0 = function () {
	        return ", только в %s";
	    };
	    ru.prototype.ComaOnTheLastDayOfTheMonth = function () {
	        return ", в последний день месяца";
	    };
	    ru.prototype.ComaOnTheLastWeekdayOfTheMonth = function () {
	        return ", в последний будний день месяца";
	    };
	    ru.prototype.FirstWeekday = function () {
	        return "первый будний день";
	    };
	    ru.prototype.WeekdayNearestDayX0 = function () {
	        return "ближайший будний день к %s";
	    };
	    ru.prototype.ComaOnTheX0OfTheMonth = function () {
	        return ", в %s месяца";
	    };
	    ru.prototype.ComaEveryX0Days = function () {
	        return ", каждые %s дней";
	    };
	    ru.prototype.ComaBetweenDayX0AndX1OfTheMonth = function () {
	        return ", с %s по %s число месяца";
	    };
	    ru.prototype.ComaOnDayX0OfTheMonth = function () {
	        return ", в %s число месяца";
	    };
	    ru.prototype.SpaceAndSpace = function () {
	        return " и ";
	    };
	    ru.prototype.ComaEveryMinute = function () {
	        return ", каждую минуту";
	    };
	    ru.prototype.ComaEveryHour = function () {
	        return ", каждый час";
	    };
	    ru.prototype.ComaEveryX0Years = function () {
	        return ", каждые %s лет";
	    };
	    ru.prototype.CommaStartingX0 = function () {
	        return ", начало %s";
	    };
	    ru.prototype.DaysOfTheWeek = function () {
	        return ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
	    };
	    ru.prototype.MonthsOfTheYear = function () {
	        return ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
	    };
	    return ru;
	}());
	exports.ru = ru;


/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	var tr = (function () {
	    function tr() {
	    }
	    tr.prototype.AtX0SecondsPastTheMinuteGt20 = function () { return null; };
	    tr.prototype.AtX0MinutesPastTheHourGt20 = function () { return null; };
	    tr.prototype.ComaMonthX0ThroughMonthX1 = function () { return null; };
	    tr.prototype.ComaYearX0ThroughYearX1 = function () { return null; };
	    tr.prototype.Use24HourTimeFormatByDefault = function () { return true; };
	    tr.prototype.EveryMinute = function () {
	        return "her dakika";
	    };
	    tr.prototype.EveryHour = function () {
	        return "her saat";
	    };
	    tr.prototype.AnErrorOccuredWhenGeneratingTheExpressionD = function () {
	        return "İfade açıklamasını oluştururken bir hata oluştu. Cron ifadesini gözden geçirin.";
	    };
	    tr.prototype.AtSpace = function () {
	        return "Saat ";
	    };
	    tr.prototype.EveryMinuteBetweenX0AndX1 = function () {
	        return "Saat %s ve %s arasındaki her dakika";
	    };
	    tr.prototype.At = function () {
	        return "Saat";
	    };
	    tr.prototype.SpaceAnd = function () {
	        return " ve";
	    };
	    tr.prototype.EverySecond = function () {
	        return "her saniye";
	    };
	    tr.prototype.EveryX0Seconds = function () {
	        return "her %s saniyede bir";
	    };
	    tr.prototype.SecondsX0ThroughX1PastTheMinute = function () {
	        return "dakikaların %s. ve %s. saniyeleri arası";
	    };
	    tr.prototype.AtX0SecondsPastTheMinute = function () {
	        return "dakikaların %s. saniyesinde";
	    };
	    tr.prototype.EveryX0Minutes = function () {
	        return "her %s dakikada bir";
	    };
	    tr.prototype.MinutesX0ThroughX1PastTheHour = function () {
	        return "saatlerin %s. ve %s. dakikaları arası";
	    };
	    tr.prototype.AtX0MinutesPastTheHour = function () {
	        return "saatlerin %s. dakikasında";
	    };
	    tr.prototype.EveryX0Hours = function () {
	        return "her %s saatte";
	    };
	    tr.prototype.BetweenX0AndX1 = function () {
	        return "%s ile %s arasında";
	    };
	    tr.prototype.AtX0 = function () {
	        return "saat %s";
	    };
	    tr.prototype.ComaEveryDay = function () {
	        return ", her gün";
	    };
	    tr.prototype.ComaEveryX0DaysOfTheWeek = function () {
	        return ", ayın her %s günü";
	    };
	    tr.prototype.ComaX0ThroughX1 = function () {
	        return ", %s ile %s arasında";
	    };
	    tr.prototype.First = function () {
	        return "ilk";
	    };
	    tr.prototype.Second = function () {
	        return "ikinci";
	    };
	    tr.prototype.Third = function () {
	        return "üçüncü";
	    };
	    tr.prototype.Forth = function () {
	        return "dördüncü";
	    };
	    tr.prototype.Fifth = function () {
	        return "beşinci";
	    };
	    tr.prototype.ComaOnThe = function () {
	        return ", ayın ";
	    };
	    tr.prototype.SpaceX0OfTheMonth = function () {
	        return " %s günü";
	    };
	    tr.prototype.ComaOnTheLastX0OfTheMonth = function () {
	        return ", ayın son %s günü";
	    };
	    tr.prototype.ComaOnlyOnX0 = function () {
	        return ", sadece %s günü";
	    };
	    tr.prototype.ComaEveryX0Months = function () {
	        return ", %s ayda bir";
	    };
	    tr.prototype.ComaOnlyInX0 = function () {
	        return ", sadece %s için";
	    };
	    tr.prototype.ComaOnTheLastDayOfTheMonth = function () {
	        return ", ayın son günü";
	    };
	    tr.prototype.ComaOnTheLastWeekdayOfTheMonth = function () {
	        return ", ayın son iş günü";
	    };
	    tr.prototype.FirstWeekday = function () {
	        return "ilk iş günü";
	    };
	    tr.prototype.WeekdayNearestDayX0 = function () {
	        return "%s. günü sonrasındaki ilk iş günü";
	    };
	    tr.prototype.ComaOnTheX0OfTheMonth = function () {
	        return ", ayın %s";
	    };
	    tr.prototype.ComaEveryX0Days = function () {
	        return ", %s günde bir";
	    };
	    tr.prototype.ComaBetweenDayX0AndX1OfTheMonth = function () {
	        return ", ayın %s. ve %s. günleri arası";
	    };
	    tr.prototype.ComaOnDayX0OfTheMonth = function () {
	        return ", ayın %s. günü";
	    };
	    tr.prototype.SpaceAndSpace = function () {
	        return " ve ";
	    };
	    tr.prototype.ComaEveryMinute = function () {
	        return ", her dakika";
	    };
	    tr.prototype.ComaEveryHour = function () {
	        return ", her saat";
	    };
	    tr.prototype.ComaEveryX0Years = function () {
	        return ", %s yılda bir";
	    };
	    tr.prototype.CommaStartingX0 = function () {
	        return ", başlangıç %s";
	    };
	    tr.prototype.DaysOfTheWeek = function () {
	        return ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
	    };
	    tr.prototype.MonthsOfTheYear = function () {
	        return ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
	    };
	    return tr;
	}());
	exports.tr = tr;


/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	var uk = (function () {
	    function uk() {
	    }
	    uk.prototype.AtX0SecondsPastTheMinuteGt20 = function () { return null; };
	    uk.prototype.AtX0MinutesPastTheHourGt20 = function () { return null; };
	    uk.prototype.ComaMonthX0ThroughMonthX1 = function () { return null; };
	    uk.prototype.ComaYearX0ThroughYearX1 = function () { return null; };
	    uk.prototype.Use24HourTimeFormatByDefault = function () { return true; };
	    uk.prototype.EveryMinute = function () {
	        return "щохвилини";
	    };
	    uk.prototype.EveryHour = function () {
	        return "щогодини";
	    };
	    uk.prototype.AnErrorOccuredWhenGeneratingTheExpressionD = function () {
	        return "ВІдбулася помилка підчас генерації опису. Перевірта правильність написання cron виразу.";
	    };
	    uk.prototype.AtSpace = function () {
	        return "О ";
	    };
	    uk.prototype.EveryMinuteBetweenX0AndX1 = function () {
	        return "Щохвилини між %s та %s";
	    };
	    uk.prototype.At = function () {
	        return "О";
	    };
	    uk.prototype.SpaceAnd = function () {
	        return " та";
	    };
	    uk.prototype.EverySecond = function () {
	        return "Щосекунди";
	    };
	    uk.prototype.EveryX0Seconds = function () {
	        return "кожні %s секунд";
	    };
	    uk.prototype.SecondsX0ThroughX1PastTheMinute = function () {
	        return "з %s по %s секунду";
	    };
	    uk.prototype.AtX0SecondsPastTheMinute = function () {
	        return "о %s секунді";
	    };
	    uk.prototype.EveryX0Minutes = function () {
	        return "кожні %s хвилин";
	    };
	    uk.prototype.MinutesX0ThroughX1PastTheHour = function () {
	        return "з %s по %s хвилину";
	    };
	    uk.prototype.AtX0MinutesPastTheHour = function () {
	        return "о %s хвилині";
	    };
	    uk.prototype.EveryX0Hours = function () {
	        return "кожні %s годин";
	    };
	    uk.prototype.BetweenX0AndX1 = function () {
	        return "між %s та %s";
	    };
	    uk.prototype.AtX0 = function () {
	        return "о %s";
	    };
	    uk.prototype.ComaEveryDay = function () {
	        return ", щоденно";
	    };
	    uk.prototype.ComaEveryX0DaysOfTheWeek = function () {
	        return ", кожен %s день тижня";
	    };
	    uk.prototype.ComaX0ThroughX1 = function () {
	        return ", %s по %s";
	    };
	    uk.prototype.First = function () {
	        return "перший";
	    };
	    uk.prototype.Second = function () {
	        return "другий";
	    };
	    uk.prototype.Third = function () {
	        return "третій";
	    };
	    uk.prototype.Forth = function () {
	        return "четвертий";
	    };
	    uk.prototype.Fifth = function () {
	        return "п'ятий";
	    };
	    uk.prototype.ComaOnThe = function () {
	        return ", в ";
	    };
	    uk.prototype.SpaceX0OfTheMonth = function () {
	        return " %s місяця";
	    };
	    uk.prototype.ComaOnTheLastX0OfTheMonth = function () {
	        return ", в останній %s місяця";
	    };
	    uk.prototype.ComaOnlyOnX0 = function () {
	        return ", тільки в %s";
	    };
	    uk.prototype.ComaEveryX0Months = function () {
	        return ", кожен %s місяць";
	    };
	    uk.prototype.ComaOnlyInX0 = function () {
	        return ", тільки в %s";
	    };
	    uk.prototype.ComaOnTheLastDayOfTheMonth = function () {
	        return ", в останній день місяця";
	    };
	    uk.prototype.ComaOnTheLastWeekdayOfTheMonth = function () {
	        return ", в останній будень місяця";
	    };
	    uk.prototype.FirstWeekday = function () {
	        return "перший будень";
	    };
	    uk.prototype.WeekdayNearestDayX0 = function () {
	        return "будень найближчий до %s дня";
	    };
	    uk.prototype.ComaOnTheX0OfTheMonth = function () {
	        return ", в %s місяця";
	    };
	    uk.prototype.ComaEveryX0Days = function () {
	        return ", кожен %s день";
	    };
	    uk.prototype.ComaBetweenDayX0AndX1OfTheMonth = function () {
	        return ", між %s та %s днями місяця";
	    };
	    uk.prototype.ComaOnDayX0OfTheMonth = function () {
	        return ", на %s день місяця";
	    };
	    uk.prototype.SpaceAndSpace = function () {
	        return " та ";
	    };
	    uk.prototype.ComaEveryMinute = function () {
	        return ", щохвилини";
	    };
	    uk.prototype.ComaEveryHour = function () {
	        return ", щогодини";
	    };
	    uk.prototype.ComaEveryX0Years = function () {
	        return ", кожні %s роки";
	    };
	    uk.prototype.CommaStartingX0 = function () {
	        return ", початок %s";
	    };
	    uk.prototype.DaysOfTheWeek = function () {
	        return ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"];
	    };
	    uk.prototype.MonthsOfTheYear = function () {
	        return ["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"];
	    };
	    return uk;
	}());
	exports.uk = uk;


/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	var zh_CN = (function () {
	    function zh_CN() {
	    }
	    zh_CN.prototype.AtX0SecondsPastTheMinuteGt20 = function () { return null; };
	    zh_CN.prototype.AtX0MinutesPastTheHourGt20 = function () { return null; };
	    zh_CN.prototype.ComaMonthX0ThroughMonthX1 = function () { return null; };
	    zh_CN.prototype.ComaYearX0ThroughYearX1 = function () { return null; };
	    zh_CN.prototype.Use24HourTimeFormatByDefault = function () { return false; };
	    zh_CN.prototype.EveryMinute = function () {
	        return "每分钟";
	    };
	    zh_CN.prototype.EveryHour = function () {
	        return "每小时";
	    };
	    zh_CN.prototype.AnErrorOccuredWhenGeneratingTheExpressionD = function () {
	        return "生成表达式描述时发生了错误，请检查cron表达式语法。";
	    };
	    zh_CN.prototype.AtSpace = function () {
	        return "在 ";
	    };
	    zh_CN.prototype.EveryMinuteBetweenX0AndX1 = function () {
	        return "在 %s 和 %s 之间的每分钟";
	    };
	    zh_CN.prototype.At = function () {
	        return "在";
	    };
	    zh_CN.prototype.SpaceAnd = function () {
	        return " 和";
	    };
	    zh_CN.prototype.EverySecond = function () {
	        return "每秒";
	    };
	    zh_CN.prototype.EveryX0Seconds = function () {
	        return "每 %s 秒";
	    };
	    zh_CN.prototype.SecondsX0ThroughX1PastTheMinute = function () {
	        return "在每分钟的 %s 到 %s 秒";
	    };
	    zh_CN.prototype.AtX0SecondsPastTheMinute = function () {
	        return "在每分钟的 %s 秒";
	    };
	    zh_CN.prototype.EveryX0Minutes = function () {
	        return "每 %s 分钟";
	    };
	    zh_CN.prototype.MinutesX0ThroughX1PastTheHour = function () {
	        return "在每小时的 %s 到 %s 分钟";
	    };
	    zh_CN.prototype.AtX0MinutesPastTheHour = function () {
	        return "在每小时的 %s 分";
	    };
	    zh_CN.prototype.EveryX0Hours = function () {
	        return "每 %s 小时";
	    };
	    zh_CN.prototype.BetweenX0AndX1 = function () {
	        return "在 %s 和 %s 之间";
	    };
	    zh_CN.prototype.AtX0 = function () {
	        return "在 %s";
	    };
	    zh_CN.prototype.ComaEveryDay = function () {
	        return ", 每天";
	    };
	    zh_CN.prototype.ComaEveryX0DaysOfTheWeek = function () {
	        return ", 每周的每 %s 天";
	    };
	    zh_CN.prototype.ComaX0ThroughX1 = function () {
	        return ", %s 到 %s";
	    };
	    zh_CN.prototype.First = function () {
	        return "第一个";
	    };
	    zh_CN.prototype.Second = function () {
	        return "第二个";
	    };
	    zh_CN.prototype.Third = function () {
	        return "第三个";
	    };
	    zh_CN.prototype.Forth = function () {
	        return "第四个";
	    };
	    zh_CN.prototype.Fifth = function () {
	        return "第五个";
	    };
	    zh_CN.prototype.ComaOnThe = function () {
	        return ", 在 ";
	    };
	    zh_CN.prototype.SpaceX0OfTheMonth = function () {
	        return "%s 每月";
	    };
	    zh_CN.prototype.ComaOnTheLastX0OfTheMonth = function () {
	        return ", 每月的最后一个 %s ";
	    };
	    zh_CN.prototype.ComaOnlyOnX0 = function () {
	        return ", 仅在 %s";
	    };
	    zh_CN.prototype.ComaEveryX0Months = function () {
	        return ", 每 %s 月";
	    };
	    zh_CN.prototype.ComaOnlyInX0 = function () {
	        return ", 仅在 %s";
	    };
	    zh_CN.prototype.ComaOnTheLastDayOfTheMonth = function () {
	        return ", 每月的最后一天";
	    };
	    zh_CN.prototype.ComaOnTheLastWeekdayOfTheMonth = function () {
	        return ", 每月的最后一个平日";
	    };
	    zh_CN.prototype.FirstWeekday = function () {
	        return "第一个平日";
	    };
	    zh_CN.prototype.WeekdayNearestDayX0 = function () {
	        return "最接近 %s 号的平日";
	    };
	    zh_CN.prototype.ComaOnTheX0OfTheMonth = function () {
	        return ", 每月的 %s ";
	    };
	    zh_CN.prototype.ComaEveryX0Days = function () {
	        return ", 每 %s 天";
	    };
	    zh_CN.prototype.ComaBetweenDayX0AndX1OfTheMonth = function () {
	        return ", 在每月的 %s 和 %s 号之间";
	    };
	    zh_CN.prototype.ComaOnDayX0OfTheMonth = function () {
	        return ", 每月的 %s 号";
	    };
	    zh_CN.prototype.SpaceAndSpace = function () {
	        return " 和 ";
	    };
	    zh_CN.prototype.ComaEveryMinute = function () {
	        return ", 每分钟";
	    };
	    zh_CN.prototype.ComaEveryHour = function () {
	        return ", 每小时";
	    };
	    zh_CN.prototype.ComaEveryX0Years = function () {
	        return ", 每 %s 年";
	    };
	    zh_CN.prototype.CommaStartingX0 = function () {
	        return ", 开始 %s";
	    };
	    zh_CN.prototype.DaysOfTheWeek = function () {
	        return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
	    };
	    zh_CN.prototype.MonthsOfTheYear = function () {
	        return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
	    };
	    return zh_CN;
	}());
	exports.zh_CN = zh_CN;


/***/ }
/******/ ])
});
;