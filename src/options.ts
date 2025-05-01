export interface Options {
  throwExceptionOnParseError?: boolean;
  verbose?: boolean;
  dayOfWeekStartIndexZero?: boolean;
  monthStartIndexZero?: boolean;
  use24HourTimeFormat?: boolean;
  locale?: string | null;

  /**
   * @deprecated (DEPRECATED DO NOT USE) Timezone offset in minutes.
   */
  tzOffset?: number;
}
