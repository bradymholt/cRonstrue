// Azerbaijani

import { Locale } from "../locale";

// When an ordinal is written after a digit, Azerbaijani uses the short suffix
// form (as in "6-", "1-", "4-", "35-" followed by the suffix). Which suffix is
// used follows the vowel harmony of the numeral as it is spoken, so the last
// digit decides it, or the tens part when the number ends in zero.
const ORDINAL_SUFFIX_BY_LAST_DIGIT: { [digit: number]: string } = {
  1: "-ci",
  2: "-ci",
  3: "-cü",
  4: "-cü",
  5: "-ci",
  6: "-cı",
  7: "-ci",
  8: "-ci",
  9: "-cu",
};

const ORDINAL_SUFFIX_BY_TENS: { [tens: number]: string } = {
  0: "-cı",
  10: "-cu",
  20: "-ci",
  30: "-cu",
  40: "-cı",
  50: "-ci",
};

const DEFAULT_ORDINAL_SUFFIX = "-cı";

/**
 * Returns the ordinal suffix that fits the given number, or null when the value
 * is not a single number - a list such as "10,20" then takes a plural phrase
 * instead of an ordinal one.
 */
const ordinalSuffix = (value: string | undefined) => {
  if (!value || !/^\d+$/.test(value)) {
    return null;
  }

  const number = Number(value);
  const lastDigit = number % 10;

  return lastDigit
    ? ORDINAL_SUFFIX_BY_LAST_DIGIT[lastDigit]
    : ORDINAL_SUFFIX_BY_TENS[number % 100] || DEFAULT_ORDINAL_SUFFIX;
};

export class az implements Locale {
  atX0SecondsPastTheMinuteGt20(): string | null {
    return null;
  }
  atX0MinutesPastTheHourGt20(): string | null {
    return null;
  }
  commaMonthX0ThroughMonthX1(): string | null {
    return ", %s %s qədər";
  }
  commaYearX0ThroughYearX1(): string | null {
    return ", %s ilindən %s ilinə qədər";
  }

  use24HourTimeFormatByDefault() {
    return true;
  }

  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "İfadənin təsviri yaradılarkən xəta baş verdi. Cron ifadəsinin sintaksisini yoxlayın.";
  }
  everyMinute() {
    return "hər dəqiqə";
  }
  everyHour() {
    return "hər saat";
  }
  atSpace() {
    return "Saat ";
  }
  everyMinuteBetweenX0AndX1() {
    return "Saat %s ilə %s arasında hər dəqiqə";
  }
  at() {
    return "Saat";
  }
  spaceAnd() {
    return " və";
  }
  everySecond() {
    return "hər saniyə";
  }
  everyX0Seconds() {
    return "hər %s saniyədən bir";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "dəqiqənin %s ilə %s saniyələri arasında";
  }
  atX0SecondsPastTheMinute(s?: string) {
    const suffix = ordinalSuffix(s);
    return suffix ? `dəqiqənin %s${suffix} saniyəsində` : "dəqiqənin %s saniyələrində";
  }
  everyX0Minutes() {
    return "hər %s dəqiqədən bir";
  }
  minutesX0ThroughX1PastTheHour() {
    return "saatın %s ilə %s dəqiqələri arasında";
  }
  atX0MinutesPastTheHour(s?: string) {
    const suffix = ordinalSuffix(s);
    return suffix ? `saatın %s${suffix} dəqiqəsində` : "saatın %s dəqiqələrində";
  }
  everyX0Hours() {
    return "hər %s saatdan bir";
  }
  betweenX0AndX1() {
    return "saat %s ilə %s arasında";
  }
  atX0() {
    return "saat %s";
  }
  commaEveryDay() {
    return ", hər gün";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", həftənin hər %s günündən bir";
  }
  commaX0ThroughX1() {
    return ", %s %s qədər";
  }
  commaAndX0ThroughX1() {
    return ", %s %s qədər";
  }
  first() {
    return "birinci";
  }
  second() {
    return "ikinci";
  }
  third() {
    return "üçüncü";
  }
  fourth() {
    return "dördüncü";
  }
  fifth() {
    return "beşinci";
  }
  commaOnThe() {
    return ", ayın ";
  }
  spaceX0OfTheMonth() {
    return " %s günü";
  }
  lastDay() {
    return "son gün";
  }
  commaOnTheLastX0OfTheMonth() {
    return ", ayın son %s günü";
  }
  commaOnlyOnX0() {
    return ", yalnız %s";
  }
  commaAndOnX0() {
    return ", həmçinin %s";
  }
  commaEveryX0Months() {
    return ", hər %s aydan bir";
  }
  commaOnlyInX0() {
    return ", yalnız %s";
  }
  commaOnlyInYearX0() {
    return ", yalnız %s ili";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", ayın son günü";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", ayın son iş günü";
  }
  commaDaysBeforeTheLastDayOfTheMonth() {
    return ", ayın son günündən %s gün əvvəl";
  }
  firstWeekday() {
    return "ilk iş günü";
  }
  weekdayNearestDayX0() {
    return "%s tarixinə ən yaxın iş günü";
  }
  commaOnTheX0OfTheMonth() {
    return ", ayın %s";
  }
  commaEveryX0Days() {
    return ", ayda hər %s gündən bir";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", ayın %s ilə %s günləri arasında";
  }
  commaOnDayX0OfTheMonth(s?: string) {
    const suffix = ordinalSuffix(s);
    return suffix ? `, ayın %s${suffix} günü` : ", ayın %s günləri";
  }
  commaEveryX0Years() {
    return ", hər %s ildən bir";
  }
  commaStartingX0() {
    return ", %s başlamaqla";
  }
  daysOfTheWeek() {
    return ["bazar", "bazar ertəsi", "çərşənbə axşamı", "çərşənbə", "cümə axşamı", "cümə", "şənbə"];
  }
  // A range reads "from X to Y", so the first day takes the ablative case and
  // the second one the dative. A single day keeps the plain nominative form.
  daysOfTheWeekInCase(f: number = 0) {
    switch (f) {
      case 1:
        return [
          "bazardan",
          "bazar ertəsindən",
          "çərşənbə axşamından",
          "çərşənbədən",
          "cümə axşamından",
          "cümədən",
          "şənbədən",
        ];
      case 2:
        return ["bazara", "bazar ertəsinə", "çərşənbə axşamına", "çərşənbəyə", "cümə axşamına", "cüməyə", "şənbəyə"];
      default:
        return this.daysOfTheWeek();
    }
  }
  // A single month is always read as "only in <month>", and a month range as
  // "from <month> to <month>", so the names are declined here rather than left
  // in the nominative and glued to a preposition that Azerbaijani does not have.
  monthsOfTheYear() {
    return [
      "yanvarda",
      "fevralda",
      "martda",
      "apreldə",
      "mayda",
      "iyunda",
      "iyulda",
      "avqustda",
      "sentyabrda",
      "oktyabrda",
      "noyabrda",
      "dekabrda",
    ];
  }
  monthsOfTheYearInCase(f: number = 0) {
    return f == 1
      ? [
          "yanvardan",
          "fevraldan",
          "martdan",
          "apreldən",
          "maydan",
          "iyundan",
          "iyuldan",
          "avqustdan",
          "sentyabrdan",
          "oktyabrdan",
          "noyabrdan",
          "dekabrdan",
        ]
      : [
          "yanvara",
          "fevrala",
          "marta",
          "aprelə",
          "maya",
          "iyuna",
          "iyula",
          "avqusta",
          "sentyabra",
          "oktyabra",
          "noyabra",
          "dekabra",
        ];
  }

  atReboot() {
    return "Başlanğıcda bir dəfə icra olunur";
  }

  onTheHour() {
    return "saat başında";
  }
}
