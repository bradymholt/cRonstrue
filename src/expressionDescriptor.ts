import { StringUtilities } from "./stringUtilities";
import { CronParser } from "./cronParser";
import { Options } from "./options";

import { Locale } from "./i18n/locale";
import { LocaleLoader } from "./i18n/localeLoader";

export class ExpressionDescriptor {
  static locales: { [name: string]: Locale } = {};
  static specialCharacters: string[];

  expression: string;
  expressionParts: string[];
  options: Options;
  i18n: Locale;

  /**
   * Converts a cron expression into a description a human can read
   * @static
   * @param {string} expression - The cron expression
   * @param {IOptions} [{
   *         throwExceptionOnParseError = true,
   *         casingType = CasingTypeEnum.Sentence,
   *         verbose = false,
   *         dayOfWeekStartIndexZero = true,
   *         use24HourTimeFormat = false,
   *         locale = 'en'
   *     }={}]
   * @returns {string}
   */
  static toString(
    expression: string,
    {
      throwExceptionOnParseError = true,
      verbose = false,
      dayOfWeekStartIndexZero = true,
      use24HourTimeFormat,
      locale = "en"
    }: Options = {}
  ): string {
    // We take advantage of Destructuring Object Parameters (and defaults) in TS/ES6 and now we will reassemble back to
    // an Options type so we can pass around options with ease.

    let options = <Options>{
      throwExceptionOnParseError: throwExceptionOnParseError,
      verbose: verbose,
      dayOfWeekStartIndexZero: dayOfWeekStartIndexZero,
      use24HourTimeFormat: use24HourTimeFormat,
      locale: locale
    };

    let descripter = new ExpressionDescriptor(expression, options);
    return descripter.getFullDescription();
  }

  static initialize(localesLoader: LocaleLoader) {
    ExpressionDescriptor.specialCharacters = ["/", "-", ",", "*"];

    // Load locales
    localesLoader.load(ExpressionDescriptor.locales);
  }

  constructor(expression: string, options: Options) {
    this.expression = expression;
    this.options = options;
    this.expressionParts = new Array(5);

    if (ExpressionDescriptor.locales[options.locale]) {
      this.i18n = ExpressionDescriptor.locales[options.locale];
    } else {
      // fall back to English
      console.warn(`Locale '${options.locale}' could not be found; falling back to 'en'.`);
      this.i18n = ExpressionDescriptor.locales["en"];
    }

    if (options.use24HourTimeFormat === undefined) {
      // if use24HourTimeFormat not specified, set based on locale default
      options.use24HourTimeFormat = this.i18n.use24HourTimeFormatByDefault();
    }
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

      description += timeSegment + dayOfMonthDesc + dayOfWeekDesc + monthDesc + yearDesc;
      description = this.transformVerbosity(description, this.options.verbose);

      // uppercase first character
      description = description.charAt(0).toLocaleUpperCase() + description.substr(1);
    } catch (ex) {
      if (!this.options.throwExceptionOnParseError) {
        description = this.i18n.anErrorOccuredWhenGeneratingTheExpressionD();
      } else {
        throw `${ex}`;
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
    if (
      !StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters) &&
      !StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters) &&
      !StringUtilities.containsAny(secondsExpression, ExpressionDescriptor.specialCharacters)
    ) {
      //specific time of day (i.e. 10 14)
      description += this.i18n.atSpace() + this.formatTime(hourExpression, minuteExpression, secondsExpression);
    } else if (
      !secondsExpression &&
      minuteExpression.indexOf("-") > -1 &&
      !(minuteExpression.indexOf(",") > -1) &&
      !(minuteExpression.indexOf("/") > -1) &&
      !StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters)
    ) {
      //minute range in single hour (i.e. 0-10 11)
      let minuteParts: string[] = minuteExpression.split("-");
      description += StringUtilities.format(
        this.i18n.everyMinuteBetweenX0AndX1(),
        this.formatTime(hourExpression, minuteParts[0], ""),
        this.formatTime(hourExpression, minuteParts[1], "")
      );
    } else if (
      !secondsExpression &&
      hourExpression.indexOf(",") > -1 &&
      hourExpression.indexOf("-") == -1 &&
      hourExpression.indexOf("/") == -1 &&
      !StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters)
    ) {
      //hours list with single minute (i.e. 30 6,14,16)
      let hourParts: string[] = hourExpression.split(",");
      description += this.i18n.at();

      for (let i = 0; i < hourParts.length; i++) {
        description += " ";
        description += this.formatTime(hourParts[i], minuteExpression, "");

        if (i < hourParts.length - 2) {
          description += ",";
        }

        if (i == hourParts.length - 2) {
          description += this.i18n.spaceAnd();
        }
      }
    } else {
      //default time description
      let secondsDescription = this.getSecondsDescription();
      let minutesDescription = this.getMinutesDescription();
      let hoursDescription = this.getHoursDescription();

      description += secondsDescription;

      if (description.length > 0 && minutesDescription.length > 0) {
        description += ", ";
      }

      description += minutesDescription;

      if (description.length > 0 && hoursDescription.length > 0) {
        description += ", ";
      }

      description += hoursDescription;
    }

    return description;
  }

  protected getSecondsDescription() {
    let description: string = this.getSegmentDescription(
      this.expressionParts[0],
      this.i18n.everySecond(),
      s => {
        return s;
      },
      s => {
        return StringUtilities.format(this.i18n.everyX0Seconds(), s);
      },
      s => {
        return this.i18n.secondsX0ThroughX1PastTheMinute();
      },
      s => {
        return s == "0"
          ? ""
          : parseInt(s) < 20
          ? this.i18n.atX0SecondsPastTheMinute()
          : this.i18n.atX0SecondsPastTheMinuteGt20() || this.i18n.atX0SecondsPastTheMinute();
      }
    );

    return description;
  }

  protected getMinutesDescription() {
    const secondsExpression = this.expressionParts[0];
    const hourExpression = this.expressionParts[2];
    let description: string = this.getSegmentDescription(
      this.expressionParts[1],
      this.i18n.everyMinute(),
      s => {
        return s;
      },
      s => {
        return StringUtilities.format(this.i18n.everyX0Minutes(), s);
      },
      s => {
        return this.i18n.minutesX0ThroughX1PastTheHour();
      },
      s => {
        try {
          return s == "0" && hourExpression.indexOf("/") == -1 && secondsExpression == ""
            ? this.i18n.everyHour()
            : parseInt(s) < 20
            ? this.i18n.atX0MinutesPastTheHour()
            : this.i18n.atX0MinutesPastTheHourGt20() || this.i18n.atX0MinutesPastTheHour();
        } catch (e) {
          return this.i18n.atX0MinutesPastTheHour();
        }
      }
    );

    return description;
  }

  protected getHoursDescription() {
    let expression = this.expressionParts[2];
    let description: string = this.getSegmentDescription(
      expression,
      this.i18n.everyHour(),
      s => {
        return this.formatTime(s, "0", "");
      },
      s => {
        return StringUtilities.format(this.i18n.everyX0Hours(), s);
      },
      s => {
        return this.i18n.betweenX0AndX1();
      },
      s => {
        return this.i18n.atX0();
      }
    );

    return description;
  }

  protected getDayOfWeekDescription() {
    var daysOfWeekNames = this.i18n.daysOfTheWeek();

    let description: string = null;
    if (this.expressionParts[5] == "*") {
      // DOW is specified as * so we will not generate a description and defer to DOM part.
      // Otherwise, we could get a contradiction like "on day 1 of the month, every day"
      // or a dupe description like "every day, every day".
      description = "";
    } else {
      description = this.getSegmentDescription(
        this.expressionParts[5],
        this.i18n.commaEveryDay(),
        s => {
          let exp: string = s;
          if (s.indexOf("#") > -1) {
            exp = s.substr(0, s.indexOf("#"));
          } else if (s.indexOf("L") > -1) {
            exp = exp.replace("L", "");
          }

          return daysOfWeekNames[parseInt(exp)];
        },
        s => {
          if (parseInt(s) == 1) {
            // rather than "every 1 days" just return empty string
            return "";
          } else {
            return StringUtilities.format(this.i18n.commaEveryX0DaysOfTheWeek(), s);
          }
        },
        s => {
          return this.i18n.commaX0ThroughX1();
        },
        s => {
          let format: string = null;
          if (s.indexOf("#") > -1) {
            let dayOfWeekOfMonthNumber: string = s.substring(s.indexOf("#") + 1);
            let dayOfWeekOfMonthDescription: string = null;
            switch (dayOfWeekOfMonthNumber) {
              case "1":
                dayOfWeekOfMonthDescription = this.i18n.first();
                break;
              case "2":
                dayOfWeekOfMonthDescription = this.i18n.second();
                break;
              case "3":
                dayOfWeekOfMonthDescription = this.i18n.third();
                break;
              case "4":
                dayOfWeekOfMonthDescription = this.i18n.fourth();
                break;
              case "5":
                dayOfWeekOfMonthDescription = this.i18n.fifth();
                break;
            }

            format = this.i18n.commaOnThe() + dayOfWeekOfMonthDescription + this.i18n.spaceX0OfTheMonth();
          } else if (s.indexOf("L") > -1) {
            format = this.i18n.commaOnTheLastX0OfTheMonth();
          } else {
            // If both DOM and DOW are specified, the cron will execute at either time.
            const domSpecified = this.expressionParts[3] != "*";
            format = domSpecified ? this.i18n.commaAndOnX0() : this.i18n.commaOnlyOnX0();
          }

          return format;
        }
      );
    }

    return description;
  }

  protected getMonthDescription() {
    var monthNames = this.i18n.monthsOfTheYear();

    let description: string = this.getSegmentDescription(
      this.expressionParts[4],
      "",
      s => {
        return monthNames[parseInt(s) - 1];
      },
      s => {
        //
        if (parseInt(s) == 1) {
          // rather than "every 1 months" just return empty string
          return "";
        } else {
          return StringUtilities.format(this.i18n.commaEveryX0Months(), s);
        }
      },
      s => {
        return this.i18n.commaMonthX0ThroughMonthX1() || this.i18n.commaX0ThroughX1();
      },
      s => {
        return this.i18n.commaOnlyInMonthX0 ? this.i18n.commaOnlyInMonthX0() : this.i18n.commaOnlyInX0();
      }
    );

    return description;
  }

  protected getDayOfMonthDescription(): string {
    let description: string = null;
    let expression: string = this.expressionParts[3];

    switch (expression) {
      case "L":
        description = this.i18n.commaOnTheLastDayOfTheMonth();
        break;
      case "WL":
      case "LW":
        description = this.i18n.commaOnTheLastWeekdayOfTheMonth();
        break;
      default:
        let weekDayNumberMatches = expression.match(/(\d{1,2}W)|(W\d{1,2})/); // i.e. 3W or W2
        if (weekDayNumberMatches) {
          let dayNumber: number = parseInt(weekDayNumberMatches[0].replace("W", ""));
          let dayString: string =
            dayNumber == 1
              ? this.i18n.firstWeekday()
              : StringUtilities.format(this.i18n.weekdayNearestDayX0(), dayNumber.toString());
          description = StringUtilities.format(this.i18n.commaOnTheX0OfTheMonth(), dayString);

          break;
        } else {
          // Handle "last day offset" (i.e. L-5:  "5 days before the last day of the month")
          let lastDayOffSetMatches = expression.match(/L-(\d{1,2})/);
          if (lastDayOffSetMatches) {
            let offSetDays = lastDayOffSetMatches[1];
            description = StringUtilities.format(this.i18n.commaDaysBeforeTheLastDayOfTheMonth(), offSetDays);
            break;
          } else if (expression == "*" && this.expressionParts[5] != "*"){
            // * dayOfMonth and dayOfWeek specified so use dayOfWeek verbiage instead
            return "";
          } else {
            description = this.getSegmentDescription(
              expression,
              this.i18n.commaEveryDay(),
              s => {
                return s == "L" ? this.i18n.lastDay() : (
                  (this.i18n.dayX0) ? StringUtilities.format(this.i18n.dayX0(), s) : s
                );
              },
              s => {
                return s == "1" ? this.i18n.commaEveryDay() : this.i18n.commaEveryX0Days();
              },
              s => {
                return this.i18n.commaBetweenDayX0AndX1OfTheMonth();
              },
              s => {
                return this.i18n.commaOnDayX0OfTheMonth();
              }
            );
          }
          break;
        }
    }

    return description;
  }

  protected getYearDescription() {
    let description: string = this.getSegmentDescription(
      this.expressionParts[6],
      "",
      s => {
        return /^\d+$/.test(s) ? new Date(parseInt(s), 1).getFullYear().toString() : s;
      },
      s => {
        return StringUtilities.format(this.i18n.commaEveryX0Years(), s);
      },
      s => {
        return this.i18n.commaYearX0ThroughYearX1() || this.i18n.commaX0ThroughX1();
      },
      s => {
        return this.i18n.commaOnlyInYearX0 ? this.i18n.commaOnlyInYearX0() : this.i18n.commaOnlyInX0();
      }
    );

    return description;
  }

  protected getSegmentDescription(
    expression: string,
    allDescription: string,
    getSingleItemDescription: (t: string) => string,
    getIntervalDescriptionFormat: (t: string) => string,
    getBetweenDescriptionFormat: (t: string) => string,
    getDescriptionFormat: (t: string) => string
  ): string {
    let description: string = null;

    if (!expression) {
      description = "";
    } else if (expression === "*") {
      description = allDescription;
    } else if (!StringUtilities.containsAny(expression, ["/", "-", ","])) {
      description = StringUtilities.format(getDescriptionFormat(expression), getSingleItemDescription(expression));
    } else if (expression.indexOf("/") > -1) {
      let segments: string[] = expression.split("/");
      description = StringUtilities.format(
        getIntervalDescriptionFormat(segments[1]),
        segments[1] // getSingleItemDescription(segments[1])
      );

      //interval contains 'between' piece (i.e. 2-59/3 )
      if (segments[0].indexOf("-") > -1) {
        let betweenSegmentDescription: string = this.generateBetweenSegmentDescription(
          segments[0],
          getBetweenDescriptionFormat,
          getSingleItemDescription
        );

        if (betweenSegmentDescription.indexOf(", ") != 0) {
          description += ", ";
        }

        description += betweenSegmentDescription;
      } else if (!StringUtilities.containsAny(segments[0], ["*", ","])) {
        let rangeItemDescription: string = StringUtilities.format(
          getDescriptionFormat(segments[0]),
          getSingleItemDescription(segments[0])
        );
        //remove any leading comma
        rangeItemDescription = rangeItemDescription.replace(", ", "");

        description += StringUtilities.format(this.i18n.commaStartingX0(), rangeItemDescription);
      }
    } else if (expression.indexOf(",") > -1) {
      let segments: string[] = expression.split(",");

      let descriptionContent: string = "";
      for (let i = 0; i < segments.length; i++) {
        if (i > 0 && segments.length > 2) {
          descriptionContent += ",";

          if (i < segments.length - 1) {
            descriptionContent += " ";
          }
        }

        if (i > 0 && segments.length > 1 && (i == segments.length - 1 || segments.length == 2)) {
          descriptionContent += `${this.i18n.spaceAnd()} `;
        }

        if (segments[i].indexOf("-") > -1) {
          let betweenSegmentDescription: string = this.generateBetweenSegmentDescription(
            segments[i],
            s => {
              return this.i18n.commaX0ThroughX1();
            },
            getSingleItemDescription
          );

          //remove any leading comma
          betweenSegmentDescription = betweenSegmentDescription.replace(", ", "");

          descriptionContent += betweenSegmentDescription;
        } else {
          descriptionContent += getSingleItemDescription(segments[i]);
        }
      }

      description = StringUtilities.format(getDescriptionFormat(expression), descriptionContent);
    } else if (expression.indexOf("-") > -1) {
      description = this.generateBetweenSegmentDescription(
        expression,
        getBetweenDescriptionFormat,
        getSingleItemDescription
      );
    }

    return description;
  }

  protected generateBetweenSegmentDescription(
    betweenExpression: string,
    getBetweenDescriptionFormat: (t: string) => string,
    getSingleItemDescription: (t: string) => string
  ): string {
    let description: string = "";
    let betweenSegments: string[] = betweenExpression.split("-");
    let betweenSegment1Description: string = getSingleItemDescription(betweenSegments[0]);
    let betweenSegment2Description: string = getSingleItemDescription(betweenSegments[1]);
    betweenSegment2Description = betweenSegment2Description.replace(":00", ":59");
    let betweenDescriptionFormat = getBetweenDescriptionFormat(betweenExpression);
    description += StringUtilities.format(
      betweenDescriptionFormat,
      betweenSegment1Description,
      betweenSegment2Description
    );

    return description;
  }

  protected formatTime(hourExpression: string, minuteExpression: string, secondExpression: string) {
    let hour: number = parseInt(hourExpression);
    let period: string = "";
    let setPeriodBeforeTime: boolean = false;
    if (!this.options.use24HourTimeFormat) {
      setPeriodBeforeTime = this.i18n.setPeriodBeforeTime && this.i18n.setPeriodBeforeTime();
      period = setPeriodBeforeTime ? `${this.getPeriod(hour)} ` : ` ${this.getPeriod(hour)}`;
      if (hour > 12) {
        hour -= 12;
      }
      if (hour === 0) {
        hour = 12;
      }
    }

    const minute = minuteExpression;
    let second: string = "";
    if (secondExpression) {
      second = `:${("00" + secondExpression).substring(secondExpression.length)}`;
    }

    return `${setPeriodBeforeTime ? period : ""}${("00" + hour.toString()).substring(hour.toString().length)}:${("00" + minute.toString()).substring(
      minute.toString().length
    )}${second}${!setPeriodBeforeTime ? period : ""}`;
  }

  protected transformVerbosity(description: string, useVerboseFormat: boolean) {
    if (!useVerboseFormat) {
      description = description.replace(new RegExp(`, ${this.i18n.everyMinute()}`, "g"), "");
      description = description.replace(new RegExp(`, ${this.i18n.everyHour()}`, "g"), "");
      description = description.replace(new RegExp(this.i18n.commaEveryDay(), "g"), "");
      description = description.replace(/\, ?$/, "");
    }
    return description;
  }

  private getPeriod(hour: number): string {
    return hour >= 12 ? this.i18n.pm && this.i18n.pm() || "PM" : this.i18n.am && this.i18n.am() || "AM";
  }
}
