import { StringUtilities } from './stringUtilities'
import { CronParser } from './cronParser'
import Options from './options'
import DescriptionTypeEnum from './descriptionTypeEnum'
import CasingTypeEnum from './casingTypeEnum'

export class ExpressionDescriptor {
    expression: string;
    parsed: boolean = false;
    expressionParts: string[];
    options: Options;
    specialCharacters: string[];
    text: any;

    constructor(expression: string, options:Options = new Options()) {
        this.expression = expression;
        this.parsed = false;
        this.expressionParts = new Array(5);
        this.options = options;
        this.specialCharacters = ["/", "-", ",", "*"];
        this.text = {
            "EveryMinute": "every minute",
            "EveryHour": "every hour",
            "AnErrorOccuredWhenGeneratingTheExpressionD": "An error occured when generating the expression description.  Check the cron expression syntax.",
            "AtSpace": "At ",
            "EveryMinuteBetweenX0AndX1": "Every minute between %s and %s",
            "At": "At",
            "SpaceAnd": " and",
            "EverySecond": "every second",
            "EveryX0Seconds": "every %s seconds",
            "SecondsX0ThroughX1PastTheMinute": "seconds %s through %s past the minute",
            "AtX0SecondsPastTheMinute": "at %s seconds past the minute",
            "EveryX0Minutes": "every %s minutes",
            "MinutesX0ThroughX1PastTheHour": "minutes %s through %s past the hour",
            "AtX0MinutesPastTheHour": "at %s minutes past the hour",
            "EveryX0Hours": "every %s hours",
            "BetweenX0AndX1": "between %s and %s",
            "AtX0": "at %s",
            "ComaEveryDay": ", every day",
            "ComaEveryX0DaysOfTheWeek": ", every %s days of the week",
            "ComaX0ThroughX1": ", %s through %s",
            "First": "first",
            "Second": "second",
            "Third": "third",
            "Forth": "forth",
            "Fifth": "fifth",
            "ComaOnThe": ", on the ",
            "SpaceX0OfTheMonth": " %s of the month",
            "ComaOnTheLastX0OfTheMonth": ", on the last %s of the month",
            "ComaOnlyOnX0": ", only on %s",
            "ComaEveryX0Months": ", every %s months",
            "ComaOnlyInX0": ", only in %s",
            "ComaOnTheLastDayOfTheMonth": ", on the last day of the month",
            "ComaOnTheLastWeekdayOfTheMonth": ", on the last weekday of the month",
            "FirstWeekday": "first weekday",
            "WeekdayNearestDayX0": "weekday nearest day %s",
            "ComaOnTheX0OfTheMonth": ", on the %s of the month",
            "ComaEveryX0Days": ", every %s days",
            "ComaBetweenDayX0AndX1OfTheMonth": ", between day %s and %s of the month",
            "ComaOnDayX0OfTheMonth": ", on day %s of the month",
            "SpaceAndSpace": " and ",
            "ComaEveryMinute": ", every minute",
            "ComaEveryHour": ", every hour",
            "ComaEveryX0Years": ", every %s years",
            "CommaStartingX0": ", starting %s"
        };
    }

    static getDescription(expression: string, options: Options) {
        let descripter = new ExpressionDescriptor(expression, options);
        return descripter.getDescription(DescriptionTypeEnum.FULL);
    }

    getDescription(type: DescriptionTypeEnum) {
        var description = "";
        try {

            if (!this.parsed) {
                let parser = new CronParser(this.expression, this.options);
                this.expressionParts = parser.parse();
                this.parsed = true;
            }

            switch (type) {
                case DescriptionTypeEnum.FULL:
                    description = this.getFullDescription();
                    break;
                case DescriptionTypeEnum.TIMEOFDAY:
                    description = this.getTimeOfDayDescription();
                    break;
                case DescriptionTypeEnum.HOURS:
                    description = this.getHoursDescription();
                    break;
                case DescriptionTypeEnum.MINUTES:
                    description = this.getMinutesDescription();
                    break;
                case DescriptionTypeEnum.SECONDS:
                    description = this.getSecondsDescription();
                    break;
                case DescriptionTypeEnum.DAYOFMONTH:
                    description = this.getDayOfMonthDescription();
                    break;
                case DescriptionTypeEnum.MONTH:
                    description = this.getMonthDescription();
                    break;
                case DescriptionTypeEnum.DAYOFWEEK:
                    description = this.getDayOfWeekDescription();
                    break;
                case DescriptionTypeEnum.YEAR:
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
    }

    getFullDescription() {
        var description: string;
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
    }

    getTimeOfDayDescription() {
        let secondsExpression: string = this.expressionParts[0];
        let minuteExpression: string = this.expressionParts[1];
        let hourExpression: string = this.expressionParts[2];

        let description = "";

        //handle special cases first
        if (!StringUtilities.containsAny(minuteExpression, this.specialCharacters)
            && !StringUtilities.containsAny(hourExpression, this.specialCharacters)
            && !StringUtilities.containsAny(secondsExpression, this.specialCharacters)) {
            //specific time of day (i.e. 10 14)
            description += StringUtilities.format(this.text.AtSpace, this.formatTime(hourExpression, minuteExpression, secondsExpression));
        }
        else if (
            minuteExpression.indexOf("-") > -1
            && !(minuteExpression.indexOf(",") > -1)
            && !StringUtilities.containsAny(hourExpression, this.specialCharacters)) {

            //minute range in single hour (i.e. 0-10 11)
            let minuteParts: string[] = minuteExpression.split("-");
            description += StringUtilities.format(this.text.EveryMinuteBetweenX0AndX1,
                this.formatTime(hourExpression, minuteParts[0], ""),
                this.formatTime(hourExpression, minuteParts[1], ""));
        }
        else if (hourExpression.indexOf(",") > -1 && !StringUtilities.containsAny(minuteExpression, this.specialCharacters)) {
            //hours list with single minute (o.e. 30 6,14,16)
            let hourParts: string[] = hourExpression.split(",");
            description += this.text.At;

            for (let i = 0; i < hourParts.length; i++) {
                description += " ";
                description += this.formatTime(hourParts[1], minuteExpression, "");

                if (i < (hourParts.length - 2)) {
                    description += ",";
                }

                if (i == hourParts.length - 2) {
                    description += this.text.SpaceAnd;
                }
            }
        }
        else {
            //default time description
            let secondsDescription = this.getSecondsDescription();
            let minutesDescription = this.getMinutesDescription();
            let hoursDescription = this.getHoursDescription();

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
    }

    getSecondsDescription() {
        let description: string = this.getSegmentDescription(this.expressionParts[0],
            this.text.EverySecond,
            (s) => { return s },
            (s) => { return StringUtilities.format(this.text.EveryX0Seconds, s) },
            (s) => { return this.text.SecondsX0ThroughX1PastTheMinute },
            (s) => {
                return s == "0" ? "" : parseInt(s) < 20
                    ? this.text.AtX0SecondsPastTheMinute
                    : this.text.AtX0SecondsPastTheMinuteGt20 || this.text.AtX0SecondsPastTheMinute
            });

        return description;
    }

    getMinutesDescription() {
        let description: string = this.getSegmentDescription(this.expressionParts[1],
            this.text.EveryMinute,
            (s) => { return s },
            (s) => { return StringUtilities.format(this.text.EveryX0Minutes, s) },
            (s) => { return this.text.MinutesX0ThroughX1PastTheHour },
            (s) => {
                try {
                    return s == "0" ? "" : parseInt(s) < 20
                        ? this.text.AtX0MinutesPastTheHour
                        : this.text.AtX0MinutesPastTheHourGt20 || this.text.AtX0MinutesPastTheHour
                } catch (e) {
                    return this.text.AtX0MinutesPastTheHour;
                }
            });

        return description;
    }

    getHoursDescription() {
        let expression = this.expressionParts[2];
        let description: string = this.getSegmentDescription(expression,
            this.text.EveryHour,
            (s) => { return this.formatTime(s, "0", "") },
            (s) => { return StringUtilities.format(this.text.EveryX0Hours, s) },
            (s) => { return this.text.BetweenX0AndX1 },
            (s) => { return this.text.AtX0 });

        return description;
    }

    getDayOfWeekDescription() {
        var daysOfWeekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let description: string = this.getSegmentDescription(this.expressionParts[5],
            this.text.ComaEveryDay,
            (s) => {
                let exp: string = s;
                if (s.indexOf("#") > -1) {
                    exp = s.substr(0, s.indexOf("#"));
                }
                else if (s.indexOf("L") > -1) {
                    exp = exp.replace("L", "");
                }

                return daysOfWeekNames[parseInt(exp)];
            },
            (s) => { return StringUtilities.format(this.text.ComaEveryX0DaysOfTheWeek, s) },
            (s) => { return this.text.ComaX0ThroughX1 },
            (s) => {
                let format: string = null;
                if (s.indexOf("#") > -1) {
                    let dayOfWeekOfMonthNumber: string = s.substring(s.indexOf("#") + 1);
                    let dayOfWeekOfMonthDescription: string = null;
                    switch (dayOfWeekOfMonthNumber) {
                        case "1":
                            dayOfWeekOfMonthDescription = this.text.First;
                            break;
                        case "2":
                            dayOfWeekOfMonthDescription = this.text.Second;
                            break;
                        case "3":
                            dayOfWeekOfMonthDescription = this.text.Third;
                            break;
                        case "4":
                            dayOfWeekOfMonthDescription = this.text.Forth;
                            break;
                        case "5":
                            dayOfWeekOfMonthDescription = this.text.Fifth;
                            break;
                    }


                    format = this.text.ComaOnThe + dayOfWeekOfMonthDescription + this.text.SpaceX0OfTheMonth;
                }
                else if (s.indexOf("L") > -1) {
                    format = this.text.ComaOnTheLastX0OfTheMonth;
                }
                else {
                    format = this.text.ComaOnlyOnX0;
                }

                return format;
            });

        return description;
    }

    getMonthDescription() {
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        let description: string = this.getSegmentDescription(this.expressionParts[4],
            "",
            (s) => { return monthNames[(parseInt(s) - 1)] },
            (s) => { return StringUtilities.format(this.text.ComaEveryX0Months, s) },
            (s) => { return this.text.ComaMonthX0ThroughMonthX1 || this.text.ComaX0ThroughX1 },
            (s) => { return this.text.ComaOnlyInX0 });

        return description;
    }

    getDayOfMonthDescription(): string {
        let description: string = null;
        let expression: string = this.expressionParts[3];

        switch (expression) {
            case "L":
                description = this.text.ComaOnTheLastDayOfTheMonth;
                break;
            case "WL":
            case "LW":
                description = this.text.ComaOnTheLastWeekdayOfTheMonth;
                break;
            default:
                let matches = expression.match(/(\\d{1,2}W)|(W\\d{1,2})/);
                if (matches) {
                    let dayNumber: number = parseInt(matches[0].replace("W", ""));
                    let dayString: string = dayNumber == 1 ? this.text.FirstWeekday :
                        StringUtilities.format(this.text.WeekdayNearestDayX0, dayNumber.toString());
                    description = StringUtilities.format(this.text.ComaOnTheX0OfTheMonth, dayString);

                    break;
                }
                else {
                    description = this.getSegmentDescription(expression,
                        this.text.ComaEveryDay,
                        (s) => { return s },
                        (s) => {
                            return s == "1" ? this.text.ComaEveryDay :
                                this.text.ComaEveryX0Days
                        },
                        (s) => { return this.text.ComaBetweenDayX0AndX1OfTheMonth },
                        (s) => { return this.text.ComaOnDayX0OfTheMonth });
                    break;
                }
        }

        return description;
    }



    getYearDescription() {
        let description: string = this.getSegmentDescription(this.expressionParts[6],
            "",
            (s) => { return /^\d+$/.test(s) ? new Date(parseInt(s), 1).getFullYear().toString() : s },
            (s) => { return StringUtilities.format(this.text.ComaEveryX0Years, s) },
            (s) => { return this.text.ComaYearX0ThroughYearX1 || this.text.ComaX0ThroughX1 },
            (s) => { return this.text.ComaOnlyInX0 });

        return description;
    }

    getSegmentDescription(expression: string,
        allDescription: string,
        getSingleItemDescription: (t: string) => string,
        getIntervalDescriptionFormat: (t: string) => string,
        getBetweenDescriptionFormat: (t: string) => string,
        getDescriptionFormat: (t: string) => string
    ): string {
        let description: string = null;

        if (!expression) {
            description = "";
        }
        else if (expression === "*") {
            description = allDescription;
        }
        else if (!StringUtilities.containsAny(expression, ["/", "-", ","])) {
            description = StringUtilities.format(getDescriptionFormat(expression), getSingleItemDescription(expression));
        }
        else if (expression.indexOf("/") > -1) {
            let segments: string[] = expression.split("/");
            description = StringUtilities.format(getIntervalDescriptionFormat(segments[1]), getSingleItemDescription(segments[1]));

            //interval contains 'between' piece (i.e. 2-59/3 )
            if (segments[0].indexOf("-") > -1) {
                let betweenSegmentDescription: string = this.generateBetweenSegmentDescription(segments[0], getBetweenDescriptionFormat, getSingleItemDescription);

                if (betweenSegmentDescription.indexOf(", ") != 0) {
                    description += ", ";
                }

                description += betweenSegmentDescription;
            }
            else if (!StringUtilities.containsAny(segments[0], ["*", ","])) {
                let rangeItemDescription: string = StringUtilities.format(getDescriptionFormat(segments[0]), getSingleItemDescription(segments[0]));
                //remove any leading comma
                rangeItemDescription = rangeItemDescription.replace(", ", "");

                description += StringUtilities.format(this.text.CommaStartingX0, rangeItemDescription);
            }
        }
        else if (expression.indexOf(",") > -1) {
            let segments: string[] = expression.split(',');

            let descriptionContent: string = "";
            for (let i = 0; i < segments.length; i++) {
                if (i > 0 && segments.length > 2) {
                    descriptionContent += ",";

                    if (i < segments.length - 1) {
                        descriptionContent += " ";
                    }
                }

                if (i > 0 && segments.length > 1 && (i == segments.length - 1 || segments.length == 2)) {
                    descriptionContent += this.text.SpaceAndSpace;
                }

                if (segments[i].indexOf("-") > -1) {
                    let betweenSegmentDescription: string = this.generateBetweenSegmentDescription(segments[i], ((s) => { return this.text.ComaX0ThroughX1 }), getSingleItemDescription);

                    //remove any leading comma
                    betweenSegmentDescription = betweenSegmentDescription.replace(", ", "");

                    descriptionContent += betweenSegmentDescription;
                }
                else {
                    descriptionContent += getSingleItemDescription(segments[i]);
                }
            }

            description = StringUtilities.format(getDescriptionFormat(expression), descriptionContent);
        }
        else if (expression.indexOf("-") > -1) {
            description = this.generateBetweenSegmentDescription(expression, getBetweenDescriptionFormat, getSingleItemDescription);
        }

        return description;
    }

    generateBetweenSegmentDescription(betweenExpression: string,
        getBetweenDescriptionFormat: (t: string) => string,
        getSingleItemDescription: (t: string) => string): string {

        let description: string = "";
        let betweenSegments: string[] = betweenExpression.split('-');
        let betweenSegment1Description: string = getSingleItemDescription(betweenSegments[0]);
        let betweenSegment2Description: string = getSingleItemDescription(betweenSegments[1]);
        betweenSegment2Description = betweenSegment2Description.replace(":00", ":59");
        let betweenDescriptionFormat = getBetweenDescriptionFormat(betweenExpression);
        description += StringUtilities.format(betweenDescriptionFormat, betweenSegment1Description, betweenSegment2Description);

        return description;
    }

    formatTime(hourExpression: string, minuteExpression: string, secondExpression: string) {
        let hour: number = parseInt(hourExpression);

        let period: string = "";
        if (!this.options.use24HourTimeFormat) {
            period = (hour >= 12) ? " PM" : " AM";
            if (hour > 12) {
                hour -= 12;
            }
        }

        let minute = minuteExpression;
        let second: string = "";
        if (secondExpression) {
            second = `: ${('00' + secondExpression).substring(secondExpression.length)}`;
        }

        return `${('00' + hour.toString()).substring(hour.toString().length)}:${('00' + minute.toString()).substring(minute.toString().length)}${second}${period}`;
    }

    transformVerbosity(description: string, useVerboseFormat: boolean) {
        if (!useVerboseFormat) {
            description = description.replace(new RegExp(this.text.ComaEveryMinute, 'g'), "");
            description = description.replace(new RegExp(this.text.ComaEveryHour, 'g'), "");
            description = description.replace(new RegExp(this.text.ComaEveryDay, 'g'), "");
        }
        return description;
    }

    transformCase(description: string, caseType: CasingTypeEnum) {
        switch (caseType) {
            case CasingTypeEnum.SENTENCE:
                description = description[0].toLocaleUpperCase() + description.substring(1);
                break;
            case CasingTypeEnum.TITLE:
                description = StringUtilities.toProperCase(description);
                break;
            default:
                description = description.toLocaleLowerCase();
                break;
        }
        return description;
    }
}