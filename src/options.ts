export interface Options {
  throwExceptionOnParseError?: boolean;
  verbose?: boolean;
  dayOfWeekStartIndexZero?: boolean;
  monthStartIndexZero?: boolean;
  use24HourTimeFormat?: boolean;
  locale?: string | null;

  /**
   * @deprecated Timezone offset in minutes.
   */
  tzOffset?: number;
}
