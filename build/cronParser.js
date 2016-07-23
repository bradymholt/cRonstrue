"use strict";
var CronParser = (function () {
    function CronParser(expression) {
        this.expression = expression;
    }
    CronParser.prototype.parse = function () {
        if (!this.expression) {
            throw new Error('Expression is empty');
        }
        var parsed = this.expression.split(' ');
        if (parsed.length < 5) {
            throw new Error("Expression only has " + parsed.length + " parts.  At least 5 part are required.");
        }
        else if (parsed.length == 5) {
            parsed.unshift('0');
            parsed.push('0');
        }
        else if (parsed.length == 6) {
            if (/^\d{4}$/.test(parsed[5])) {
                parsed.unshift('0');
            }
            else {
                parsed.push('0');
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
