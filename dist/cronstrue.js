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
	var stringUtilities_1 = __webpack_require__(1);
	var cronParser_1 = __webpack_require__(2);
	var LocalesManager = __webpack_require__(3);
	var cronstrue = (function () {
	    function cronstrue(expression, options) {
	        this.expression = expression;
	        this.options = options;
	        this.expressionParts = new Array(5);
	        this.i18n = cronstrue.locales[options.locale || 'en'];
	    }
	    cronstrue.toString = function (expression, _a) {
	        var _b = _a === void 0 ? {} : _a, _c = _b.throwExceptionOnParseError, throwExceptionOnParseError = _c === void 0 ? true : _c, _d = _b.verbose, verbose = _d === void 0 ? false : _d, _e = _b.dayOfWeekStartIndexZero, dayOfWeekStartIndexZero = _e === void 0 ? true : _e, _f = _b.use24HourTimeFormat, use24HourTimeFormat = _f === void 0 ? false : _f, _g = _b.locale, locale = _g === void 0 ? 'en' : _g;
	        var options = {
	            throwExceptionOnParseError: throwExceptionOnParseError,
	            verbose: verbose,
	            dayOfWeekStartIndexZero: dayOfWeekStartIndexZero,
	            use24HourTimeFormat: use24HourTimeFormat,
	            locale: locale
	        };
	        var descripter = new cronstrue(expression, options);
	        return descripter.getFullDescription();
	    };
	    cronstrue.initialize = function () {
	        cronstrue.specialCharacters = ["/", "-", ",", "*"];
	        LocalesManager.init(cronstrue.locales);
	    };
	    cronstrue.prototype.getFullDescription = function () {
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
	    cronstrue.prototype.getTimeOfDayDescription = function () {
	        var secondsExpression = this.expressionParts[0];
	        var minuteExpression = this.expressionParts[1];
	        var hourExpression = this.expressionParts[2];
	        var description = "";
	        if (!stringUtilities_1.StringUtilities.containsAny(minuteExpression, cronstrue.specialCharacters)
	            && !stringUtilities_1.StringUtilities.containsAny(hourExpression, cronstrue.specialCharacters)
	            && !stringUtilities_1.StringUtilities.containsAny(secondsExpression, cronstrue.specialCharacters)) {
	            description += this.i18n.AtSpace() + this.formatTime(hourExpression, minuteExpression, secondsExpression);
	        }
	        else if (minuteExpression.indexOf("-") > -1
	            && !(minuteExpression.indexOf(",") > -1)
	            && !stringUtilities_1.StringUtilities.containsAny(hourExpression, cronstrue.specialCharacters)) {
	            var minuteParts = minuteExpression.split("-");
	            description += stringUtilities_1.StringUtilities.format(this.i18n.EveryMinuteBetweenX0AndX1(), this.formatTime(hourExpression, minuteParts[0], ""), this.formatTime(hourExpression, minuteParts[1], ""));
	        }
	        else if (hourExpression.indexOf(",") > -1 && !stringUtilities_1.StringUtilities.containsAny(minuteExpression, cronstrue.specialCharacters)) {
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
	    cronstrue.prototype.getSecondsDescription = function () {
	        var _this = this;
	        var description = this.getSegmentDescription(this.expressionParts[0], this.i18n.EverySecond(), function (s) { return s; }, function (s) { return stringUtilities_1.StringUtilities.format(_this.i18n.EveryX0Seconds(), s); }, function (s) { return _this.i18n.SecondsX0ThroughX1PastTheMinute(); }, function (s) {
	            return s == "0" ? "" : parseInt(s) < 20
	                ? _this.i18n.AtX0SecondsPastTheMinute()
	                : _this.i18n.AtX0SecondsPastTheMinuteGt20() || _this.i18n.AtX0SecondsPastTheMinute();
	        });
	        return description;
	    };
	    cronstrue.prototype.getMinutesDescription = function () {
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
	    cronstrue.prototype.getHoursDescription = function () {
	        var _this = this;
	        var expression = this.expressionParts[2];
	        var description = this.getSegmentDescription(expression, this.i18n.EveryHour(), function (s) { return _this.formatTime(s, "0", ""); }, function (s) { return stringUtilities_1.StringUtilities.format(_this.i18n.EveryX0Hours(), s); }, function (s) { return _this.i18n.BetweenX0AndX1(); }, function (s) { return _this.i18n.AtX0(); });
	        return description;
	    };
	    cronstrue.prototype.getDayOfWeekDescription = function () {
	        var _this = this;
	        var daysOfWeekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
	    cronstrue.prototype.getMonthDescription = function () {
	        var _this = this;
	        var monthNames = ["January", "February", "March", "April", "May", "June",
	            "July", "August", "September", "October", "November", "December"];
	        var description = this.getSegmentDescription(this.expressionParts[4], "", function (s) { return monthNames[(parseInt(s) - 1)]; }, function (s) { return stringUtilities_1.StringUtilities.format(_this.i18n.ComaEveryX0Months(), s); }, function (s) { return _this.i18n.ComaMonthX0ThroughMonthX1() || _this.i18n.ComaX0ThroughX1(); }, function (s) { return _this.i18n.ComaOnlyInX0(); });
	        return description;
	    };
	    cronstrue.prototype.getDayOfMonthDescription = function () {
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
	    cronstrue.prototype.getYearDescription = function () {
	        var _this = this;
	        var description = this.getSegmentDescription(this.expressionParts[6], "", function (s) { return /^\d+$/.test(s) ? new Date(parseInt(s), 1).getFullYear().toString() : s; }, function (s) { return stringUtilities_1.StringUtilities.format(_this.i18n.ComaEveryX0Years(), s); }, function (s) { return _this.i18n.ComaYearX0ThroughYearX1() || _this.i18n.ComaX0ThroughX1(); }, function (s) { return _this.i18n.ComaOnlyInX0(); });
	        return description;
	    };
	    cronstrue.prototype.getSegmentDescription = function (expression, allDescription, getSingleItemDescription, getIntervalDescriptionFormat, getBetweenDescriptionFormat, getDescriptionFormat) {
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
	    cronstrue.prototype.generateBetweenSegmentDescription = function (betweenExpression, getBetweenDescriptionFormat, getSingleItemDescription) {
	        var description = "";
	        var betweenSegments = betweenExpression.split('-');
	        var betweenSegment1Description = getSingleItemDescription(betweenSegments[0]);
	        var betweenSegment2Description = getSingleItemDescription(betweenSegments[1]);
	        betweenSegment2Description = betweenSegment2Description.replace(":00", ":59");
	        var betweenDescriptionFormat = getBetweenDescriptionFormat(betweenExpression);
	        description += stringUtilities_1.StringUtilities.format(betweenDescriptionFormat, betweenSegment1Description, betweenSegment2Description);
	        return description;
	    };
	    cronstrue.prototype.formatTime = function (hourExpression, minuteExpression, secondExpression) {
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
	            second = ":" + ('00' + secondExpression).substring(secondExpression.length);
	        }
	        return ('00' + hour.toString()).substring(hour.toString().length) + ":" + ('00' + minute.toString()).substring(minute.toString().length) + second + period;
	    };
	    cronstrue.prototype.transformVerbosity = function (description, useVerboseFormat) {
	        if (!useVerboseFormat) {
	            description = description.replace(new RegExp(this.i18n.ComaEveryMinute(), 'g'), "");
	            description = description.replace(new RegExp(this.i18n.ComaEveryHour(), 'g'), "");
	            description = description.replace(new RegExp(this.i18n.ComaEveryDay(), 'g'), "");
	        }
	        return description;
	    };
	    cronstrue.locales = {};
	    return cronstrue;
	}());
	cronstrue.initialize();
	module.exports = cronstrue;


/***/ },
/* 1 */
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
/* 2 */
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
	            throw new Error('Expression is empty');
	        }
	        var parsed = this.expression.trim().split(' ');
	        if (parsed.length < 5) {
	            throw new Error("Expression only has " + parsed.length + " parts.  At least 5 part are required.");
	        }
	        else if (parsed.length == 5) {
	            parsed.unshift('');
	            parsed.push('');
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
	            'SUN': 0, 'MON': 1, 'TUE': 2, 'WED': 3, 'THU': 4, 'FRI': 5, 'SAT': 6
	        };
	        for (var day in days) {
	            expressionParts[5] = expressionParts[5].replace(new RegExp(day, "g"), days[day].toString());
	        }
	        var months = {
	            'JAN': 1, 'FEB': 2, 'MAR': 3, 'APR': 4, 'MAY': 5, 'JUN': 6, 'JUL': 7, 'AUG': 8, 'SEP': 9, 'OCT': 10, 'NOV': 11, 'DEC': 12
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
	                    var parts = expressionParts[i].split('/');
	                    expressionParts[i] = parts[0] + "-" + stepRangeThrough + "/" + parts[1];
	                }
	            }
	        }
	    };
	    return CronParser;
	}());
	exports.CronParser = CronParser;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var availableLocales = __webpack_require__(4);
	function init(locales) {
	    for (var property in availableLocales) {
	        if (availableLocales.hasOwnProperty(property)) {
	            var locale = new (availableLocales[property]);
	            locales[property] = locale;
	        }
	    }
	}
	exports.init = init;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var en_1 = __webpack_require__(5);
	exports.en = en_1.en;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var en = (function () {
	    function en() {
	    }
	    en.prototype.AnErrorOccuredWhenGeneratingTheExpressionD = function () { return "An error occured when generating the expression description.  Check the cron expression syntax."; };
	    ;
	    en.prototype.EveryMinute = function () { return "every minute"; };
	    ;
	    en.prototype.EveryHour = function () { return "every hour"; };
	    ;
	    en.prototype.AtSpace = function () { return "At "; };
	    ;
	    en.prototype.EveryMinuteBetweenX0AndX1 = function () { return "Every minute between %s and %s"; };
	    ;
	    en.prototype.At = function () { return "At"; };
	    ;
	    en.prototype.SpaceAnd = function () { return " and"; };
	    ;
	    en.prototype.EverySecond = function () { return "every second"; };
	    ;
	    en.prototype.EveryX0Seconds = function () { return "every %s seconds"; };
	    ;
	    en.prototype.SecondsX0ThroughX1PastTheMinute = function () { return "seconds %s through %s past the minute"; };
	    ;
	    en.prototype.AtX0SecondsPastTheMinute = function () { return "at %s seconds past the minute"; };
	    ;
	    en.prototype.AtX0SecondsPastTheMinuteGt20 = function () { return null; };
	    en.prototype.EveryX0Minutes = function () { return "every %s minutes"; };
	    ;
	    en.prototype.MinutesX0ThroughX1PastTheHour = function () { return "minutes %s through %s past the hour"; };
	    ;
	    en.prototype.AtX0MinutesPastTheHour = function () { return "at %s minutes past the hour"; };
	    ;
	    en.prototype.AtX0MinutesPastTheHourGt20 = function () { return null; };
	    en.prototype.EveryX0Hours = function () { return "every %s hours"; };
	    ;
	    en.prototype.BetweenX0AndX1 = function () { return "between %s and %s"; };
	    ;
	    en.prototype.AtX0 = function () { return "at %s"; };
	    ;
	    en.prototype.ComaEveryDay = function () { return ", every day"; };
	    ;
	    en.prototype.ComaEveryX0DaysOfTheWeek = function () { return ", every %s days of the week"; };
	    ;
	    en.prototype.ComaX0ThroughX1 = function () { return ", %s through %s"; };
	    ;
	    en.prototype.ComaMonthX0ThroughMonthX1 = function () { return null; };
	    en.prototype.ComaYearX0ThroughYearX1 = function () { return null; };
	    en.prototype.First = function () { return "first"; };
	    ;
	    en.prototype.Second = function () { return "second"; };
	    ;
	    en.prototype.Third = function () { return "third"; };
	    ;
	    en.prototype.Forth = function () { return "forth"; };
	    ;
	    en.prototype.Fifth = function () { return "fifth"; };
	    ;
	    en.prototype.ComaOnThe = function () { return ", on the "; };
	    ;
	    en.prototype.SpaceX0OfTheMonth = function () { return " %s of the month"; };
	    ;
	    en.prototype.ComaOnTheLastX0OfTheMonth = function () { return ", on the last %s of the month"; };
	    ;
	    en.prototype.ComaOnlyOnX0 = function () { return ", only on %s"; };
	    ;
	    en.prototype.ComaEveryX0Months = function () { return ", every %s months"; };
	    ;
	    en.prototype.ComaOnlyInX0 = function () { return ", only in %s"; };
	    ;
	    en.prototype.ComaOnTheLastDayOfTheMonth = function () { return ", on the last day of the month"; };
	    ;
	    en.prototype.ComaOnTheLastWeekdayOfTheMonth = function () { return ", on the last weekday of the month"; };
	    ;
	    en.prototype.FirstWeekday = function () { return "first weekday"; };
	    ;
	    en.prototype.WeekdayNearestDayX0 = function () { return "weekday nearest day %s"; };
	    ;
	    en.prototype.ComaOnTheX0OfTheMonth = function () { return ", on the %s of the month"; };
	    ;
	    en.prototype.ComaEveryX0Days = function () { return ", every %s days"; };
	    ;
	    en.prototype.ComaBetweenDayX0AndX1OfTheMonth = function () { return ", between day %s and %s of the month"; };
	    ;
	    en.prototype.ComaOnDayX0OfTheMonth = function () { return ", on day %s of the month"; };
	    ;
	    en.prototype.SpaceAndSpace = function () { return " and "; };
	    ;
	    en.prototype.ComaEveryMinute = function () { return ", every minute"; };
	    ;
	    en.prototype.ComaEveryHour = function () { return ", every hour"; };
	    ;
	    en.prototype.ComaEveryX0Years = function () { return ", every %s years"; };
	    ;
	    en.prototype.CommaStartingX0 = function () { return ", starting %s"; };
	    ;
	    return en;
	}());
	exports.en = en;


/***/ }
/******/ ])
});
;