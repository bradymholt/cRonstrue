// Tajik

import { Locale } from "../locale";

const weekdays = ["якшанбе", "душанбе", "сешанбе", "чоршанбе", "панҷшанбе", "ҷумъа", "шанбе"];

const months = [
  "январ",
  "феврал",
  "март",
  "апрел",
  "май",
  "июн",
  "июл",
  "август",
  "сентябр",
  "октябр",
  "ноябр",
  "декабр",
];

// izafa form, used when the month is followed by a day, e.g. "январи 5"
const monthsIzafa = [
  "январи",
  "феврали",
  "марти",
  "апрели",
  "майи",
  "июни",
  "июли",
  "августи",
  "сентябри",
  "октябри",
  "ноябри",
  "декабри",
];

export class tg implements Locale {
  atX0SecondsPastTheMinuteGt20(): string | null {
    return null;
  }
  atX0MinutesPastTheHourGt20(): string | null {
    return null;
  }
  commaMonthX0ThroughMonthX1(): string | null {
    return null;
  }
  commaYearX0ThroughYearX1(): string | null {
    return null;
  }
  use24HourTimeFormatByDefault() {
    return true;
  }
  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "Ҳангоми тавсифи ифодаи cron хато рӯй дод. Синтаксисро санҷед.";
  }
  everyMinute() {
    return "ҳар дақиқа";
  }
  everyHour() {
    return "ҳар соат";
  }
  atSpace() {
    return "Дар ";
  }
  everyMinuteBetweenX0AndX1() {
    return "Ҳар дақиқа аз %s то %s";
  }
  at() {
    return "Дар";
  }
  spaceAnd() {
    return " ва";
  }
  everySecond() {
    return "ҳар сония";
  }
  everyX0Seconds() {
    return "ҳар %s сония";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "сонияҳои аз %s то %s";
  }
  atX0SecondsPastTheMinute() {
    return "дар %s сония";
  }
  everyX0Minutes() {
    return "ҳар %s дақиқа";
  }
  minutesX0ThroughX1PastTheHour() {
    return "дақиқаҳои аз %s то %s";
  }
  atX0MinutesPastTheHour() {
    return "дар %s дақиқа";
  }
  everyX0Hours() {
    return "ҳар %s соат";
  }
  betweenX0AndX1() {
    return "аз %s то %s";
  }
  atX0() {
    return "дар %s";
  }
  commaEveryDay() {
    return ", ҳар рӯз";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", ҳар %s рӯзи ҳафта";
  }
  commaX0ThroughX1() {
    return ", аз %s то %s";
  }
  commaAndX0ThroughX1() {
    return " ва аз %s то %s";
  }
  first() {
    return "якум";
  }
  second() {
    return "дуюм";
  }
  third() {
    return "сеюм";
  }
  fourth() {
    return "чорум";
  }
  fifth() {
    return "панҷум";
  }
  commaOnThe() {
    return ", дар ";
  }
  spaceX0OfTheMonth() {
    return " %s-и моҳ";
  }
  lastDay() {
    return "рӯзи охирин";
  }
  commaOnTheLastX0OfTheMonth() {
    return ", дар охирин %s-и моҳ";
  }
  commaOnlyOnX0() {
    return ", танҳо дар %s";
  }
  commaAndOnX0() {
    return ", ва %s";
  }
  commaEveryX0Months() {
    return " ҳар %s моҳ";
  }
  commaOnlyInMonthX0() {
    return ", танҳо %s";
  }
  commaOnlyInX0() {
    return ", танҳо дар %s";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", дар рӯзи охирини моҳ";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", дар охирин рӯзи кории моҳ";
  }
  commaDaysBeforeTheLastDayOfTheMonth() {
    return ", %s рӯз пеш аз охири моҳ";
  }
  firstWeekday() {
    return "якумин рӯзи корӣ";
  }
  weekdayNearestDayX0() {
    return "наздиктарин рӯзи корӣ ба %s";
  }
  commaOnTheX0OfTheMonth() {
    return ", дар %s-и моҳ";
  }
  commaEveryX0Days() {
    return ", ҳар %s рӯз";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", аз рӯзи %s то %s-и моҳ";
  }
  commaOnDayX0OfTheMonth() {
    return ", дар рӯзи %s-и моҳ";
  }
  commaEveryX0Years() {
    return ", ҳар %s сол";
  }
  commaStartingX0() {
    return ", оғоз %s";
  }
  daysOfTheWeek() {
    return [...weekdays];
  }
  daysOfTheWeekInCase() {
    return [...weekdays];
  }
  monthsOfTheYear() {
    return [...months];
  }
  monthsOfTheYearInCase(f?: number) {
    return f == 1 ? [...monthsIzafa] : [...months];
  }
  onTheHour() {
    return "дақиқан дар соат";
  }
}
