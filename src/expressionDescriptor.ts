import { StringUtilities } from "./stringUtilities";
import { CronParser } from "./cronParser";
import { Options } from "./options";

import { Locale } from "./i18n/locale";
import { LocaleLoader } from "./i18n/localeLoader";
import { en } from "./i18n/locales/en";

const english = new en();

interface SegmentDescribers {
  all: string;
  single: (t: string, form?: number) => string;
  increment: (t: string) => string;
  range: (t: string) => string;
  format: (t: string) => string;
  bounds?: { min: number; max: number };
}

export class ExpressionDescriptor {
  static locales: { [name: string]: Locale } = {};
  static defaultLocale: string;
  static specialCharacters: string[];
  private static readonly ordinals = ["first", "second", "third", "fourth", "fifth"] as const;

  expression: string;
  expressionParts: string[];
  options: Options;
  i18n: Locale;

  /**
   * Converts a cron expression into a description a human can read
   * @param {string} expression - The cron expression
   * @param {Options} [options] - See the README for each option and its default
   * @returns {string}
   */
  static toString(
    expression: string,
    {
      throwExceptionOnParseError = true,
      verbose = false,
      dayOfWeekStartIndexZero = true,
      monthStartIndexZero = false,
      use24HourTimeFormat,
      trimHoursLeadingZero = false,
      locale = null,
      logicalAndDayFields = false,
    }: Options = {},
  ): string {
    const options: Options = {
      throwExceptionOnParseError: throwExceptionOnParseError,
      verbose: verbose,
      dayOfWeekStartIndexZero: dayOfWeekStartIndexZero,
      monthStartIndexZero: monthStartIndexZero,
      use24HourTimeFormat: use24HourTimeFormat,
      trimHoursLeadingZero: trimHoursLeadingZero,
      locale: locale,
      logicalAndDayFields: logicalAndDayFields,
    };

    return new ExpressionDescriptor(expression, options).getFullDescription();
  }

  static initialize(localesLoader: LocaleLoader, defaultLocale = "en") {
    ExpressionDescriptor.specialCharacters = ["/", "-", ",", "*"];
    ExpressionDescriptor.defaultLocale = defaultLocale;

    // Load locales
    localesLoader.load(ExpressionDescriptor.locales);
  }

  constructor(expression: string, options: Options) {
    this.expression = expression;
    this.options = options;
    this.expressionParts = [];

    if (!this.options.locale && ExpressionDescriptor.defaultLocale) {
      this.options.locale = ExpressionDescriptor.defaultLocale;
    }

    if (!ExpressionDescriptor.locales[this.options!.locale!]) {
      const fallBackLocale = Object.keys(ExpressionDescriptor.locales)[0];
      // fall back to English
      console.warn(`Locale '${this.options.locale}' could not be found; falling back to '${fallBackLocale}'.`);

      this.options.locale = fallBackLocale;
    }

    this.i18n = ExpressionDescriptor.locales[this.options!.locale!];

    if (options.use24HourTimeFormat === undefined) {
      // if use24HourTimeFormat not specified, set based on locale default
      options.use24HourTimeFormat = this.i18n.use24HourTimeFormatByDefault();
    }
  }

  protected getFullDescription() {
    let description = "";

    try {
      let parser = new CronParser(
        this.expression,
        this.options.dayOfWeekStartIndexZero,
        this.options.monthStartIndexZero,
      );
      this.expressionParts = parser.parse();

      // Special handling for @reboot
      if (this.expressionParts[0] === "@reboot") {
        return this.i18n.atReboot?.() || english.atReboot();
      }

      const timeSegment = this.getTimeOfDayDescription();
      const dayOfMonthDesc = this.getDayOfMonthDescription();
      const monthDesc = this.getMonthDescription();
      const dayOfWeekDesc = this.getDayOfWeekDescription();
      const yearDesc = this.getYearDescription();

      description += timeSegment + dayOfMonthDesc + dayOfWeekDesc + monthDesc + yearDesc;
      description = this.transformVerbosity(description, !!this.options.verbose);

      // uppercase first character
      description = description.charAt(0).toLocaleUpperCase() + description.substring(1);
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

    // handle special cases first
    if (
      !StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters) &&
      !StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters) &&
      !StringUtilities.containsAny(secondsExpression, ExpressionDescriptor.specialCharacters)
    ) {
      // specific time of day (i.e. 10 14)
      description += this.i18n.atSpace() + this.formatTime(hourExpression, minuteExpression, secondsExpression);
    } else if (
      !secondsExpression &&
      minuteExpression.indexOf("-") > -1 &&
      !(minuteExpression.indexOf(",") > -1) &&
      !(minuteExpression.indexOf("/") > -1) &&
      !StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters)
    ) {
      // minute range in single hour (i.e. 0-10 11)
      let minuteParts: string[] = minuteExpression.split("-");
      description += StringUtilities.format(
        this.i18n.everyMinuteBetweenX0AndX1(),
        this.formatTime(hourExpression, minuteParts[0], ""),
        this.formatTime(hourExpression, minuteParts[1], ""),
      );
    } else if (
      !secondsExpression &&
      hourExpression.indexOf(",") > -1 &&
      hourExpression.indexOf("-") == -1 &&
      hourExpression.indexOf("/") == -1 &&
      !StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters)
    ) {
      // hours list with single minute (i.e. 30 6,14,16)
      let hourParts: string[] = hourExpression.split(",");
      description += this.i18n.at();

      for (let i = 0; i < hourParts.length; i++) {
        if (description) {
          description += " ";
        }
        description += this.formatTime(hourParts[i], minuteExpression, "");

        if (i < hourParts.length - 2) {
          description += ",";
        }

        if (i == hourParts.length - 2) {
          description += this.i18n.spaceAnd();
        }
      }
    } else {
      // default time description
      let secondsDescription = this.getSecondsDescription();
      let minutesDescription = this.getMinutesDescription();
      let hoursDescription = this.getHoursDescription();

      description += secondsDescription;

      if (description && minutesDescription) {
        description += ", ";
      }

      description += minutesDescription;

      if (minutesDescription === hoursDescription) {
        return description;
      }

      if (description && hoursDescription) {
        description += ", ";
      }

      description += hoursDescription;
    }

    return description;
  }

  protected getSecondsDescription() {
    return this.getSegmentDescription(this.expressionParts[0], {
      all: this.i18n.everySecond(),
      single: (s) => s,
      increment: (s) => StringUtilities.format(this.i18n.everyX0Seconds(s), s),
      range: () => this.i18n.secondsX0ThroughX1PastTheMinute(),
      format: (s) =>
        s == "0"
          ? ""
          : parseInt(s) < 20
            ? this.i18n.atX0SecondsPastTheMinute(s)
            : this.i18n.atX0SecondsPastTheMinuteGt20?.() || this.i18n.atX0SecondsPastTheMinute(s),
      bounds: { min: 0, max: 59 },
    });
  }

  protected getMinutesDescription() {
    const secondsExpression = this.expressionParts[0];
    const hourExpression = this.expressionParts[2];
    return this.getSegmentDescription(this.expressionParts[1], {
      all: this.i18n.everyMinute(),
      single: (s) => s,
      increment: (s) => StringUtilities.format(this.i18n.everyX0Minutes(s), s),
      range: () => this.i18n.minutesX0ThroughX1PastTheHour(),
      format: (s) =>
        s == "0" && hourExpression.indexOf("/") == -1 && secondsExpression == ""
          ? this.i18n.everyHour()
          : s == "0"
            ? this.i18n.onTheHour?.() || this.i18n.atX0MinutesPastTheHour(s)
            : parseInt(s) < 20
              ? this.i18n.atX0MinutesPastTheHour(s)
              : this.i18n.atX0MinutesPastTheHourGt20?.() || this.i18n.atX0MinutesPastTheHour(s),
      bounds: { min: 0, max: 59 },
    });
  }

  protected getHoursDescription() {
    let expression = this.expressionParts[2];

    // Collect the end values of hour ranges (e.g., "7-19" -> "19") to determine if ":59" should be used instead of ":00" for the last minute of the range.
    let hourIndex = 0;
    const rangeEndValues: { value: string; index: number }[] = [];
    expression
      .split("/")[0] // Ignore step values (e.g., "7-19/2" -> "7-19")
      .split(",") // Split multiple ranges or values (e.g., "7-19,20" -> ["7-19", "20"])
      .forEach((range) => {
        const rangeParts = range.split("-"); // Split ranges into start and end (e.g., "7-19" -> ["7", "19"])
        if (rangeParts.length === 2) {
          rangeEndValues.push({ value: rangeParts[1], index: hourIndex + 1 });
        }
        hourIndex += rangeParts.length;
      });

    let evaluationIndex = 0;
    return this.getSegmentDescription(expression, {
      all: this.i18n.everyHour(),
      single: (s) => {
        const match = rangeEndValues.find((r) => r.value === s && r.index === evaluationIndex);
        const isRangeEndWithNonZeroMinute = match && this.expressionParts[1] !== "0";

        evaluationIndex++;

        return isRangeEndWithNonZeroMinute ? this.formatTime(s, "59", "") : this.formatTime(s, "0", "");
      },
      increment: (s) => StringUtilities.format(this.i18n.everyX0Hours(s), s),
      range: () => this.i18n.betweenX0AndX1(),
      format: () => this.i18n.atX0(),
      bounds: { min: 0, max: 23 },
    });
  }

  protected getDayOfWeekDescription(dayOfWeekExpression: string = this.expressionParts[5]): string | null {
    const daysOfWeekNames = this.i18n.daysOfTheWeek();

    let description: string | null = null;
    if (dayOfWeekExpression == "*") {
      // DOW is specified as * so we will not generate a description and defer to DOM part.
      // Otherwise, we could get a contradiction like "on day 1 of the month, every day"
      // or a dupe description like "every day, every day".
      description = "";
    } else {
      const dayOfWeekItems = dayOfWeekExpression.split(",");
      const describeSeparately = (items: string[], otherItems: string[]) =>
        (this.getDayOfWeekDescription(items.join(",")) ?? "") +
        `${this.i18n.spaceAnd()} ` +
        ExpressionDescriptor.removeLeadingComma(this.getDayOfWeekDescription(otherItems.join(",")) ?? "");

      // "1,3#2" runs every Monday but only on the second Wednesday, so describe the two parts separately
      const nthOrLastItems = dayOfWeekItems.filter((s) => /[#L]/.test(s));
      const plainItems = dayOfWeekItems.filter((s) => !/[#L]/.test(s));
      if (plainItems.length > 0 && nthOrLastItems.some((s) => s.indexOf("#") > -1)) {
        return describeSeparately(plainItems, nthOrLastItems);
      }

      // "1,5L" runs every Monday but only on the last Friday
      const lastItems = dayOfWeekItems.filter((s) => s.indexOf("L") > -1);
      const otherItems = dayOfWeekItems.filter((s) => s.indexOf("L") === -1);
      if (lastItems.length > 0 && otherItems.length > 0) {
        return describeSeparately(otherItems, lastItems);
      }

      // If both DOM and DOW are specified, the cron will execute at either time, so the whole
      // day of week clause starts with "and". A step range like 1-5/2 is one clause: the
      // "and" goes before the step, and the range only bounds it.
      const startsWithAnd =
        this.expressionParts[3] != "*" && !this.options.logicalAndDayFields && dayOfWeekExpression.indexOf(",") == -1;
      const stepSegments = dayOfWeekExpression.split("/");
      const hasStep = stepSegments.length > 1 && parseInt(stepSegments[1]) != 1;
      const andPrefix = this.getAndPrefix();

      description = this.getSegmentDescription(dayOfWeekExpression, {
        all: this.i18n.commaEveryDay(),
        single: (s, form) => {
          let exp: string = s;
          if (s.indexOf("#") > -1) {
            exp = s.substring(0, s.indexOf("#"));
          } else if (s.indexOf("L") > -1) {
            exp = exp.replace("L", "");
          }

          let parsedExp = parseInt(exp);
          let description = this.i18n.daysOfTheWeekInCase
            ? this.i18n.daysOfTheWeekInCase(form)[parsedExp]
            : daysOfWeekNames[parsedExp];

          if (s.indexOf("#") > -1) {
            const dayOfWeekOfMonthNumber = parseInt(s.substring(s.indexOf("#") + 1));
            const dayOfWeekNumber = s.substring(0, s.indexOf("#"));
            const ordinal = ExpressionDescriptor.ordinals[dayOfWeekOfMonthNumber - 1];
            description = this.i18n[ordinal](dayOfWeekNumber) + " " + description;
          }

          return description;
        },
        increment: (s) => {
          // rather than "every 1 days" just return empty string
          if (parseInt(s) == 1) {
            return "";
          }
          const format = this.i18n.commaEveryX0DaysOfTheWeek(s);
          return StringUtilities.format(
            startsWithAnd && andPrefix ? andPrefix + ExpressionDescriptor.removeLeadingComma(format) : format,
            s,
          );
        },
        range: (s) => {
          const beginFrom = s.substring(0, s.indexOf("-"));

          return startsWithAnd && (!hasStep || !andPrefix)
            ? this.i18n.commaAndX0ThroughX1(beginFrom)
            : this.i18n.commaX0ThroughX1(beginFrom);
        },
        format: (s) => {
          let format: string | null = null;
          if (s.indexOf("#") > -1) {
            let dayOfWeekOfMonthNumber: string = s.substring(s.indexOf("#") + 1);
            let dayOfWeek = s.substring(0, s.indexOf("#"));
            format = this.i18n.commaOnThe(dayOfWeekOfMonthNumber, dayOfWeek).trim() + this.i18n.spaceX0OfTheMonth();
          } else if (s.indexOf("L") > -1) {
            format = this.i18n.commaOnTheLastX0OfTheMonth(s.split(",")[0].replace("L", ""));
          } else {
            // If both DOM and DOW are specified, the cron executes depending on the cron format.
            // For the standard crontab format, the cron will execute at either time. For some
            // custom formats, the cron will execute when both times are satisfied.
            const domSpecified = this.expressionParts[3] != "*";
            if (!domSpecified) {
              format = this.i18n.commaOnlyOnX0(s);
            } else if (this.options.logicalAndDayFields) {
              format = this.i18n.commaOnlyOnX0(s);
            } else {
              format = this.i18n.commaAndOnX0();
            }
          }

          return format;
        },
      });

      // A list with a step has no outer format to carry that "and", and its first item only has one when it is a
      // single day ("5,*\/2" gives "and on Friday"). Give a first range or step the "and" it gets on its own.
      const firstItem = dayOfWeekItems[0];
      const isListWithStep = dayOfWeekItems.length > 1 && dayOfWeekExpression.indexOf("/") > -1;
      const firstStep = firstItem.split("/")[1];
      if (
        isListWithStep &&
        andPrefix &&
        description &&
        this.expressionParts[3] != "*" &&
        !this.options.logicalAndDayFields &&
        (firstStep === undefined ? firstItem.indexOf("-") > -1 : parseInt(firstStep) != 1)
      ) {
        description = andPrefix + ExpressionDescriptor.removeLeadingComma(description);
      }
    }

    return description;
  }

  protected getMonthDescription() {
    const monthNames = this.i18n.monthsOfTheYear();

    return this.getSegmentDescription(this.expressionParts[4], {
      all: "",
      single: (s, form) =>
        form && this.i18n.monthsOfTheYearInCase
          ? this.i18n.monthsOfTheYearInCase(form)[parseInt(s) - 1]
          : monthNames[parseInt(s) - 1],
      increment: (s) =>
        // rather than "every 1 months" just return empty string
        parseInt(s) == 1 ? "" : StringUtilities.format(this.i18n.commaEveryX0Months(s), s),
      range: () => this.i18n.commaMonthX0ThroughMonthX1?.() || this.i18n.commaX0ThroughX1(),
      format: () => (this.i18n.commaOnlyInMonthX0 ? this.i18n.commaOnlyInMonthX0() : this.i18n.commaOnlyInX0()),
    });
  }

  // The conjunction a locale puts before a range, such as ", und " from ", und %s bis %s"
  private getAndPrefix(): string | null {
    const plain = this.i18n.commaX0ThroughX1();
    const withAnd = this.i18n.commaAndX0ThroughX1();
    const body = ExpressionDescriptor.removeLeadingComma(plain);
    if (withAnd == plain || withAnd.length <= body.length || withAnd.slice(-body.length) != body) {
      return null;
    }
    return withAnd.slice(0, -body.length);
  }

  // Removes the comma (and one space) a "comma..." description starts with. Locales use their own comma ("، " in ar,
  // "、" in ja, "，" in zh).
  private static removeLeadingComma(description: string): string {
    return description.replace(/^[,،，、] ?/, "");
  }

  private static hasLeadingComma(description: string): boolean {
    return /^[,،，、]/.test(description);
  }

  protected getDayOfMonthDescription(dayOfMonthExpression: string = this.expressionParts[3]): string | null {
    let description: string | null = null;
    let expression: string = dayOfMonthExpression;

    const dayOfMonthItems = expression.split(",");
    if (dayOfMonthItems.length > 1) {
      const isLastDayOffset = (s: string) => /^L-\d{1,2}$/.test(s);
      const lastDayOffsetItems = dayOfMonthItems.filter((s) => isLastDayOffset(s));
      // "L,15" would read "on day the last day and 15", so put the items with L after the numbered days
      const otherItems = dayOfMonthItems
        .filter((s) => !isLastDayOffset(s))
        .sort((a, b) => Number(a.indexOf("L") > -1) - Number(b.indexOf("L") > -1));

      if (lastDayOffsetItems.length > 0) {
        // "1,L-3" runs on day 1 and 3 days before the last day, so describe each L-n item on its own
        const parts = (otherItems.length > 0 ? [otherItems.join(",")] : []).concat(lastDayOffsetItems);
        return (
          parts
            .map((part) => this.getDayOfMonthDescription(part) ?? "")
            // "*" describes to "" (the day-of-week part says when), so it must not get an "and"
            .filter((partDescription) => partDescription !== "")
            .map((partDescription, i) => {
              if (i === 0) {
                return partDescription;
              }
              return `${this.i18n.spaceAnd()} ` + ExpressionDescriptor.removeLeadingComma(partDescription);
            })
            .join("")
        );
      }

      expression = otherItems.join(",");
    }

    switch (expression) {
      case "L":
        description = this.i18n.commaOnTheLastDayOfTheMonth();
        break;
      case "WL":
      case "LW":
        description = this.i18n.commaOnTheLastWeekdayOfTheMonth();
        break;
      default:
        // i.e. 3W, W2, 15W-2 or 15W+2
        let weekDayNumberMatches = expression.match(/^(?:(\d{1,2})W|W(\d{1,2}))(?:([+-])(\d{1,2}))?$/);
        if (weekDayNumberMatches) {
          let dayNumber: number = parseInt(weekDayNumberMatches[1] || weekDayNumberMatches[2]);
          let dayString: string =
            dayNumber == 1
              ? this.i18n.firstWeekday()
              : StringUtilities.format(this.i18n.weekdayNearestDayX0(), dayNumber.toString());
          let offsetDays: string | undefined = weekDayNumberMatches[4];
          if (!offsetDays) {
            description = StringUtilities.format(this.i18n.commaOnTheX0OfTheMonth(), dayString);
          } else if (weekDayNumberMatches[3] == "-") {
            description = StringUtilities.format(
              this.i18n.commaDaysBeforeTheX0OfTheMonth?.(offsetDays) ||
                english.commaDaysBeforeTheX0OfTheMonth(offsetDays),
              offsetDays,
              dayString,
            );
          } else {
            description = StringUtilities.format(
              this.i18n.commaDaysAfterTheX0OfTheMonth?.(offsetDays) ||
                english.commaDaysAfterTheX0OfTheMonth(offsetDays),
              offsetDays,
              dayString,
            );
          }

          break;
        } else {
          // Handle "last day offset" (i.e. L-5:  "5 days before the last day of the month")
          let lastDayOffSetMatches = expression.match(/L-(\d{1,2})/);
          if (lastDayOffSetMatches) {
            let offSetDays = lastDayOffSetMatches[1];
            description = StringUtilities.format(this.i18n.commaDaysBeforeTheLastDayOfTheMonth(offSetDays), offSetDays);
            break;
          } else if (expression == "*" && this.expressionParts[5] != "*") {
            // * dayOfMonth and dayOfWeek specified so use dayOfWeek verbiage instead
            return "";
          } else {
            description = this.getSegmentDescription(expression, {
              all: this.i18n.commaEveryDay(),
              single: (s) =>
                s == "L" ? this.i18n.lastDay() : this.i18n.dayX0 ? StringUtilities.format(this.i18n.dayX0(), s) : s,
              increment: (s) => (s == "1" ? this.i18n.commaEveryDay() : this.i18n.commaEveryX0Days(s)),
              range: (s) => this.i18n.commaBetweenDayX0AndX1OfTheMonth(s),
              // a lone L item of a list with a step ("1-5/2,L") has no day number to put in "on day %s"
              format: (s) => (s == "L" ? this.i18n.commaOnTheLastDayOfTheMonth() : this.i18n.commaOnDayX0OfTheMonth(s)),
            });
          }
          break;
        }
    }

    return description;
  }

  protected getYearDescription() {
    return this.getSegmentDescription(this.expressionParts[6], {
      all: "",
      single: (s) => (/^\d+$/.test(s) ? new Date(parseInt(s), 1).getFullYear().toString() : s),
      increment: (s) => StringUtilities.format(this.i18n.commaEveryX0Years(s), s),
      range: () => this.i18n.commaYearX0ThroughYearX1?.() || this.i18n.commaX0ThroughX1(),
      format: () => (this.i18n.commaOnlyInYearX0 ? this.i18n.commaOnlyInYearX0() : this.i18n.commaOnlyInX0()),
    });
  }

  protected getSegmentDescription(expression: string, describers: SegmentDescribers): string | null {
    // list items and steps of list items describe their own values, so only the whole field gets bounds
    const itemDescribers: SegmentDescribers = { ...describers, bounds: undefined };
    let description: string | null = null;
    const doesExpressionContainIncrement = expression.indexOf("/") > -1;
    const doesExpressionContainRange = expression.indexOf("-") > -1;
    const doesExpressionContainMultipleValues = expression.indexOf(",") > -1;

    if (!expression) {
      // Empty
      description = "";
    } else if (expression === "*") {
      // * (All)
      description = describers.all;
    } else if (!doesExpressionContainIncrement && !doesExpressionContainRange && !doesExpressionContainMultipleValues) {
      // Simple
      description = StringUtilities.format(describers.format(expression), describers.single(expression));
    } else if (doesExpressionContainMultipleValues) {
      // Multiple Values

      let segments: string[] = expression.split(",");
      let descriptionContent: string = "";
      const conjunction = this.i18n.spaceAnd();
      for (let i = 0; i < segments.length; i++) {
        if (i > 0 && segments.length > 2) {
          descriptionContent += ",";

          if (i < segments.length - 1) {
            descriptionContent += " ";
          }
        }

        if (i > 0 && segments.length > 1 && (i == segments.length - 1 || segments.length == 2)) {
          descriptionContent += conjunction == "," && segments.length > 2 ? " " : `${conjunction} `;
        }

        if (segments[i].indexOf("/") > -1 || segments[i].indexOf("-") > -1) {
          // Multiple Values with Increment or Range

          // Without a step in the list, the whole field is formatted below, so a range only gives its values.
          // With a step there is no outer format, so a range describes itself like the other items.
          const isBareRange =
            !doesExpressionContainIncrement && segments[i].indexOf("-") > -1 && segments[i].indexOf("/") == -1;

          let currentDescriptionContent = this.getSegmentDescription(
            segments[i],
            isBareRange ? { ...itemDescribers, range: this.i18n.commaX0ThroughX1 } : itemDescribers,
          );

          if (isBareRange || i > 0) {
            // Strip leading comma since we manage separators in this loop
            currentDescriptionContent = ExpressionDescriptor.removeLeadingComma(currentDescriptionContent!);
          }

          descriptionContent += currentDescriptionContent;
        } else if (!doesExpressionContainIncrement) {
          descriptionContent += describers.single(segments[i]);
        } else {
          let segmentDescription = this.getSegmentDescription(segments[i], itemDescribers);
          // Strip leading comma since we manage separators in this loop
          if (i > 0 && segmentDescription) {
            segmentDescription = ExpressionDescriptor.removeLeadingComma(segmentDescription);
          }
          descriptionContent += segmentDescription;
        }
      }

      if (!doesExpressionContainIncrement) {
        description = StringUtilities.format(describers.format(expression), descriptionContent);
      } else {
        description = descriptionContent;
      }
    } else if (doesExpressionContainIncrement) {
      // Increment

      let segments: string[] = expression.split("/");
      description = StringUtilities.format(describers.increment(segments[1]), segments[1]);

      if (segments[0].indexOf("-") > -1) {
        // Range with Increment (ex: 2-59/3 )

        let rangeSegmentDescription: string = this.generateRangeSegmentDescription(segments[0], describers);

        if (!ExpressionDescriptor.hasLeadingComma(rangeSegmentDescription)) {
          description += ", ";
        }

        description += rangeSegmentDescription;
      } else if (segments[0].indexOf("*") == -1) {
        let rangeItemDescription: string = StringUtilities.format(
          describers.format(segments[0]),
          describers.single(segments[0]),
        );

        // remove any leading comma
        rangeItemDescription = ExpressionDescriptor.removeLeadingComma(rangeItemDescription);

        description += StringUtilities.format(this.i18n.commaStartingX0(), rangeItemDescription);
      }

      description += this.getWrappingIncrementDescription(expression, describers);
    } else if (doesExpressionContainRange) {
      // Range

      description = this.generateRangeSegmentDescription(expression, describers);
    }

    return description;
  }

  /**
   * A step which doesn't divide the field evenly (e.g. minute "*\/50") matches the values 0 and 50,
   * so the gaps alternate between 50 and 10 minutes instead of being a constant interval.
   * In verbose mode, spell out the matched values after the increment description by reusing
   * the description of the equivalent list expression ("0,50").
   */
  protected getWrappingIncrementDescription(expression: string, describers: SegmentDescribers): string {
    const range = describers.bounds;
    if (!this.options.verbose || !range) {
      return "";
    }

    const [start, stepValue] = expression.split("/");
    const step = parseInt(stepValue);
    const length = range.max - range.min + 1;

    // Only a step over the whole field wraps around: a range with a step ("2-30/7") already
    // states its bounds, and an evenly dividing step ("*\/15") really is a constant interval.
    const coversWholeField = start === "*";
    const isUsableStep = Number.isInteger(step) && step > 1;
    const dividesEvenly = isUsableStep && length % step === 0;

    if (!coversWholeField || !isUsableStep || dividesEvenly) {
      return "";
    }

    const values: number[] = [];
    for (let value = range.min; value <= range.max; value += step) {
      values.push(value);
    }

    if (values.length < 2) {
      return "";
    }

    const valuesDescription = this.getSegmentDescription(values.join(","), { ...describers, bounds: undefined });

    return valuesDescription ? `, ${valuesDescription}` : "";
  }

  protected generateRangeSegmentDescription(rangeExpression: string, describers: SegmentDescribers): string {
    const rangeSegments = rangeExpression.split("-");
    return StringUtilities.format(
      describers.range(rangeExpression),
      describers.single(rangeSegments[0], 1),
      describers.single(rangeSegments[1], 2),
    );
  }

  protected formatTime(hourExpression: string, minuteExpression: string, secondExpression: string) {
    let hour = parseInt(hourExpression);
    const minute = parseInt(minuteExpression);

    let period: string = "";
    let setPeriodBeforeTime: boolean = false;
    if (!this.options.use24HourTimeFormat) {
      setPeriodBeforeTime = !!(this.i18n.setPeriodBeforeTime && this.i18n.setPeriodBeforeTime());
      period = setPeriodBeforeTime ? `${this.getPeriod(hour)} ` : ` ${this.getPeriod(hour)}`;
      if (hour > 12) {
        hour -= 12;
      }
      if (hour === 0) {
        hour = 12;
      }
    }

    let second: string = "";
    if (secondExpression) {
      second = `:${("00" + secondExpression).substring(secondExpression.length)}`;
    }

    const hourStr = hour.toString();
    const paddedHour = ("00" + hourStr).substring(hourStr.length);
    const minuteStr = minute.toString();
    const paddedMinute = ("00" + minuteStr).substring(minuteStr.length);
    const displayHour = this.options.trimHoursLeadingZero ? hourStr : paddedHour;

    return `${setPeriodBeforeTime ? period : ""}${displayHour}:${paddedMinute}${second}${
      !setPeriodBeforeTime ? period : ""
    }`;
  }

  protected transformVerbosity(description: string, useVerboseFormat: boolean) {
    if (!useVerboseFormat) {
      description = description.replace(new RegExp(`, ${this.i18n.everyMinute()}(?!\\s*[\\p{L}\\p{N}])`, "gu"), "");
      description = description.replace(new RegExp(`, ${this.i18n.everyHour()}(?!\\s*[\\p{L}\\p{N}])`, "gu"), "");
      description = description.replace(new RegExp(`${this.i18n.commaEveryDay()}(?!\\s*[\\p{L}\\p{N}])`, "gu"), "");
      description = description.replace(/\, ?$/, "");

      if (this.i18n.conciseVerbosityReplacements) {
        for (const [key, value] of Object.entries(this.i18n.conciseVerbosityReplacements())) {
          description = description.replace(new RegExp(key, "g"), value);
        }
      }
    }
    return description;
  }

  private getPeriod(hour: number): string {
    return hour >= 12 ? this.i18n.pm?.() || english.pm() : this.i18n.am?.() || english.am();
  }
}
