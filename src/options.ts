export interface Options {
  throwExceptionOnParseError?: boolean;
  verbose?: boolean;
  dayOfWeekStartIndexZero?: boolean;
  monthStartIndexZero?: boolean;
  use24HourTimeFormat?: boolean;
  locale?: string | null;
  /**
   * The day of month and day of week are logical AND'ed (as opposed to OR'ed).
   * For example, 0 5 11-17 * 5 is stringified to:
   * "At 12:00 AM, on day 1, 2, and 3 of the month, only on Wednesday and Friday" rather than
   * "At 12:00 AM, on day 1, 2, and 3 of the month, and on Wednesday and Friday"
   */
  logicalAndDayFields?: boolean;

  /**
   * @deprecated (DEPRECATED DO NOT USE) Timezone offset in minutes.
   */
  tzOffset?: number;
}
