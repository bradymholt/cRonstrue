function assert(value: boolean, message: string) {
  if (!value) {
    throw new Error(message);
  }
}

export default class RangeValidator {
  static secondRange(parse: string) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      if (!isNaN(parseInt(parsed[i], 10))) {
        const second = parseInt(parsed[i], 10);
        assert(second >= 0 && second <= 59, 'seconds part must be >= 0 and <= 59');
      }
    }
  }

  static minuteRange(parse: string) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      if (!isNaN(parseInt(parsed[i], 10))) {
        const minute = parseInt(parsed[i], 10);
        assert(minute >= 0 && minute <= 59, 'minutes part must be >= 0 and <= 59');
      }
    }
  }

  static hourRange(parse: string) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      if (!isNaN(parseInt(parsed[i], 10))) {
        const hour = parseInt(parsed[i], 10);
        assert(hour >= 0 && hour <= 23, 'hours part must be >= 0 and <= 23');
      }
    }
  }

  static dayOfMonthRange(parse: string) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      if (!isNaN(parseInt(parsed[i], 10))) {
        const dayOfMonth = parseInt(parsed[i], 10);
        assert(dayOfMonth >= 1 && dayOfMonth <= 31, 'DOM part must be >= 1 and <= 31');
      }
    }
  }

  static monthRange(parse: string, monthStartIndexZero: boolean) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      if (!isNaN(parseInt(parsed[i], 10))) {
        const month = parseInt(parsed[i], 10);
        assert(
          month >= 1 && month <= 12,
          monthStartIndexZero ? 'month part must be >= 0 and <= 11' : 'month part must be >= 1 and <= 12'
        );
      }
    }
  }

  static dayOfWeekRange(parse: string, dayOfWeekStartIndexZero: boolean) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      if (!isNaN(parseInt(parsed[i], 10))) {
        const dayOfWeek = parseInt(parsed[i], 10);
        assert(
          dayOfWeek >= 0 && dayOfWeek <= 6,
          dayOfWeekStartIndexZero ? 'DOW part must be >= 0 and <= 6' : 'DOW part must be >= 1 and <= 7'
        );
      }
    }
  }
}