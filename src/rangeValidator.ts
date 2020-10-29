import { assert } from "chai";

export default class RangeValidator {

  static secondRange(parse: string) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      if (!isNaN(parseInt(parsed[i], 10))) {
        const second = parseInt(parsed[i], 10);
        assert(second >= 0 && second <= 59, 'second should not lt 0, or gt 59 ');
      }
    }
  }

  static minuteRange(parse: string) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      if (!isNaN(parseInt(parsed[i], 10))) {
        const minute = parseInt(parsed[i], 10);
        assert(minute >= 0 && minute <= 59, 'minute should not lt 0, or gt 59 ');
      }
    }
  }

  static hourRange(parse: string) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      if (!isNaN(parseInt(parsed[i], 10))) {
        const hour = parseInt(parsed[i], 10);
        assert(hour >= 0 && hour <= 23, 'hour should not lt 0, or gt 23 ');
      }
    }
  }

  static dayOfMonthRange(parse: string) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      if (!isNaN(parseInt(parsed[i], 10))) {
        const dayOfMonth = parseInt(parsed[i], 10);
        assert(dayOfMonth >= 1 && dayOfMonth <= 31, 'dayOfMonth should not lt 1, or gt 31 ');
      }
    }
  }

  static monthRange(parse: string) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      if (!isNaN(parseInt(parsed[i], 10))) {
        const month = parseInt(parsed[i], 10);
        assert(month >= 1 && month <= 12, 'month should not lt 1, or gt 12 ');
      }
    }
  }

  static dayOfWeekRange(parse: string) {
    const parsed = parse.split(',');
    for (let i = 0; i < parsed.length; i++) {
      if (!isNaN(parseInt(parsed[i], 10))) {
        const dayOfWeek = parseInt(parsed[i], 10);
        assert(dayOfWeek >= 0 && dayOfWeek <= 6, 'dayOfWeek should not lt 0, or gt 6 ');
      }
    }
  }
}