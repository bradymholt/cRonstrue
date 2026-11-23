function assert(value: boolean, message: string) {
  if (!value) {
    throw new Error(message);
  }
}

// Returns the numeric start and, for a range like "10-15", the end of a cron list part.
function rangeValues(part: string): number[] {
  const values: number[] = [];
  if (!isNaN(parseInt(part, 10))) {
    values.push(parseInt(part, 10));
    const range = part.match(/^\d+-(-?\d+)/);
    if (range) {
      values.push(parseInt(range[1], 10));
    }
  }
  return values;
}

function assertInRange(parse: string, min: number, max: number, message: string) {
  for (const part of parse.split(",")) {
    for (const value of rangeValues(part)) {
      assert(value >= min && value <= max, message);
    }
  }
}

export default class RangeValidator {
  static stepRange(parse: string) {
    for (const part of parse.split(",")) {
      const step = part.split("/")[1];
      assert(step === undefined || !/^0+$/.test(step), "step value must be greater than 0");
    }
  }

  static secondRange(parse: string) {
    assertInRange(parse, 0, 59, "seconds part must be >= 0 and <= 59");
  }

  static minuteRange(parse: string) {
    assertInRange(parse, 0, 59, "minutes part must be >= 0 and <= 59");
  }

  static hourRange(parse: string) {
    assertInRange(parse, 0, 23, "hours part must be >= 0 and <= 23");
  }

  static dayOfMonthRange(parse: string) {
    assertInRange(parse, 1, 31, "DOM part must be >= 1 and <= 31");
  }

  static monthRange(parse: string, monthStartIndexZero: boolean) {
    assertInRange(
      parse,
      1,
      12,
      monthStartIndexZero ? "month part must be >= 0 and <= 11" : "month part must be >= 1 and <= 12"
    );
  }

  static dayOfWeekRange(parse: string, dayOfWeekStartIndexZero: boolean) {
    for (const part of parse.split(",")) {
      if (part.indexOf("#") > -1) {
        const nthString = part.substring(part.indexOf("#") + 1);
        assert(/^[1-5]$/.test(nthString), "DOW nth weekday must be >= 1 and <= 5");
      }
    }

    assertInRange(
      parse,
      0,
      6,
      dayOfWeekStartIndexZero ? "DOW part must be >= 0 and <= 6" : "DOW part must be >= 1 and <= 7"
    );
  }
}
