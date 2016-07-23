"use strict";
var casingTypeEnum_1 = require('./casingTypeEnum');
var Options = (function () {
    function Options() {
        this.throwExceptionOnParseError = true;
        this.casingType = casingTypeEnum_1.default.SENTENCE;
        this.verbose = false;
        this.dayOfWeekStartIndexZero = true;
        this.use24HourTimeFormat = false;
    }
    return Options;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Options;
