import { StringUtilities } from './stringUtilities';
import { CronParser }  from './cronParser';
import { IOptions } from './options';
import { CasingTypeEnum } from './casingTypeEnum';
import LocalesManager = require('./locale/localesManager')
import { Locale } from './locale/locale';
import { en } from './locale/en';

class cronstrue {
    static locales: { [name: string]: Locale } = {};

    expression: string;
    parsed: boolean = false;
    expressionParts: string[];
    options: IOptions;
    specialCharacters: string[];
    i18n: Locale;

    // public interface entry point
    static toString(expression: string, {
        throwExceptionOnParseError = true,
        casingType = CasingTypeEnum.Sentence,
        verbose = false,
        dayOfWeekStartIndexZero = true,
        use24HourTimeFormat = false,
        locale = 'en'
    }: IOptions = {}) {
        // We take advantage of Destructuring Object Parameters (and defaults) in TS/ES6 and now we will reassemble back to 
        // a IOptions so we can pass around options with ease.

        let options = <IOptions>{
            throwExceptionOnParseError: throwExceptionOnParseError,
            casingType: casingType,
            verbose: verbose,
            dayOfWeekStartIndexZero: dayOfWeekStartIndexZero,
            use24HourTimeFormat: use24HourTimeFormat,
            locale: locale
        };

        let descripter = new cronstrue(expression, options);
        return descripter.getFullDescription();
    }

    static initialize() {
        // Load locales
        LocalesManager.init(cronstrue.locales);
    }

    constructor(expression: string, options: IOptions) {
        this.expression = expression;
        this.options = options;
        this.expressionParts = new Array(5);
        this.specialCharacters = ["/", "-", ",", "*"];
        this.i18n = cronstrue.locales[options.locale || 'en'];
    }

    protected getFullDescription() {

        let description = "";

        try {
            let parser = new CronParser(this.expression, this.options.dayOfWeekStartIndexZero);
            this.expressionParts = parser.parse();

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
            if (!this.options.throwExceptionOnParseError) {
                description = this.i18n.AnErrorOccuredWhenGeneratingTheExpressionD();
            } else {
                throw `Error: ${ex}`;
            }
        }
        return description;
    }

    protected getTimeOfDayDescription() {
        let secondsExpression: string = this.expressionParts[0];
        let minuteExpression: string = this.expressionParts[1];
        let hourExpression: string = this.expressionParts[2];

        let description = "";

        //handle special cases first
        if (!StringUtilities.containsAny(minuteExpression, this.specialCharacters)
            && !StringUtilities.containsAny(hourExpression, this.specialCharacters)
            && !StringUtilities.containsAny(secondsExpression, this.specialCharacters)) {
            //specific time of day (i.e. 10 14)
            description += this.i18n.AtSpace() + this.formatTime(hourExpression, minuteExpression, secondsExpression);
        }
        else if (
            minuteExpression.indexOf("-") > -1
            && !(minuteExpression.indexOf(",") > -1)
            && !StringUtilities.containsAny(hourExpression, this.specialCharacters)) {

            //minute range in single hour (i.e. 0-10 11)
            let minuteParts: string[] = minuteExpression.split("-");
            description += StringUtilities.format(this.i18n.EveryMinuteBetweenX0AndX1(),
                this.formatTime(hourExpression, minuteParts[0], ""),
                this.formatTime(hourExpression, minuteParts[1], ""));
        }
        else if (hourExpression.indexOf(",") > -1 && !StringUtilities.containsAny(minuteExpression, this.specialCharacters)) {
            //hours list with single minute (o.e. 30 6,14,16)
            let hourParts: string[] = hourExpression.split(",");
            description += this.i18n.At();

            for (let i = 0; i < hourParts.length; i++) {
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

    protected getSecondsDescription() {
        let description: string = this.getSegmentDescription(this.expressionParts[0],
            this.i18n.EverySecond(),
            (s) => { return s },
            (s) => { return StringUtilities.format(this.i18n.EveryX0Seconds(), s) },
            (s) => { return this.i18n.SecondsX0ThroughX1PastTheMinute() },
            (s) => {
                return s == "0" ? "" : parseInt(s) < 20
                    ? this.i18n.AtX0SecondsPastTheMinute()
                    : this.i18n.AtX0SecondsPastTheMinuteGt20() || this.i18n.AtX0SecondsPastTheMinute()
            });

        return description;
    }

    protected getMinutesDescription() {
        let description: string = this.getSegmentDescription(this.expressionParts[1],
            this.i18n.EveryMinute(),
            (s) => { return s },
            (s) => { return StringUtilities.format(this.i18n.EveryX0Minutes(), s) },
            (s) => { return this.i18n.MinutesX0ThroughX1PastTheHour() },
            (s) => {
                try {
                    return s == "0" ? "" : parseInt(s) < 20
                        ? this.i18n.AtX0MinutesPastTheHour()
                        : this.i18n.AtX0MinutesPastTheHourGt20() || this.i18n.AtX0MinutesPastTheHour()
                } catch (e) {
                    return this.i18n.AtX0MinutesPastTheHour();
                }
            });

        return description;
    }

    protected getHoursDescription() {
        let expression = this.expressionParts[2];
        let description: string = this.getSegmentDescription(expression,
            this.i18n.EveryHour(),
            (s) => { return this.formatTime(s, "0", "") },
            (s) => { return StringUtilities.format(this.i18n.EveryX0Hours(), s) },
            (s) => { return this.i18n.BetweenX0AndX1() },
            (s) => { return this.i18n.AtX0() });

        return description;
    }

    protected getDayOfWeekDescription() {
        var daysOfWeekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let description: string = this.getSegmentDescription(this.expressionParts[5],
            this.i18n.ComaEveryDay(),
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
            (s) => { return StringUtilities.format(this.i18n.ComaEveryX0DaysOfTheWeek(), s) },
            (s) => { return this.i18n.ComaX0ThroughX1() },
            (s) => {
                let format: string = null;
                if (s.indexOf("#") > -1) {
                    let dayOfWeekOfMonthNumber: string = s.substring(s.indexOf("#") + 1);
                    let dayOfWeekOfMonthDescription: string = null;
                    switch (dayOfWeekOfMonthNumber) {
                        case "1":
                            dayOfWeekOfMonthDescription = this.i18n.First();
                            break;
                        case "2":
                            dayOfWeekOfMonthDescription = this.i18n.Second();
                            break;
                        case "3":
                            dayOfWeekOfMonthDescription = this.i18n.Third();
                            break;
                        case "4":
                            dayOfWeekOfMonthDescription = this.i18n.Forth();
                            break;
                        case "5":
                            dayOfWeekOfMonthDescription = this.i18n.Fifth();
                            break;
                    }


                    format = this.i18n.ComaOnThe() + dayOfWeekOfMonthDescription + this.i18n.SpaceX0OfTheMonth();
                }
                else if (s.indexOf("L") > -1) {
                    format = this.i18n.ComaOnTheLastX0OfTheMonth();
                }
                else {
                    format = this.i18n.ComaOnlyOnX0();
                }

                return format;
            });

        return description;
    }

    protected getMonthDescription() {
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        let description: string = this.getSegmentDescription(this.expressionParts[4],
            "",
            (s) => { return monthNames[(parseInt(s) - 1)] },
            (s) => { return StringUtilities.format(this.i18n.ComaEveryX0Months(), s) },
            (s) => { return this.i18n.ComaMonthX0ThroughMonthX1() || this.i18n.ComaX0ThroughX1() },
            (s) => { return this.i18n.ComaOnlyInX0() });

        return description;
    }

    protected getDayOfMonthDescription(): string {
        let description: string = null;
        let expression: string = this.expressionParts[3];

        switch (expression) {
            case "L":
                description = this.i18n.ComaOnTheLastDayOfTheMonth();
                break;
            case "WL":
            case "LW":
                description = this.i18n.ComaOnTheLastWeekdayOfTheMonth();
                break;
            default:
                let matches = expression.match(/(\d{1,2}W)|(W\d{1,2})/);
                if (matches) {
                    let dayNumber: number = parseInt(matches[0].replace("W", ""));
                    let dayString: string = dayNumber == 1 ? this.i18n.FirstWeekday() :
                        StringUtilities.format(this.i18n.WeekdayNearestDayX0(), dayNumber.toString());
                    description = StringUtilities.format(this.i18n.ComaOnTheX0OfTheMonth(), dayString);

                    break;
                }
                else {
                    description = this.getSegmentDescription(expression,
                        this.i18n.ComaEveryDay(),
                        (s) => { return s },
                        (s) => {
                            return s == "1" ? this.i18n.ComaEveryDay() :
                                this.i18n.ComaEveryX0Days()
                        },
                        (s) => { return this.i18n.ComaBetweenDayX0AndX1OfTheMonth() },
                        (s) => { return this.i18n.ComaOnDayX0OfTheMonth() });
                    break;
                }
        }

        return description;
    }

    protected getYearDescription() {
        let description: string = this.getSegmentDescription(this.expressionParts[6],
            "",
            (s) => { return /^\d+$/.test(s) ? new Date(parseInt(s), 1).getFullYear().toString() : s },
            (s) => { return StringUtilities.format(this.i18n.ComaEveryX0Years(), s) },
            (s) => { return this.i18n.ComaYearX0ThroughYearX1() || this.i18n.ComaX0ThroughX1() },
            (s) => { return this.i18n.ComaOnlyInX0() });

        return description;
    }

    protected getSegmentDescription(expression: string,
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

                description += StringUtilities.format(this.i18n.CommaStartingX0(), rangeItemDescription);
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
                    descriptionContent += this.i18n.SpaceAndSpace();
                }

                if (segments[i].indexOf("-") > -1) {
                    let betweenSegmentDescription: string = this.generateBetweenSegmentDescription(segments[i], ((s) => { return this.i18n.ComaX0ThroughX1() }), getSingleItemDescription);

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

    protected generateBetweenSegmentDescription(betweenExpression: string,
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

    protected formatTime(hourExpression: string, minuteExpression: string, secondExpression: string) {
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
            second = `:${('00' + secondExpression).substring(secondExpression.length)}`;
        }

        return `${('00' + hour.toString()).substring(hour.toString().length)}:${('00' + minute.toString()).substring(minute.toString().length)}${second}${period}`;
    }

    protected transformVerbosity(description: string, useVerboseFormat: boolean) {
        if (!useVerboseFormat) {
            description = description.replace(new RegExp(this.i18n.ComaEveryMinute(), 'g'), "");
            description = description.replace(new RegExp(this.i18n.ComaEveryHour(), 'g'), "");
            description = description.replace(new RegExp(this.i18n.ComaEveryDay(), 'g'), "");
        }
        return description;
    }

    protected transformCase(description: string, caseType: CasingTypeEnum) {
        switch (caseType) {
            case CasingTypeEnum.Sentence:
                description = description[0].toLocaleUpperCase() + description.substring(1);
                break;
            case CasingTypeEnum.Title:
                description = StringUtilities.toProperCase(description);
                break;
            default:
                description = description.toLocaleLowerCase();
                break;
        }
        return description;
    }
}

cronstrue.initialize();

export = cronstrue;