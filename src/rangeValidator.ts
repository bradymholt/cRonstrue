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
    const range = part.match(/^\d+-(\d+)/);
    if (range) {
      values.push(parseInt(range[1], 10));
    }
  }
  return values;
}

export default class RangeValidator {
  static stepRange(parse: string) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      const step = parsed[i].split('/')[1];
      assert(step === undefined || !/^0+$/.test(step), 'step value must be greater than 0');
    }
  }

  static secondRange(parse: string) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      for (const second of rangeValues(parsed[i])) {
        assert(second >= 0 && second <= 59, 'seconds part must be >= 0 and <= 59');
      }
    }
  }

  static minuteRange(parse: string) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      for (const minute of rangeValues(parsed[i])) {
        assert(minute >= 0 && minute <= 59, 'minutes part must be >= 0 and <= 59');
      }
    }
  }

  static hourRange(parse: string) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      for (const hour of rangeValues(parsed[i])) {
        assert(hour >= 0 && hour <= 23, 'hours part must be >= 0 and <= 23');
      }
    }
  }

  static dayOfMonthRange(parse: string) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      for (const dayOfMonth of rangeValues(parsed[i])) {
        assert(dayOfMonth >= 1 && dayOfMonth <= 31, 'DOM part must be >= 1 and <= 31');
      }
    }
  }

  static monthRange(parse: string, monthStartIndexZero: boolean) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      for (const month of rangeValues(parsed[i])) {
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
      if (parsed[i].indexOf('#') > -1) {
        const nthString = parsed[i].substring(parsed[i].indexOf('#') + 1);
        assert(/^[1-5]$/.test(nthString), 'DOW nth weekday must be >= 1 and <= 5');
      }

      for (const dayOfWeek of rangeValues(parsed[i])) {
        assert(
          dayOfWeek >= 0 && dayOfWeek <= 6,
          dayOfWeekStartIndexZero ? 'DOW part must be >= 0 and <= 6' : 'DOW part must be >= 1 and <= 7'
        );
      }
    }
  }
}