// Bulgarian

import type { Locale } from '../locale';

const getPhraseByPlural = (str: string | undefined, words: string[]): string => {
  const strAsNumber = str != null ? Number(str) : 0;
  return strAsNumber < 2 ? words[0]! : words[1]!;
};
const getPhraseByDayOfWeek = (str: string | undefined, words: string[]): string => {
  const strAsNumber = str != null ? Number(str) : 0;
  // weekdays: 0:неделя 1:понеделник 2:вторник 3:сряда 4:четвъртък 5:петък 6:събота
  // gender: ж м м ж м м ж
  return words[[1, 0, 0, 1, 0, 0, 1][strAsNumber]!]!;
};
const getNumberEnding = (str: string | undefined, gender: 'м' | 'ж' | 'ср'): string => {
  let strAsNumber = str != null ? Number(str) : 1;
  strAsNumber = Math.max(Math.min(strAsNumber < 10 || (strAsNumber > 20 && strAsNumber % 10 !== 0) ? strAsNumber % 10 : 3, 3), 1) - 1;
  const genderIndex = ['м', 'ж', 'ср'].indexOf(gender);
  return ['в', 'р', 'т'][strAsNumber]! + ['и', 'а', 'о'][genderIndex];
};

export class bg implements Locale {
  public atX0SecondsPastTheMinuteGt20(): string | null {
    return null;
  }
  public atX0MinutesPastTheHourGt20(): string | null {
    return null;
  }
  public commaMonthX0ThroughMonthX1(): string | null {
    return null;
  }
  public commaYearX0ThroughYearX1(): string | null {
    return null;
  }
  public use24HourTimeFormatByDefault(): boolean {
    return true;
  }
  public everyMinute(): string {
    return 'всяка минута';
  }
  public everyHour(): string {
    return 'всеки час';
  }
  public anErrorOccuredWhenGeneratingTheExpressionD(): string {
    return 'Възникна грешка при генериране на описанието на израза. Проверете синтаксиса на cron израза.';
  }
  public atSpace(): string {
    return 'В ';
  }
  public everyMinuteBetweenX0AndX1(): string {
    return 'Всяка минута от %s до %s';
  }
  public at(): string {
    return 'В';
  }
  public spaceAnd(): string {
    return ' и';
  }
  public everySecond(): string {
    return 'всяка секунда';
  }
  public everyX0Seconds(s?: string): string {
    return 'всеки %s секунди';
  }
  public secondsX0ThroughX1PastTheMinute(): string {
    return 'секунди от %s до %s';
  }
  public atX0SecondsPastTheMinute(s?: string): string {
    return `%s-${getNumberEnding(s, 'ж')} секунда`;
  }
  public everyX0Minutes(s?: string): string {
    return 'всеки %s минути';
  }
  public minutesX0ThroughX1PastTheHour(): string {
    return 'минути от %s до %s';
  }
  public atX0MinutesPastTheHour(s?: string): string {
    return `%s-${getNumberEnding(s, 'ж')} минутa`;
  }
  public everyX0Hours(s?: string): string {
    return 'всеки %s часа';
  }
  public betweenX0AndX1(): string {
    return 'от %s до %s';
  }
  public atX0(): string {
    return 'в %s';
  }
  public commaEveryDay(): string {
    return ', всеки ден';
  }
  public commaEveryX0DaysOfTheWeek(s?: string): string {
    return getPhraseByPlural(s, [', всеки %s ден от седмицата', ', всеки %s дена от седмицата']);
  }
  public commaX0ThroughX1(s?: string): string {
    return ', от %s до %s';
  }
  public commaAndX0ThroughX1(s?: string): string {
    return ' и от %s до %s';
  }
  public first(s?: string): string {
    return getPhraseByDayOfWeek(s, ['первият', 'первата']);
  }
  public second(s?: string): string {
    return getPhraseByDayOfWeek(s, ['вторият', 'втората']);
  }
  public third(s?: string): string {
    return getPhraseByDayOfWeek(s, ['третият', 'третата']);
  }
  public fourth(s?: string): string {
    return getPhraseByDayOfWeek(s, ['четвертият', 'четвертата']);
  }
  public fifth(s?: string): string {
    return getPhraseByDayOfWeek(s, ['петият', 'петата']);
  }
  public commaOnThe(s?: string): string {
    return ', ';
  }
  public spaceX0OfTheMonth(): string {
    return ' %s на месеца';
  }
  public lastDay(): string {
    return 'последният ден';
  }
  public commaOnTheLastX0OfTheMonth(s?: string): string {
    return getPhraseByDayOfWeek(s, [', в последният %s от месеца', ', в последната %s отмесеца']);
  }
  public commaOnlyOnX0(s?: string): string {
    return ', %s';
  }
  public commaAndOnX0(): string {
    return ' и %s';
  }
  public commaEveryX0Months(s?: string): string {
    return ' всеки %s месеца';
  }
  public commaOnlyInMonthX0(): string {
    return ', %s';
  }
  public commaOnlyInX0(): string {
    return ', в %s';
  }
  public commaOnTheLastDayOfTheMonth(): string {
    return ', в последният ден на месеца';
  }
  public commaOnTheLastWeekdayOfTheMonth(): string {
    return ', в последния делничен ден от месеца';
  }
  public commaDaysBeforeTheLastDayOfTheMonth(s?: string): string {
    return getPhraseByPlural(s, [', %s ден преди края на месеца', ', %s дена преди края на месеца']);
  }
  public firstWeekday(): string {
    return 'първият делничен ден';
  }
  public weekdayNearestDayX0(): string {
    return 'най-близкият делничен ден до %s число';
  }
  public commaOnTheX0OfTheMonth(): string {
    return ', на %s число от месеца';
  }
  public commaEveryX0Days(s?: string): string {
    return getPhraseByPlural(s, [', всеки %s ден', ', всеки %s дена']);
  }
  public commaBetweenDayX0AndX1OfTheMonth(s?: string): string {
    const values = s?.split('-') ?? [];
    return `, от %s-${getNumberEnding(values[0], 'ср')} до %s-${getNumberEnding(values[1], 'ср')} число на месеца`;
  }
  public commaOnDayX0OfTheMonth(s?: string): string {
    return `, на %s-${getNumberEnding(s, 'ср')} число от месеца`;
  }
  public commaEveryX0Years(s?: string): string {
    return getPhraseByPlural(s, [', всяка %s година', ', всеки %s години']);
  }
  public commaStartingX0(): string {
    return ', започвайки %s';
  }
  public daysOfTheWeek(): string[] {
    return ['неделя', 'понеделник', 'вторник', 'сряда', 'четвъртък', 'петък', 'събота'];
  }
  public monthsOfTheYear(): string[] {
    return ['януари', 'февруари', 'март', 'април', 'май', 'юни', 'юли', 'август', 'септевмври', 'октомври', 'ноември', 'декември'];
  }

  onTheHour() {
    return "в началото на часа";
  }
}
