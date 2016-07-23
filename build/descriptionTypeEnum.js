"use strict";
var DescriptionTypeEnum;
(function (DescriptionTypeEnum) {
    DescriptionTypeEnum[DescriptionTypeEnum["FULL"] = 0] = "FULL";
    DescriptionTypeEnum[DescriptionTypeEnum["TIMEOFDAY"] = 1] = "TIMEOFDAY";
    DescriptionTypeEnum[DescriptionTypeEnum["SECONDS"] = 2] = "SECONDS";
    DescriptionTypeEnum[DescriptionTypeEnum["MINUTES"] = 3] = "MINUTES";
    DescriptionTypeEnum[DescriptionTypeEnum["HOURS"] = 4] = "HOURS";
    DescriptionTypeEnum[DescriptionTypeEnum["DAYOFWEEK"] = 5] = "DAYOFWEEK";
    DescriptionTypeEnum[DescriptionTypeEnum["MONTH"] = 6] = "MONTH";
    DescriptionTypeEnum[DescriptionTypeEnum["DAYOFMONTH"] = 7] = "DAYOFMONTH";
    DescriptionTypeEnum[DescriptionTypeEnum["YEAR"] = 8] = "YEAR";
})(DescriptionTypeEnum || (DescriptionTypeEnum = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DescriptionTypeEnum;
