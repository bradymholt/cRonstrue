// Hebrew
import { Locale } from "../locale";
export class he implements Locale {
  atX0SecondsPastTheMinuteGt20(): string {
    return null;
  }
  atX0MinutesPastTheHourGt20(): string {
    return null;
  }
  commaMonthX0ThroughMonthX1(): string {
    return null;
  }
  commaYearX0ThroughYearX1(): string {
    return null;
  }

  use24HourTimeFormatByDefault() {
    return true;
  }

  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "אירעה שגיאה בעת יצירת תיאור הביטוי. בדוק את תחביר הביטוי cron.";
  }
  everyMinute() {
    return "כל דקה";
  }
  everyHour() {
    return "כל שעה";
  }
  atSpace() {
    return "ב ";
  }
  everyMinuteBetweenX0AndX1() {
    return "כל דקה %s עד %s";
  }
  at() {
    return "ב";
  }
  spaceAnd() {
    return " ו";
  }
  everySecond() {
    return "כל שניה";
  }
  everyX0Seconds() {
    return "כל %s שניות";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "%s עד %s שניות של הדקה";
  }
  atX0SecondsPastTheMinute() {
    return "ב %s שניות של הדקה";
  }
  everyX0Minutes() {
    return "כל %s דקות";
  }
  minutesX0ThroughX1PastTheHour() {
    return "%s עד %s דקות של השעה";
  }
  atX0MinutesPastTheHour() {
    return "ב %s דקות של השעה";
  }
  everyX0Hours() {
    return "כל %s שעות";
  }
  betweenX0AndX1() {
    return "%s עד %s";
  }
  atX0() {
    return "ב %s";
  }
  commaEveryDay() {
    return ", כל יום";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", כל %s ימים בשבוע";
  }
  commaX0ThroughX1() {
    return ", %s עד %s";
  }
  first() {
    return "ראשון";
  }
  second() {
    return "שני";
  }
  third() {
    return "שלישי";
  }
  fourth() {
    return "רביעי";
  }
  fifth() {
    return "חמישי";
  }
  commaOnThe() {
    return ", ב ";
  }
  spaceX0OfTheMonth() {
    return " %s של החודש";
  }
  lastDay() {
    return "היום האחרון";
  }
  commaOnTheLastX0OfTheMonth() {
    return ", רק ב %s של החודש";
  }
  commaOnlyOnX0() {
    return ", רק ב %s";
  }
  commaAndOnX0(){
    return ", וב %s";
  }
  commaEveryX0Months() {
    return ", כל %s חודשים";
  }
  commaOnlyInX0() {
    return ", רק ב %s";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", ביום האחרון של החודש";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", ביום החול האחרון של החודש";
  }
  commaDaysBeforeTheLastDayOfTheMonth(){
    return ", %s ימים לפני היום האחרון בחודש"
  }
  firstWeekday() {
    return "יום החול הראשון";
  }
  weekdayNearestDayX0() {
    return "יום החול הראשון הקרוב אל %s";
  }
  commaOnTheX0OfTheMonth() {
    return ", ביום ה%s של החודש";
  }
  commaEveryX0Days() {
    return ", כל %s ימים";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", בין היום ה%s וה%s של החודש";
  }
  commaOnDayX0OfTheMonth() {
    return ", ביום ה%s של החודש";
  }
  commaEveryX0Years() {
    return ", כל %s שנים";
  }
  commaStartingX0() {
    return ", החל מ %s";
  }
  daysOfTheWeek() {
    return ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"];
  }
  monthsOfTheYear() {
    return [
      "ינואר",
      "פברואר",
      "מרץ",
      "אפריל",
      "מאי",
      "יוני",
      "יולי",
      "אוגוסט",
      "ספטמבר",
      "אוקטובר",
      "נובמבר",
      "דצמבר"
    ];
  }
}
