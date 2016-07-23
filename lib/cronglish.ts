import { StringUtilities } from './stringUtilities'
import { CronParser } from './cronParser'
import Options from './options'
import DescriptionTypeEnum from './descriptionTypeEnum'
import CasingTypeEnum from './casingTypeEnum'

class ExpressionDescriptor {
    expression: string;
    parsed: boolean = false;
    expressionParts: string[];
    options: Options;
    specialCharacters: string[];
    text: any;

    constructor(expression: string) {
        this.expression = expression;
        this.parsed = false;
        this.expressionParts = new Array(5);
        this.options = new Options();
        this.specialCharacters = ["/", "-", ",", "*"];
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
        if (this.specialCharacters.some((c) => { return minuteExpression.indexOf(c) > -1 })
            && this.specialCharacters.some((c) => { return hourExpression.indexOf(c) > -1 })
            && this.specialCharacters.some((c) => { return secondsExpression.indexOf(c) > -1 })) {
            //specific time of day (i.e. 10 14)
            description += StringUtilities.format(this.text.AtSpace, this.formatTime(hourExpression, minuteExpression, secondsExpression));
        }
        else if (
            minuteExpression.indexOf("-") > -1
            && !(minuteExpression.indexOf(",") > -1)
            && !this.specialCharacters.some((c) => { return hourExpression.indexOf(c) > -1 })) {
            //minute range in single hour (i.e. 0-10 11)
            let minuteParts: string[] = minuteExpression.split("-");
            description += "";
            //description.Append(string.Format(CronExpressionDescriptor.Resources.EveryMinuteBetweenX0AndX1,
            //    FormatTime(hourExpression, minuteParts[0]),
            //    FormatTime(hourExpression, minuteParts[1])));
        }
        /* else if (hourExpression.Contains(",") && minuteExpression.IndexOfAny(m_specialCharacters) == -1) {
             //hours list with single minute (o.e. 30 6,14,16)
             string[] hourParts = hourExpression.Split(',');
             description.Append(CronExpressionDescriptor.Resources.At);
             for (int i = 0; i < hourParts.Length; i++)
             {
                 description.Append(" ").Append(FormatTime(hourParts[i], minuteExpression));
 
                 if (i < (hourParts.Length - 2)) {
                     description.Append(",");
                 }
 
                 if (i == hourParts.Length - 2) {
                     description.Append(CronExpressionDescriptor.Resources.SpaceAnd);
                 }
             }
         }
         else {
             //default time description
             let secondsDescription = this.getSecondsDescription();
             let minutesDescription = this.getMinutesDescription();
             let string hoursDescription = this.getHoursDescription();
 
             description.Append(secondsDescription);
 
             if (description.Length > 0) {
                 description.Append(", ");
             }
 
             description.Append(minutesDescription);
 
             if (description.Length > 0) {
                 description.Append(", ");
             }
 
             description += hoursDescription;
         }*/


        return description;
    }
    getHoursDescription() {
        return "";
    }
    getMinutesDescription() {
        return "";
    }
    getSecondsDescription() {
        return "";
    }
    getDayOfMonthDescription() {
        return "";
    }
    getMonthDescription() {
        return "";
    }
    getDayOfWeekDescription() {
        return "";
    }
    getYearDescription() {
        return "";
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
            description = description.replace(this.text.ComaEveryMinute, "");
            description = description.replace(this.text.CommaEveryHour, "");
            description = description.replace(this.text.ComaEveryDay, "");
        }
        return description;
    }

    transformCase(description: string, caseType: CasingTypeEnum) {
        switch (caseType) {
            case CasingTypeEnum.SENTENCE:
                description = description.toLocaleUpperCase();
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