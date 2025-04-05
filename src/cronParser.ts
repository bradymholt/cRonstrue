import RangeValidator from "./rangeValidator";

/**
 * Parses and normalizes a cron expression
 * @export
 * @class CronParser
 */
export class CronParser {
  expression: string;
  dayOfWeekStartIndexZero: boolean;
  monthStartIndexZero: boolean;

  constructor(
    expression: string,
    dayOfWeekStartIndexZero: boolean = true,
    monthStartIndexZero: boolean = false
  ) {
    this.expression = expression;
    this.dayOfWeekStartIndexZero = dayOfWeekStartIndexZero;
    this.monthStartIndexZero = monthStartIndexZero;
  }

  /**
   * Parses and normalizes a cron expression into an array of strings
   * @returns {string[]}
   */
  parse(): string[] {
    let parsed: string[];

    var expression = this.expression ?? '';

    if (expression.startsWith('@')) {
      var special = this.parseSpecial(this.expression);
      parsed = this.extractParts(special);

    } else {
      parsed = this.extractParts(this.expression);
    }

    this.normalize(parsed);
    this.validate(parsed);

    return parsed;
  }

  parseSpecial(expression: string): string {
    const specialExpressions: { [key: string]: string } = {
        '@yearly': '0 0 1 1 *',
        '@annually': '0 0 1 1 *',
        '@monthly': '0 0 1 * *',
        '@weekly': '0 0 * * 0',
        '@daily': '0 0 * * *',
        '@midnight': '0 0 * * *',
        '@hourly': '0 * * * *'
    };

    const special = specialExpressions[expression];
    if (!special) {
        throw new Error('Unknown special expression.');
    }

    return special;
  }

  protected extractParts(expression: string) {
    if (!this.expression) {
      throw new Error("cron expression is empty");
    }

    // split on one or more spaces
    let parsed: string[] = expression.trim().split(/[ ]+/);

    // sort elements with array of numbers
    for (let i = 0; i < parsed.length; i++) {
      if (parsed[i].includes(",")) {
        const arrayElement = parsed[i]
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "")
          .map((item) => (!isNaN(Number(item)) ? Number(item) : item))
          .filter((item) => item !== null && item !== "");

        if (arrayElement.length === 0) {
          arrayElement.push("*");
        }

        arrayElement.sort((a, b) => (a !== null && b !== null ? (a as number) - (b as number) : 0));
        parsed[i] = arrayElement.map((item) => (item !== null ? item.toString() : "")).join(",");
      }
    }

    if (parsed.length < 5) {
      throw new Error(
        `Expression has only ${parsed.length} part${parsed.length == 1 ? "" : "s"}. At least 5 parts are required.`
      );
    } else if (parsed.length == 5) {
      // 5 part cron so shift array past seconds element
      parsed.unshift("");
      parsed.push("");
    } else if (parsed.length == 6) {
      /* We will detect if this 6 part expression has a year specified and if so we will shift the parts and treat the
        first part as a minute part rather than a second part.

        Ways we detect:
          1. Last part is a literal year (i.e. 2020)
          2. 3rd or 5th part is specified as "?" (DOM or DOW)
      */
      const isYearWithNoSecondsPart = /\d{4}$/.test(parsed[5]) || parsed[4] == "?" || parsed[2] == "?";

      if (isYearWithNoSecondsPart) {
        // year provided; shift parts over by one
        parsed.unshift("");
      } else {
        // seconds provided
        parsed.push("");
      }
    } else if (parsed.length > 7) {
      throw new Error(`Expression has ${parsed.length} parts; too many!`);
    }

    return parsed;
  }

  protected normalize(expressionParts: string[]): void {
    // Convert ? to * for DOM and DOW
    expressionParts[3] = expressionParts[3].replace("?", "*");
    expressionParts[5] = expressionParts[5].replace("?", "*");

    // Convert ? to * for Hour. ? isn't valid for hour position but we can work around it.
    expressionParts[2] = expressionParts[2].replace("?", "*");

    // Convert 0/, 1/ to */
    if (expressionParts[0].indexOf("0/") == 0) {
      // Seconds
      expressionParts[0] = expressionParts[0].replace("0/", "*/");
    }

    if (expressionParts[1].indexOf("0/") == 0) {
      // Minutes
      expressionParts[1] = expressionParts[1].replace("0/", "*/");
    }

    if (expressionParts[2].indexOf("0/") == 0) {
      // Hours
      expressionParts[2] = expressionParts[2].replace("0/", "*/");
    }

    if (expressionParts[3].indexOf("1/") == 0) {
      // DOM
      expressionParts[3] = expressionParts[3].replace("1/", "*/");
    }

    if (expressionParts[4].indexOf("1/") == 0) {
      // Month
      expressionParts[4] = expressionParts[4].replace("1/", "*/");
    }

    if (expressionParts[6].indexOf("1/") == 0) {
      // Years
      expressionParts[6] = expressionParts[6].replace("1/", "*/");
    }

    // Adjust DOW based on dayOfWeekStartIndexZero option
    // Normalized DOW: 0=Sunday/6=Saturday
    expressionParts[5] = expressionParts[5].replace(/(^\d)|([^#/\s]\d)/g, (t) => {
      // skip anything preceeded by # or /
      let dowDigits = t.replace(/\D/, ""); // extract digit part (i.e. if "-2" or ",2", just take 2)
      let dowDigitsAdjusted: string = dowDigits;

      if (this.dayOfWeekStartIndexZero) {
        // "7" also means Sunday so we will convert to "0" to normalize it
        if (dowDigits == "7") {
          dowDigitsAdjusted = "0";
        }
      } else {
        // If dayOfWeekStartIndexZero==false, Sunday is specified as 1 and Saturday is specified as 7.
        // To normalize, we will shift the  DOW number down so that 1 becomes 0, 2 becomes 1, and so on.
        dowDigitsAdjusted = (parseInt(dowDigits) - 1).toString();
      }

      return t.replace(dowDigits, dowDigitsAdjusted);
    });

    // Convert DOW 'L' to '6' (Saturday)
    if (expressionParts[5] == "L") {
      expressionParts[5] = "6";
    }

    // Convert DOM '?' to '*'
    if (expressionParts[3] == "?") {
      expressionParts[3] = "*";
    }

    if (
      expressionParts[3].indexOf("W") > -1 &&
      (expressionParts[3].indexOf(",") > -1 || expressionParts[3].indexOf("-") > -1)
    ) {
      throw new Error(
        "The 'W' character can be specified only when the day-of-month is a single day, not a range or list of days."
      );
    }

    // Convert DOW SUN-SAT format to 0-6 format
    var days: { [key: string]: number } = {
      SUN: 0,
      MON: 1,
      TUE: 2,
      WED: 3,
      THU: 4,
      FRI: 5,
      SAT: 6,
    };
    for (let day in days) {
      expressionParts[5] = expressionParts[5].replace(new RegExp(day, "gi"), days[day].toString());
    }

    // Adjust month based on monthStartIndexZero option
    // Normalized Month: 1=JAN/12=DEC
    expressionParts[4] = expressionParts[4].replace(/(^\d{1,2})|([^#/\s]\d{1,2})/g, (t) => {
      // skip anything preceeded by # or /
      let dowDigits = t.replace(/\D/, ""); // extract digit part (i.e. if "-2" or ",2", just take 2)
      let dowDigitsAdjusted: string = dowDigits;

      if (this.monthStartIndexZero) {
        // if monthStartIndexZero==true, we will shift month number up so that JAN=1 and DEC=12
        dowDigitsAdjusted = (parseInt(dowDigits) + 1).toString();
      }

      return t.replace(dowDigits, dowDigitsAdjusted);
    });

    // Convert JAN-DEC format to 1-12 format
    var months: { [key: string]: number } = {
      JAN: 1,
      FEB: 2,
      MAR: 3,
      APR: 4,
      MAY: 5,
      JUN: 6,
      JUL: 7,
      AUG: 8,
      SEP: 9,
      OCT: 10,
      NOV: 11,
      DEC: 12,
    };

    for (let month in months) {
      expressionParts[4] = expressionParts[4].replace(new RegExp(month, "gi"), months[month].toString());
    }

    // Convert 0 second to (empty)
    if (expressionParts[0] == "0") {
      expressionParts[0] = "";
    }

    // If time increment or * (every) is specified for seconds or minutes and hours part is single item, make it a "self-range" so
    // the expression can be interpreted as an increment / range.  This will allow us to easily interpret an hour part as 'between' a second or minute duration.
    //     For example:
    //     0-20/3 9 * * * => 0-20/3 9-9 * * * (9 => 9-9) => Every 3 minutes, minutes 0 through 20 past the hour, between 09:00 AM and 09:59 AM
    //     */5 3 * * * => */5 3-3 * * * (3 => 3-3) => Every 5 minutes, between 03:00 AM and 03:59 AM
    if (
      !/\*|\-|\,|\//.test(expressionParts[2]) &&
      (/\*|\//.test(expressionParts[1]) || /\*|\//.test(expressionParts[0]))
    ) {
      expressionParts[2] += `-${expressionParts[2]}`;
    }

    // Loop through all parts and apply global normalization
    for (let i = 0; i < expressionParts.length; i++) {
      // ignore empty characters around comma
      // if nothing left, set it to *
      if (expressionParts[i].indexOf(",") != -1) {
        expressionParts[i] =
          expressionParts[i]
            .split(",")
            .filter((str) => str !== "")
            .join(",") || "*";
      }
      // convert all '*/1' to '*'
      if (expressionParts[i] == "*/1") {
        expressionParts[i] = "*";
      }

      /* Convert Month,DOW,Year step values with a starting value (i.e. not '*') to range expressions.
         This allows us to reuse the range expression handling for step values.

           For example:
           - month part '3/2' will be converted to '3-12/2' (every 2 months between March and December)
           - DOW part '3/2' will be converted to '3-6/2' (every 2 days between Tuesday and Saturday)
      */

      if (expressionParts[i].indexOf("/") > -1 && !/^\*|\-|\,/.test(expressionParts[i])) {
        let stepRangeThrough: string | null = null;
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

        if (stepRangeThrough !== null) {
          let parts: string[] = expressionParts[i].split("/");
          expressionParts[i] = `${parts[0]}-${stepRangeThrough}/${parts[1]}`;
        }
      }
    }
  }

  protected validate(parsed: string[]) {
    const standardCronPartCharacters = "0-9,\\-*\/";
    this.validateOnlyExpectedCharactersFound(parsed[0], standardCronPartCharacters);
    this.validateOnlyExpectedCharactersFound(parsed[1], standardCronPartCharacters);
    this.validateOnlyExpectedCharactersFound(parsed[2], standardCronPartCharacters);
    // DOM
    this.validateOnlyExpectedCharactersFound(parsed[3], "0-9,\\-*\/LW");
    this.validateOnlyExpectedCharactersFound(parsed[4], standardCronPartCharacters);
    // DOW
    this.validateOnlyExpectedCharactersFound(parsed[5], "0-9,\\-*\/L#");
    this.validateOnlyExpectedCharactersFound(parsed[6], standardCronPartCharacters);

    this.validateAnyRanges(parsed);

  }

  protected validateAnyRanges(parsed: string[]) {
    RangeValidator.secondRange(parsed[0]);
    RangeValidator.minuteRange(parsed[1]);
    RangeValidator.hourRange(parsed[2]);
    RangeValidator.dayOfMonthRange(parsed[3]);
    RangeValidator.monthRange(parsed[4], this.monthStartIndexZero);
    RangeValidator.dayOfWeekRange(parsed[5], this.dayOfWeekStartIndexZero);
  }

  protected validateOnlyExpectedCharactersFound(cronPart: string, allowedCharsExpression: string) {
    // Write code that will ensure the expression string only contains numbers or any of the following characters , - * /
    // If any other characters are found, it is an error.
    let invalidChars = cronPart.match(new RegExp(`[^${allowedCharsExpression}]+`, "gi"));
    if (invalidChars && invalidChars.length) {
      throw new Error(`Expression contains invalid values: '${invalidChars.toString()}'`);
    }
  }
}
